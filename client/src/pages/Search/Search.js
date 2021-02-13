import React, { useState, useEffect, useRef, useDebugValue } from "react";

import { Col, Row, Container } from "../../components/Grid";
import AlbumList from "../../components/AlbumList"
import AlbumDetail from "../../components/AlbumDetail"
import API from "../../utils/API";
import AUTH from "../../utils/AUTH"
import LASTFM from "../../utils/LASTFM";
import PlaceholderObj from "../../utils/placeholder.json"
import Randomizer from "../../utils/randomizer"
import Quotes from "../../utils/quotes.json"
import RandomQuote from "../../components/RandomQuote"

const Search = (props) => {
// Setting our component's initial state
    const [profile, setProfile] = useState({});

// determine which artists will be looked up to find similar ones.
    const [artists, setArtists] = useState({
      artist1: "",
      artist2: "",
      artist3: ""
    })
    const [loggedIn, setLoggedIn] = useState() 

// determine which three albums will display as search results
    const [displayAlbums, setDisplayAlbums] = useState([])

// determine which of the three search results will have full details displayed
    const [detailAlbum, setDetailAlbum] = useState(
        PlaceholderObj
    )

// toggling ids that determine the display property of some divs that we want to keep hidden
// since they have empty information at the beginning.
    const [visibleList, setVisibleList] = useState("invisible-list")
    const [visibleDetail, setVisibleDetail] = useState("invisible-detail")
    const [visibleCard, setVisibleCard] = useState("invisible-card")
    const [visibleError, setVisibleError] = useState("invisible-error")

// All users, from which we need queue and recommended list data 
    const [allUsers, setAllUsers] = useState([])

// Groups of users that have an album either in their queue, or as recommended.
    const [queueUsers, setQueueUsers] = useState([]);
    const [recUsers, setRecUsers] = useState([]);

// From starter code
    const formEl = useRef(null);


// Load all profile and store them with setProfile
    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        findUsers();
    }, [])

// Loads all profile and sets them to profile
  function loadProfile() {
      AUTH.getUser()
      .then(res => {
          setProfile(res.data.profile);
          setLoggedIn(res.data.user._id)
      })
      .catch(err => console.log(err));
  };

// Populates the random lyrics from quotes.json
  let quoteArr = []
  quoteArr.push(Randomizer.randomVal(Quotes))

// Creates an object of all users from which to pull the queue and recommended data per album
  async function findUsers () {
      let userList = await API.getAllProfiles()
      console.log("userlist: ", userList.data.users)
      setAllUsers(userList.data.users)
  }

// utility arrays to filter similar artist strongest matches
   const similarArr = []
   const match1 = [];
   const match2 = [];
   const match3 = []
   const matchWithStrength = []
   const matchStrengthAvg = []
   const albumsToShow = []
   const albumDisplayInfo = []

// STEP 1:  Modifies artist state based off of user input
    function handleArtistEntry (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name
        setArtists({...artists, [name]: value})
    }

// Third Party API call to find similar artists for each input
    async function getSimilarArtists (artistState) {
        const res = await LASTFM.getSimilar(artistState) 
        similarArr.push(res.data.similarartists.artist)
    }

// STEP 2: Form submission, populating utility arrays based off of frequency that similar artist shows up
// for each artist the user submitted (most is 3, least is 1)
    async function handleFormSubmit (event) {
        event.preventDefault()
        setVisibleError("invisible-error");
        await getSimilarArtists(artists.artist1);
        await getSimilarArtists(artists.artist2);
        await getSimilarArtists(artists.artist3);

        similarArr[0].map(band => {match1.push(band.name)})
        similarArr[1].map(band => {      
            if (match1.indexOf(band.name) != -1) {
                match2.push(band.name)
            } else {
                match1.push(band.name)
            }
        });
        similarArr[2].map(band => {
            if (match2.indexOf(band.name) != -1) {
                match3.push(band.name)
            } else if (match1.indexOf(band.name) != -1) {
                match2.push(band.name)
            } else {
                match1.push(band.name)
            }
        })
        if (match3.length < 3) {
            setVisibleError("visible-error")
        } else {
// Loading all artists who matched as similar for all three entries into their own object
            addBandObj(match3);

// Making rows beyond the artist entry visible upon form submission
            setVisibleList("visible-list");
            setVisibleCard("visible-card")
        }
    }   

// STEP 3: Creating a custom object with aggregated match data from each user entry (match can be as low as "0"
// and as high as "1", this ensures three weak matches won't override one or two stronger ones.)
    async function addBandObj (arrMatch) {
        for (let i = 0; i < arrMatch.length; i++) {
            let nameIndex1 = await similarArr[0].findIndex(index => index.name === arrMatch[i])
            let nameIndex2 = await similarArr[1].findIndex(index => index.name === arrMatch[i])
            let nameIndex3 = await similarArr[2].findIndex(index => index.name === arrMatch[i])
            matchWithStrength.push({
                name: arrMatch[i],
                ratings: [parseFloat(similarArr[0][nameIndex1].match), parseFloat(similarArr[1][nameIndex2].match), parseFloat(similarArr[2][nameIndex3].match)]
            })
        }
        for (let i = 0; i < matchWithStrength.length; i++) {
            if (arrMatch === match3) {
                matchStrengthAvg.push({
                    name: matchWithStrength[i].name,
                    total: matchWithStrength[i].ratings[0] + matchWithStrength[i].ratings[1] + matchWithStrength[i].ratings[2]
                })
            } else if (arrMatch === match2) {
                matchStrengthAvg.push({
                    name: matchWithStrength[i].name,
                    total: matchWithStrength[i].ratings[0] + matchWithStrength[i].ratings[1]
                })
            } else {
                matchStrengthAvg.push({
                name: matchWithStrength[i].name,
                total: matchWithStrength[i].ratings[0]
                })
            }
        }
// Sorting the array to have the highest aggregate match score be index 0, etc etc
        matchStrengthAvg.sort(function(a, b){return b.total-a.total})
        findTopAlbums()
    }

