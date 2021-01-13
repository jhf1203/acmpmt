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
  const [similar, setSimilar] = useState ({
    similar1: [],
    similar2: [],
    similar3: []
  })
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

// HERE'S WHERE THE STRUGGLE BEGINS.  I need to put each result into its own array, so I can compare which results 
// share similar values.  I retrieve the data just fine from Last.fm, but am really struggling to get it into an 
// array that I can then use.  I can fill the artistArr arrays with the appropriate data, but they always show up
// as having a length of 0, despite the data I'm pushing having a length of 100 (which is correct, I'll probably
// shorten it in the future).  

// Since I'm doing three calls here, I'm trying three different ways, two using array.push and one using state.  I'll
// put additional notes for each method below.


  function handleFormSubmit (event) {
    event.preventDefault();
    const artistArr1 = []
    const artistArr2 = []
    const artistArr3 = []
    const matchArr1and2 = []
    const matchArr2and3 = []
    const matchArr1and3 = []
      LASTFM.getSimilar(artists.artist1)
    .then(res => {

      // Here's the first try, using a regular for loop.  the res.data.similarartists.artist.length prints as 100
      // just like it should.  However, when I push that exact data into artistArr1 the data is there, but is reading
      // as length 0.

      for (let i = 0; i < res.data.similarartists.artist.length; i++) {
        console.log(res.data.similarartists.artist[i].name)
        artistArr1.push(res.data.similarartists.artist[i])
      }
    });
    LASTFM.getSimilar(artists.artist2)
    .then(res => {

      // For this try I created a state object with a key for each result, deconstructed it to push the result into
      // the appropriate key.  doing this does not update the state, even knowing there's a slight delay with react.
      // That's why I have this state logged on the next step, to give it a chance to update.  I also checked outside
      // of the function and it wasn't there either.

      const name = similar.similar2;
      const value = res.data.similarartists.artist
      setSimilar({...similar, [name]: value})
    });
    LASTFM.getSimilar(artists.artist3)
    .then(res => {

      // Here's using array.map, gave me the same result as artistArr1.
      
      console.log("similar2 after the fill: ", similar)
      console.log(res.data.similarartists.artist.length)
      res.data.similarartists.artist.map((index) => artistArr3.push(index)) 
    })
    console.log("artists1: ", artistArr1);
    console.log("artists2: ", artistArr2);
    console.log("artists3: ", artistArr3);

    console.log("about to hit the map")
    
    console.log("similar later on: ", similar.similar2)


    
      

      
    
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
                <p>How obscure should be they be, on a scale from "One Car Garage" to "Radio City Music Hall?"</p>
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
