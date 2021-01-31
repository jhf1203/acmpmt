import React, { useState, useEffect, useRef, useDebugValue } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap"

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import AlbumList from "../../components/AlbumList"
import AlbumDetail from "../../components/AlbumDetail"
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH"
import LASTFM from "../../utils/LASTFM";
import PlaceholderObj from "../../utils/placeholder.json"
import { use } from "passport";
// import { update } from "../../../../server/models/user";
import { STATES } from "mongoose";
import Randomizer from "../../utils/randomizer"
import Quotes from "../../utils/quotes.json"
import RandomQuote from "../../components/RandomQuote"

const Search = (props) => {
  // Setting our component's initial state
  const [profile, setProfile] = useState({});
  const [artists, setArtists] = useState({
    artist1: "",
    artist2: "",
    artist3: ""
  })
  const [loggedIn, setLoggedIn] = useState() 
  const [displayAlbums, setDisplayAlbums] = useState([])
  const [detailAlbum, setDetailAlbum] = useState(
    PlaceholderObj
  )
  const [visibleList, setVisibleList] = useState("invisible-list")
  const [visibleDetail, setVisibleDetail] = useState("invisible-detail")
  const [visibleCard, setVisibleCard] = useState("invisible-card")

  const formEl = useRef(null);


  // Load all profile and store them with setProfile
  useEffect(() => {
    loadProfile();
  }, []);

  // Loads all profile and sets them to profile
  function loadProfile() {
    AUTH.getUser()
    // API.getProfile()
      .then(res => {
        // console.log(res.data.profile);
        setProfile(res.data.profile);
        setLoggedIn(res.data.user._id)
      })
      .catch(err => console.log(err));
  };

  let quoteArr = []

  quoteArr.push(Randomizer.randomVal(Quotes))

  function handleArtistEntry (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name
    setArtists({...artists, [name]: value})
  }

  const similarArr = []
  const match1 = [];
  const match2 = [];
  const match3 = []
  const matchWithStrength = []
  const matchStrengthAvg = []
  const albumsToShow = []
  const albumDisplayInfo = []


  async function getSimilarArtists (artistState) {
    const res = await LASTFM.getSimilar(artistState) 
    similarArr.push(res.data.similarartists.artist)
  }

  async function getAlbumInfo () {
    
    for (let i = 0; i < albumsToShow.length; i++) {
      let res = await LASTFM.getAlbumInfo(albumsToShow[i].artist, albumsToShow[i].album)
      albumDisplayInfo.push(res.data.album)
    }
    await setDisplayAlbums(albumDisplayInfo)
    console.log("display arr: ", albumDisplayInfo)
    console.log("display state", displayAlbums)
  }


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

    matchStrengthAvg.sort(function(a, b){return b.total-a.total})
    console.log("matchstrengthavg is giving us trouble: ", matchStrengthAvg)
    findTopAlbums()
  }

  async function handleSlider (event) {
    event.preventDefault();

    await getSimilarArtists(artists.artist1);
    await getSimilarArtists(artists.artist2);
    await getSimilarArtists(artists.artist3);

    // setObscurity("Changed!")
  };

  // We need to add a method in here that changes the id of the results page.  On a timeout first make the row visible to fade in the background image, then display the actual results (~5sec)
  async function handleFormSubmit (event) {
    event.preventDefault()
    console.log("we clicked it")
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
    addBandObj(match3);
    console.log("match arrays: ", match1, match2, match3)
    setVisibleList("visible-list");
    setVisibleCard("visible-card")
  }

  function changeDetailAlbum (event) {
    event.preventDefault()
    setDetailAlbum(displayAlbums[event.target.id])
    setVisibleDetail("visible-detail")
  }

    return (
      <Container fluid>
        <div className="row search-row-top">
          <div className="col-md-4 pl-5 pr-4 pt-5 pb-5">
              <div className="card search-card-top">
                <div className="card-body search-card-body-top">
                  <p>This will be a quick description of what this search page does and how to use it.</p>
                </div>
              </div>
          </div>
          <div className="col-md-8 pr-5 pl-4 pt-5 pb-5">
              <div className="card search-card-top">
                <div className="card-body search-card-body-top">
                    <form 
                    >
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
                  <button className="btn btn-link search-submit-btn" onClick={handleFormSubmit}>show me!</button>
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
        <div className="row search-row-middle" id={visibleList}>
            <div className="col-md-9 pl-5 pt-5 pb-5">
                <div className="card search-results-card mt-3 mb-3" id={visibleCard}>
                  <div className="card-body search-results-card-body">
                    <Row>
                      {
                      displayAlbums.map((album, index) => (
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
          <div className="row search-row-bottom" id={visibleDetail}>
            <Col size="md-3">
            </Col>
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
                  />
                </div>  
              </div>
            </div>
          </div>
      </Container>
    );
  }


export default Search;
