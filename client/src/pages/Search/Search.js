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
    console.log("name", name)

    setArtists({...artists, [name]: value})
  }


  function handleFormSubmit (event) {
    event.preventDefault();
      LASTFM.getSimilar(artists.artist1)
    .then(res => {
      const value = res.data.similarartists.artist
      console.log("value1: ", value)
      setSimilar1([value])
    });
    LASTFM.getSimilar(artists.artist2)
    .then(res => {
      const value = res.data.similarartists.artist
      console.log("value2: ", value)
      setSimilar2([value])

    });
    LASTFM.getSimilar(artists.artist3)
    .then(res => {
      const value = res.data.similarartists.artist
      console.log("value3: ", value)
      setSimilar3([value])
    })
  
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