// STEP 4:  3rd party API call getting the top album for each of the applicable artists
    async function findTopAlbums () {
        for (let i = 0; i < 3; i++) {
            let res = await LASTFM.getTopAlbum(matchStrengthAvg[i].name)
            albumsToShow.push({
                artist: res.data.topalbums.album[0].artist.name,
                album: res.data.topalbums.album[0].name
            }) 
        }
        getAlbumInfo()
    }

// STEP 5: 3rd party API call getting the details (track list, etc for the top album from each artist entered.)
    async function getAlbumInfo () {    
        for (let i = 0; i < albumsToShow.length; i++) {
            let res = await LASTFM.getAlbumInfo(albumsToShow[i].artist, albumsToShow[i].album)
            albumDisplayInfo.push(res.data.album)
        }
        await setDisplayAlbums(albumDisplayInfo)
    }

// This determines which of the three albums shown as search results get their full information shown,
// including the number of users who currently have it marked either as recommended or in their queue.
    async function changeDetailAlbum (event) {
        event.preventDefault()
        let queuePeople = [];
        let recPeople = [];
        allUsers.map(person => {
            person.queue.map(queue => {
                if (queue.mbid === displayAlbums[event.target.id].mbid) {
                    queuePeople.push(person)
                }
            })
            person.recommended.map(rec => {
                if (rec.mbid === displayAlbums[event.target.id].mbid) {
                    recPeople.push(person)
                }
            })
        })
        setQueueUsers(queuePeople);
        setRecUsers(recPeople)
        setDetailAlbum(displayAlbums[event.target.id])
        setVisibleDetail("visible-detail")
  }

    return (
        <Container fluid>
            <div className="row search-row-top">
              <div className="col-md-4 pl-5 pr-4 pt-5 pb-5">
                  <div className="card search-card-top">
                      <div className="card-body search-card-body-top">
                          <p className="row about-header-text">how it works:</p>
                          <p className="row about-text">Enter three artists that you like that are marginally related to one another (e.g. not "2pac", "Beethoven", and "Cannibal Corpse")</p>
                          <p className="row about-text">We'll find three things you're going to LOVE!  Pick any of the three</p>
                          <p className="row about-text">If you've heard it, let the world know it's awesome by recommending it.  If you haven't, add it to your queue to play later on your platform of choice</p>
                          <p className="row about-text">See what others think!  Check out others who have queued or recommended it, and see what their tastes are all about.</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-8 pr-5 pl-4 pt-5 pb-5">
                  <div className="card search-card-top">
                      <div className="card-body search-card-body-top">
                          <form>
                              <input
                                className="input-row-search input-top mb-2 pt-2"
                                type="text"
                                name="artist1"
                                placeholder="i want artists that sound like..."
                                onChange={handleArtistEntry}
                              />
                              <input
                                className="input-row-search mt-2 mb-2 pt-2"
                                type="text"
                                name="artist2"
                                placeholder="but also a little like..."
                                onChange={handleArtistEntry}

                              />
                              <input
                                className="input-row-search input-bottom mt-2 mb-4 pt-2"
                                type="text"
                                name="artist3"
                                placeholder="finally, throw in a little..."
                                onChange={handleArtistEntry}

                              />
                              <div className="row">
                                  <div className="col-md-3">
                                      <button className="btn btn-link search-submit-btn" onClick={handleFormSubmit}>show me!</button>
                                  </div>
                                  <div className="col-md-9">
                                      <div className="error-msg" id={visibleError}>uh oh, you stumped us!  no great matches, please try again.</div>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <div className="row profile-quote-row">
              <Col size="md-12">
                  <RandomQuote 
                    artist={quoteArr[0].artist}
                    quote={quoteArr[0].quote}
                    year={quoteArr[0].year}
                      />
              </Col>
          </div>

{/* The below div will not be visible upon initial load, until the visibleList state is changed */}
          <div className="row search-row-middle" id={visibleList}>
              <div className="col-md-9 pl-5 pt-5 pb-5">
                  <div className="card search-results-card mt-3 mb-3" id={visibleCard}>
                  <div className="card-body search-results-card-body">
                      <Row>
                          {displayAlbums.map((album, index) => (
                              <AlbumList
                                id={index}
                                key={index}
                                album={album.name}
                                artist={album.artist}
                                image={album.image}
                                url={album.url}
                                tags={album.tags}
                                tracks={album.tracks}
                                mbid={album.mbid}
                                onClick={changeDetailAlbum}
                              />  
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
            <Col size="md-3">
            </Col>
        </div>

{/* The below div will not be visible upon initial load, until the visibleDetail state is changed */}
        <div className="row search-row-bottom" id={visibleDetail}>
            <div className="col-md-3">
            </div>
            <div className="col-md-9 pr-5 pt-5 pb-5">
                <div className="card search-detail-card">
                    <div className="card-body search-detail-card-body">
                        <AlbumDetail 
                          album={detailAlbum.name}
                          artist={detailAlbum.artist}
                          image={detailAlbum.image}
                          url={detailAlbum.url}
                          tags={detailAlbum.tags}
                          tracks={detailAlbum.tracks}
                          mbid={detailAlbum.mbid}
                          user={loggedIn}
                          queue={queueUsers}
                          rec={recUsers}

                        />
                    </div>  
                </div>
            </div>
        </div>
      </Container>
    );
  }


export default Search;
