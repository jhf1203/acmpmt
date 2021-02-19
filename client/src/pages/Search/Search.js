import React, { useState, useEffect, useRef, useDebugValue } from "react";

import { Col, Row, Container } from "../../components/Grid";
import AlbumList from "../../components/AlbumList";
import AlbumDetail from "../../components/AlbumDetail";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import LASTFM from "../../utils/LASTFM";
import PlaceholderObj from "../../utils/placeholder.json";
import Randomizer from "../../utils/randomizer";
import Quotes from "../../utils/quotes.json";
import RandomQuote from "../../components/RandomQuote";

const Search = (props) => {
  // Setting our component's initial state
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState();

  // determine which artists will be looked up to find similar ones.
  const [artists, setArtists] = useState({
    artist1: "",
    artist2: "",
    artist3: "",
  });
  const [loggedIn, setLoggedIn] = useState();

  // determine which three albums will display as search results, randomized from the top 15 results
  const [displayAlbums, setDisplayAlbums] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);

  // determine which of the three search results will have full details displayed
  const [detailAlbum, setDetailAlbum] = useState(PlaceholderObj);

  // toggling ids that determine the display property of some divs that we want to keep hidden
  // since they have empty information at the beginning.
  const [visibleError, setVisibleError] = useState("invisible-error");

  // All users, from which we need queue and recommended list data
  const [allUsers, setAllUsers] = useState([]);

  // Groups of users that have an album either in their queue, or as recommended.
  const [queueUsers, setQueueUsers] = useState([]);
  const [recUsers, setRecUsers] = useState([]);

  // Load all profile and store them with setProfile
  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    findUsers();
  }, []);

  // Loads all profile and sets them to profile
  function loadProfile() {
    AUTH.getUser()
      .then((res) => {
        setProfile(res.data.profile);
        setUser(res.data.user._id);
      })
      .catch((err) => console.log(err));
  }

  // Populates the random lyrics from quotes.json
  let quoteArr = [];
  quoteArr.push(Randomizer.randomVal(Quotes));

  // Creates an object of all users from which to pull the queue and recommended data per album
  async function findUsers() {
    let userList = await API.getAllProfiles();
    setAllUsers(userList.data.users);
  }

  // utility arrays to filter similar artist strongest matches
  const similarArr = [];
  const match1 = [];
  const match2 = [];
  const match3 = [];
  const match2and3 = [];
  const matchWithStrength = [];
  const matchStrengthAvg = [];
  const albumArrTop = [];
  const albumDisplayInfo = [];

  // STEP 1:  Modifies artist state based off of user input
  function handleArtistEntry(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setArtists({ ...artists, [name]: value });
  }

  // Third Party API call to find similar artists for each input
  async function getSimilarArtists(artistState) {
    const res = await LASTFM.getSimilar(artistState);
    similarArr.push(res.data.similarartists.artist);
  }

  // STEP 2: Form submission, populating utility arrays based off of frequency that similar artist shows up
  // for each artist the user submitted (most is 3, least is 1)
  async function handleFormSubmit(event) {
    event.preventDefault();
    let middleRow = document.querySelector(".search-row-middle");
    let bottomRow = document.querySelector(".search-row-bottom");
    let loadText = document.querySelector(".loading-text");
    let successMsg = document.querySelector(".success-msg");
    let errorMsg = document.querySelector(".error-msg");
    middleRow.id = "hide";
    bottomRow.id = "hide";
    errorMsg.id = "hide";
    successMsg.id = "hide";
    loadText.id = "text-show";
    let textFade = setInterval(() => {
      loadText.id === "text-show"
        ? (loadText.id = "text-hide")
        : (loadText.id = "text-show");
    }, 700);
    setTimeout(() => {
      middleRow.id = "show";
      clearInterval(textFade);
      loadText.id = "hide";
    }, 7000);

    setVisibleError("invisible-error");
    await getSimilarArtists(artists.artist1);
    await getSimilarArtists(artists.artist2);
    await getSimilarArtists(artists.artist3);

    similarArr[0].map((band) => {
      match1.push(band.name);
    });
    similarArr[1].map((band) => {
      if (match1.indexOf(band.name) != -1) {
        match2.push(band.name);
      } else {
        match1.push(band.name);
      }
    });
    similarArr[2].map((band) => {
      if (match2.indexOf(band.name) != -1) {
        match3.push(band.name);
      } else if (match1.indexOf(band.name) != -1) {
        match2.push(band.name);
      } else {
        match1.push(band.name);
      }
    });
    if (match3.length > 15) {
      setTimeout(() => {
        successMsg.id = "show";
      }, 7000);
      addBandObj(match3);
    } else {
      match3.map((result) => {
        match2and3.push(result);
      });
      match2.map((result) => {
        match2and3.push(result);
      });
      if (match2and3.length > 15) {
        setTimeout(() => {
          successMsg.id = "show";
        }, 7000);
        addBandObj(match2and3);
      } else {
        let errorMsg = document.querySelector(".error-msg");
        setTimeout(() => {
          errorMsg.id = "show";
        }, 7000);
      }
    }
  }

  // STEP 3: Creating a custom object with aggregated match data from each user entry (match can be as low as "0"
  // and as high as "1", this ensures three weak matches won't override one or two stronger ones.)
  async function addBandObj(arrMatch) {
    for (let i = 0; i < arrMatch.length; i++) {
      let nameIndex1 = await similarArr[0].findIndex(
        (index) => index.name === arrMatch[i]
      );
      let nameIndex2 = await similarArr[1].findIndex(
        (index) => index.name === arrMatch[i]
      );
      let nameIndex3 = await similarArr[2].findIndex(
        (index) => index.name === arrMatch[i]
      );

      // Handling items with only two scores (pushed from Match2 instead of Match3)
      if (nameIndex1 === -1) {
        matchWithStrength.push({
          name: arrMatch[i],
          ratings: [
            parseFloat(similarArr[1][nameIndex2].match),
            parseFloat(similarArr[2][nameIndex3].match),
          ],
        });
      } else if (nameIndex2 === -1) {
        matchWithStrength.push({
          name: arrMatch[i],
          ratings: [
            parseFloat(similarArr[0][nameIndex1].match),
            parseFloat(similarArr[2][nameIndex3].match),
          ],
        });
      } else if (nameIndex3 === -1) {
        matchWithStrength.push({
          name: arrMatch[i],
          ratings: [
            parseFloat(similarArr[0][nameIndex1].match),
            parseFloat(similarArr[1][nameIndex2].match),
          ],
        });
      } else {
        matchWithStrength.push({
          name: arrMatch[i],
          ratings: [
            parseFloat(similarArr[0][nameIndex1].match),
            parseFloat(similarArr[1][nameIndex2].match),
            parseFloat(similarArr[2][nameIndex3].match),
          ],
        });
      }
    }
    for (let i = 0; i < matchWithStrength.length; i++) {
      if (arrMatch === match3) {
        matchStrengthAvg.push({
          name: matchWithStrength[i].name,
          total:
            matchWithStrength[i].ratings[0] +
            matchWithStrength[i].ratings[1] +
            matchWithStrength[i].ratings[2],
        });
      } else if (arrMatch === match2) {
        matchStrengthAvg.push({
          name: matchWithStrength[i].name,
          total:
            matchWithStrength[i].ratings[0] + matchWithStrength[i].ratings[1],
        });
      } else {
        matchStrengthAvg.push({
          name: matchWithStrength[i].name,
          total: matchWithStrength[i].ratings[0],
        });
      }
    }
    // Sorting the array to have the highest aggregate match score be index 0, etc etc
    matchStrengthAvg.sort(function (a, b) {
      return b.total - a.total;
    });

    findTopAlbums();
  }

  // STEP 4:  3rd party API call getting the top album for each of the applicable artists
  async function findTopAlbums() {
    for (let i = 0; i < 15; i++) {
      let res = await LASTFM.getTopAlbum(matchStrengthAvg[i].name);
      albumArrTop.push({
        artist: res.data.topalbums.album[0].artist.name,
        album: res.data.topalbums.album[0].name,
      });
    }
    getAlbumInfo();
  }

  // STEP 5: 3rd party API call getting the details (track list, etc for the top album from each artist entered.)
  async function getAlbumInfo() {
    for (let i = 0; i < albumArrTop.length; i++) {
      if (
        albumArrTop[i].artist.indexOf("/") === -1 &&
        albumArrTop[i].album.indexOf("/") === -1
      ) {
        let res = await LASTFM.getAlbumInfo(
          albumArrTop[i].artist,
          albumArrTop[i].album
        );
        albumDisplayInfo.push(res.data.album);
      }
    }
    await setAllAlbums(albumDisplayInfo);
    pickRandomDisplays(albumDisplayInfo);
  }

  // STEP 6.  Randomizing the result of 15 to show three albums only
  async function pickRandomDisplays(arr) {
    let arrOfThree = [];
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * arr.length);
      if (arrOfThree.indexOf(arr[randomNum]) === -1) {
        arrOfThree.push(arr[randomNum]);
      } else if (arrOfThree.indexOf(arr[0]) === -1) {
        arrOfThree.push(arr[0]);
      } else {
        arrOfThree.push(arr[1]);
      }
    }

    await setDisplayAlbums(arrOfThree);
  }

  // Re-calling the above function to reload three more results, this time from allAlbums since the state
  // change is complete.
  function refreshResults() {
    let resultRow = document.getElementsByClassName("result-row");
    resultRow.innerHTML = "";
    pickRandomDisplays(allAlbums);
  }

  // This determines which of the three albums shown as search results get their full information shown,
  // including the number of users who currently have it marked either as recommended or in their queue.
  async function changeDetailAlbum(event) {
    event.preventDefault();
    let bottomRow = document.querySelector(".search-row-bottom");
    let scrollText = document.querySelector(".scroll-down-text");
    bottomRow.id = "show-flex";
    scrollText.id = "show";
    let queuePeople = [];
    let recPeople = [];
    allUsers.map((person) => {
      person.queue.map((queue) => {
        if (queue.mbid === displayAlbums[event.target.id].mbid) {
          queuePeople.push(person);
        }
      });
      person.recommended.map((rec) => {
        if (rec.mbid === displayAlbums[event.target.id].mbid) {
          recPeople.push(person);
        }
      });
    });
    setQueueUsers(queuePeople);
    setRecUsers(recPeople);
    setDetailAlbum(displayAlbums[event.target.id]);
  }

  return (
    <Container fluid>
      <div className="row search-row-top">
        <div className="col-md-4 pl-5 pr-4 pt-5 pb-5 profile-col">
          <div className="card search-card-top">
            <div className="card-body search-card-body-top">
              <p className="row about-header-text">how it works:</p>
              <p className="row about-text">
                Enter three artists that you like that are marginally related to
                one another (e.g. not "2pac", "Beethoven", and "Cannibal
                Corpse")
              </p>
              <p className="row about-text">
                We'll find three things you're going to LOVE! Pick any of the
                three
              </p>
              <p className="row about-text">
                If you've heard it, let the world know it's awesome by
                recommending it. If you haven't, add it to your queue to play
                later on your platform of choice
              </p>
              <p className="row about-text">
                See what others think! Check out others who have queued or
                recommended it, and see what their tastes are all about.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-8 pr-5 pl-4 pt-5 pb-5 profile-col">
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
                    <button
                      className="btn btn-link search-submit-btn"
                      onClick={handleFormSubmit}
                    >
                      show me!
                    </button>
                  </div>
                  <div className="col-md-9">
                    {/* <div className="loading-div"> */}
                    <p className="loading-text" id="hide">
                      fetching results
                    </p>
                    {/* </div> */}
                    <div className="error-msg" id="hide">
                      uh oh, you stumped us! no great matches, please try again.
                    </div>
                    <div className="success-msg" id="hide">
                      success! check out your results below!
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* The below div will not be visible upon initial load, until the visibleList state is changed */}
      <div className="row search-row-middle" id="hide">
        <div className="col-md-9 pl-5 pt-5 pb-5 profile-col">
          <div className="card search-results-card mt-3 mb-3">
            <div className="card-body search-results-card-body">
              <div className="row result-row">
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
              </div>
              <div className="result-action-row">
                <div className="col-md-4 refresh-btn-col">
                  <button
                    className="btn btn-link refresh-result-btn"
                    onClick={refreshResults}
                  >
                    see more matches
                  </button>
                </div>
                <div className="col-md-8 next-step-col">
                  <p className="scroll-down-text" id="hide">
                    {" "}
                    scroll down for details!{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Col size="md-3"></Col>
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

      {/* The below div will not be visible upon initial load, until the visibleDetail state is changed */}
      <div className="row search-row-bottom" id="hide">
        <div className="col-md-3"></div>
        <div className="col-md-9 pr-5 pt-5 pb-5 profile-col">
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
                user={user}
                queue={queueUsers}
                rec={recUsers}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Search;
