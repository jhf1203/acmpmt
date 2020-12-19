import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH"
import Accordion from "../../components/AccordionComp"
import AlbumCover from "../../components/AlbumCover";

const Profile = (props) => {

  // Setting our component's initial state
  const [profile, setProfile] = useState({});
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);

  // Load all profile and store them with setProfile
  useEffect(() => {
    loadProfile();
  }, []);

  
  // Loads all profile and sets them to profile
  function loadProfile() {
    AUTH.getUser()
      .then(res => {console.log("change to getuser and heres res", res)
        setProfile(res.data.user);
      }).then(res => {console.log("profile state", profile)})
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads profile from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadProfile())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload profile from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => {
          formEl.current.reset();
          loadProfile();
        })
        .catch(err => console.log(err));
    }
  };


    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Card>
              <Row>
                <p className="profile-username-text">{profile.username}</p>
              </Row>
              <Row>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png" width="200" height="200"></img>
              </Row>
              <Row>
                <p className="profile-realname-text">{profile.firstName} {profile.lastName}</p>
              </Row>
              <Row>
                <p className="profile-membersince-text">Member Since (PLACEHOLDER VALUE FOR WHEN WE ADD JOIN DATE TO DB)</p>
              </Row>
              <Row>
                <button className="btn btn-success follow-btn">Follow placeholder for name again</button>
              </Row>
            </Card>  
          </Col>
          <Col size="md-4">
            <Card>
              <Accordion />
            </Card>
          </Col>
          <Col size="md-4">
            <Card>
              Another placeholder card for a component that's going to show my most popular tags by size.
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <p>A quote will go here</p>
        </Row>
        <Row>
          <Col size="md-6">
            <Card>
              <Row>
                <AlbumCover />
              </Row> 
            </Card>
          </Col>
          <Col size="md-6">
            <Card>
              <Row>
                <AlbumCover />
              </Row>            
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Profile;
