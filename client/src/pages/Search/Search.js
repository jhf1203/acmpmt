import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function Search() {
  // Setting our component's initial state
  const [profile, setProfile] = useState([]);
  const [formObject, setFormObject] = useState({});
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

  // Deletes a book from the database with a given id, then reloads profile from the db
  

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
                  <p>Show me artists that sound like</p>
                  <form style={{marginTop: 10}}>
                <Input
                  type="text"
                  name="band1"
                  placeholder="Artist"
                />
                <p>but also a little like</p>
                <Input
                  type="text"
                  name="band2"
                  placeholder="Artist"
                />
                <p>Finally, throw in a little</p>
                <Input
                  type="text"
                  name="band3"
                  placeholder="Artist"
                />
                <p>How obscure should be they be, on a scale from "One Car Garage" to "Radio City Music Hall?"</p>
                <FormBtn>Show me!</FormBtn>
              </form>
              </Card>
          </Col>
        </Row>
        <Row>
            <p>Placeholder for some song lyrics</p>
        </Row>
        <Row>
            <Col size="md-8">
                <Card>
                    <p>This is where we'll render eight cards with results</p>
                </Card>
            </Col>
            <Col size="md-4">
                <Card>
                    <p>Here is where we'll populate the result on click.</p>
                    <p>It would be interesting if the results could start as a col-12, then move to a col-8 with a col-4 for the media player as separate components.</p>
                </Card>
            </Col>
        </Row>
      </Container>
    );
  }


export default Search;
