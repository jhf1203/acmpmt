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
import UserList from "../../components/UserList";
import PlaceholderObj from "../../utils/placeholderProfile.json"
import Randomizer from "../../utils/randomizer"
import Quotes from "../../utils/quotes.json"
import Pics from "../../utils/pics.json"
import thisPic from "../../assets/content-imgs/alanis.jpg"
import RandomQuote from "../../components/RandomQuote"


const Profile = (props) => {




  // Setting our component's initial state
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState(
    PlaceholderObj
  )
  
  const [formObject, setFormObject] = useState({});
 
  const formEl = useRef(null);

  // Load all profile and store them with setUser
  useEffect(() => {
    loadProfile();
  }, []);

let quoteArr = []

quoteArr.push(Randomizer.randomVal(Quotes))

console.log(quoteArr)

  // Loads all profile and sets them to profile
  // function loadProfile() {
  //   AUTH.getUser()
  //     .then(res => {
  //       setUser(res.data.user);
  //     }).then(res => {API.getProfile(),
  //     console.log("profile: ", )})
  //     .catch(err => console.log(err));
  // };

  async function loadProfile () {
    let thisUser = await AUTH.getUser()
    let userSet = setUser(thisUser.data.user);
    console.log("userset", user)
    let thisProfile = await API.getProfile(thisUser.data.user._id)
    console.log("thisprofile: ", thisProfile.data.user)
    setProfile(thisProfile.data.user)
  }

  console.log("user: ", user)
  console.log("and profile: ", profile)

 


  

  // Deletes a book from the database with a given id, then reloads profile from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then(res => loadProfile())
  //     .catch(err => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setFormObject({...formObject, [name]: value})
  // };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload profile from the database
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   if (formObject.title && formObject.author) {
  //     API.saveBook({
  //       title: formObject.title,
  //       author: formObject.author,
  //       synopsis: formObject.synopsis
  //     })
  //       .then(res => {
  //         formEl.current.reset();
  //         loadProfile();
  //       })
  //       .catch(err => console.log(err));
  //   }
  // };


    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Card>
              <Row>
                <p className="profile-username-text">{profile.username}</p>
              </Row>
              <Row>
                <img src={thisPic} width="100%" height="100%" />
              </Row>
              <Row>
                <p className="profile-realname-text">{profile.firstName} {profile.lastName}</p>
              </Row>
              <Row>
                <p className="profile-membersince-text">Member Since {profile.joinDate}</p>
              </Row>
              <Row>
                <button className="btn btn-success follow-btn">Follow {profile.firstName}</button>
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
          <Col size="md-2"></Col>
          {/* Function is below, but will be slightly more complicated since the quote, artist, and year have to match. 
          Maybe I envoke the function on load in a loop as many times as needed, form an array of objects and populate that way?*/}
          <Col size="md-10">
            <RandomQuote 
              artist={quoteArr[0].artist}
              quote={quoteArr[0].quote}
              year={quoteArr[0].year}
                />
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <Card>
              <Row>
              {
                  profile.queue.map((album, index) => (
                    <UserList
                      id={index}
                      key={index}
                      album={album.album}
                      artist={album.artist}
                      image={album.image}
                      url={album.url}
                      tags={album.tags}
                      tracks={album.tracks}
                      mbid={album.mbid}
                      />  
                    ))}
              </Row> 
            </Card>
          </Col>
          <Col size="md-6">
            <Card>
              <Row>
              {
                  profile.recommended.map((album, index) => (
                    <UserList
                      id={index}
                      key={index}
                      album={album.album}
                      artist={album.artist}
                      image={album.image}
                      url={album.url}
                      tags={album.tags}
                      tracks={album.tracks}
                      mbid={album.mbid}
                      />  
                    ))}
              </Row>            
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Profile;
