import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment"

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
let formattedDate = moment(profile.joinDate).format("l")

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
        <div className=" row profile-row-top">
          <div className="col-md-4 pl-5 pr-3 pt-5 pb-5 profile-col">
            <div className="card profile-card-top">
              <div className="card-body profile-card-body-top">
                <Row>
                  <p className="profile-username-text">{profile.username}</p>
                </Row>
                <Row>
                  <div className="col-md-12">
                    <img className="profile-img contain" src={thisPic} height="100%" width="100%"  />
                  </div>
                </Row>
                <Row>
                  <p className="profile-realname-text">{profile.firstName} {profile.lastName}</p>
                </Row>
                <Row>
                  <p className="profile-membersince-text">Member Since {formattedDate}</p>
                </Row>
                <Row>
                  <button className="btn btn-link follow-btn">Follow {profile.firstName}</button>
                </Row>
              </div>
            </div>  
          </div>
          <div className="col-md-4 pr-5 pl-5 pt-5 pb-5 profile-col">
            <div className="card profile-card-top">
              <div className="card-body profile-card-body-top">
                <Accordion />
              </div>
            </div>
          </div>
          <div className="col-md-4 pr-5 pl-3 pt-5 pb-5 profile-col">
            <div className="card profile-card-top">
              <div className="card-body profile-card-body-top">
                Another placeholder card for a component that's going to show my most popular tags by size.
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center profile-quote-row">
          <Col size="md-2"></Col>
          <Col size="md-10">
            <RandomQuote 
              artist={quoteArr[0].artist}
              quote={quoteArr[0].quote}
              year={quoteArr[0].year}
                />
          </Col>
        </div>
        <div className="row profile-row-bottom">
          <div className="col-md-6 pl-5 pr-4 pt-5 pb-5">
            <div className="card profile-card-bottom">
              <div className="card-body profile-card-body-bottom">
                <div className="row">
                  <h3>
                    {profile.username}'s queue:
                  </h3>
                </div>  
                  <div className="row list-row">
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
                  </div> 
                
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-4 pr-5 pt-5 pb-5">
            <div className="card profile-card-bottom">
                <div className="card-body profile-card-body-bottom">
                  <div className="row">
                    <h3>
                      {profile.username}'s recommendations:
                    </h3>
                  </div>  
                  <div className="row list-row">
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
                  </div> 
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }


export default Profile;
