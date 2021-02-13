import React, { useState, useEffect, useRef } from "react";
import { Carousel } from "react-bootstrap"

import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

function Album() {
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
      <Container> 
          <Row>
              <Col size="md-8">
                  <Card>
                      This will house the basic album info 
                  </Card>
              </Col>
              <Col size="md-4">
                  <Card>
                      This will house the media player
                  </Card>
              </Col>
          </Row>
          <Row>
              <Col size="md-4">
                  <Card title="Similar">
                    Here we will render similar artists/albums  
                  </Card>
              </Col>
              <Col size="md-4">
                  <Card title="In Queue">
                      Here we will display all users with this album in queue
                  </Card>
              </Col>
              <Col size="md-4">
                  <Card title="Recommended">
                      Here we will display all users who have this album as a recommendation.
                  </Card>
              </Col>
          </Row>
      </Container>
    );
  }


export default Album;
