import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap"

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

const Search = (props) => {
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
  console.log("search props", props)

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
