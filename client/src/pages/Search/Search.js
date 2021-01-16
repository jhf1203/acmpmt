import React, { useState, useEffect, useRef, useDebugValue } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap"

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import LASTFM from "../../utils/LASTFM";
import { use } from "passport";
// import { update } from "../../../../server/models/user";
import { STATES } from "mongoose";

const Search = (props) => {
  // Setting our component's initial state
  const [profile, setProfile] = useState({});
  const [artists, setArtists] = useState({
    artist1: "",
    artist2: "",
    artist3: ""
  })
  const [obscurity, setObscurity] = useState("original")

  // Commenting the below code because I feel like it's something simple to get it to work.

  // const [similar, setSimilar] = useState ({
  //   similar1: [],
  //   similar2: [],
  //   similar3: []
  // })


// The above doesn't work, but the below does.  

  const [similar1, setSimilar1] = useState([]);
  const [similar2, setSimilar2] = useState([]);
  const [similar3, setSimilar3] = useState([])


  const formEl = useRef(null);




  // Load all profile and store them with setProfile
  useEffect(() => {
    loadProfile();
  }, []);

  // Loads all profile and sets them to profile
  function loadProfile() {
    API.getProfile()
      .then(res => {
        // console.log(res.data.profile);
        setProfile(res.data.profile);
      })
      .catch(err => console.log(err));
  };

  function handleArtistEntry (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name
    setArtists({...artists, [name]: value})
  }

  function populateMatches () {
    console.log("in populate: ", similar1)
  }

  const match1 = [];
  const match2 = [];
  const match3 = []
  const matchWithStrength = []
  const matchStrengthAvg = []


  function getSimilarArtists (artistState, similarState) {
    LASTFM.getSimilar(artistState)
    .then(res => {
      similarState(res.data.similarartists.artist)
    })
  }


  function addBandObj (arrMatch) {
    console.log("similar", [similar3.name].indexOf("Audioslave"))
    for (let i = 0; i < arrMatch.length; i++) {
      let nameIndex1 = similar1.findIndex(index => index.name === arrMatch[i])
      let nameIndex2 = similar2.findIndex(index => index.name === arrMatch[i])
      let nameIndex3 = similar3.findIndex(index => index.name === arrMatch[i])
      matchWithStrength.push({
        name: arrMatch[i],
        ratings: [parseFloat(similar1[nameIndex1].match), parseFloat(similar2[nameIndex2].match), parseFloat(similar3[nameIndex3].match)]
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

    matchStrengthAvg.sort(function(a, b){return b-a})

    console.log("Arr", matchStrengthAvg)
    
  }

  function handleSlider (event) {
    event.preventDefault();

    getSimilarArtists(artists.artist1, setSimilar1);
    getSimilarArtists(artists.artist2, setSimilar2);
    getSimilarArtists(artists.artist3, setSimilar3);

    setObscurity("Changed!")

  };

  function handleFormSubmit (event) {
    event.preventDefault()

    similar1.map(band => {match1.push(band.name)}) 

    similar2.map(band => {      
      if (match1.indexOf(band.name) != -1) {
        match2.push(band.name)
      } else {
        match1.push(band.name)
      }
    });

    similar3.map(band => {
      if (match2.indexOf(band.name) != -1) {
        match3.push(band.name)
      } else if (match1.indexOf(band.name) != -1) {
        match2.push(band.name)
      } else {
        match1.push(band.name)
      }
    })

    addBandObj(match3);

  }

  

    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
              <Card>
                  <p>This will be a quick description of what this search page does and how to use it.</p>
              </Card>
          </Col>
          <Col size="md-8">
              <Card>
                {/* Took handleformsubmit out of here...wtf was it doing here?? */}
                  <p>Show me artists that sound like</p>
                  <form 
                  style={{marginTop: 10}}
                  >
                <Input
                  type="text"
                  name="artist1"
                  placeholder="Artist"
                  onChange={handleArtistEntry}
                />
                <p>but also a little like</p>
                <Input
                  type="text"
                  name="artist2"
                  placeholder="Artist"
                  onChange={handleArtistEntry}

                />
                <p>Finally, throw in a little</p>
                <Input
                  type="text"
                  name="artist3"
                  placeholder="Artist"
                  onChange={handleArtistEntry}

                />
                <button onClick={handleSlider}>slider will go here</button>
                <FormBtn onClick={handleFormSubmit}>Show me!</FormBtn>
              </form>
              </Card>
          </Col>
        </Row>
        <Row>
            <p>Placeholder for some song lyrics</p>
        </Row>
        <Row>
            <Col size="md-6">
                <Card>
                  <p>Here is where the list of albums will render as results, 4x2.</p>
                </Card>
            </Col>
            <Col size="md-6">
              <Card>
                <Row>
                  <Col size="md-6">
                    <p>This will house the basic album info from the API pull</p>
                  </Col>
                  <Col size="md=6">
                    <p>A spotify player will be embedded here!</p>
                  </Col>
                </Row>
              </Card>
            </Col>
        </Row>
      </Container>
    );
  }


export default Search;
