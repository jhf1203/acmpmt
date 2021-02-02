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
import PlaceholderProfile from "../../utils/placeholderProfile.json"
import Randomizer from "../../utils/randomizer"
import Quotes from "../../utils/quotes.json"
import Pics from "../../utils/pics.json"
import thisPic from "../../assets/content-imgs/alanis.jpg"
import RandomQuote from "../../components/RandomQuote"
import ProfileAlbumView from "../../components/ProfileAlbumView"
import PlaceholderAlbum from "../../utils/placeholder.json"


const Profile = (props) => {


// console.log("props? ", props)

  // Setting our component's initial state
  const [user, setUser] = useState(props.user);
  const [profile, setProfile] = useState(
    PlaceholderProfile
  )
  const [detailAlbum, setDetailAlbum] = useState(
    PlaceholderAlbum
  )
  const [visibleDetail, setVisibleDetail] = useState("hide")
  const [allUsers, setAllUsers] = useState([])
  const [queueUsers, setQueueUsers] = useState([]);
  const [recUsers, setRecUsers] = useState([]);
  const [formObject, setFormObject] = useState({});
 
  const formEl = useRef(null);

  // Load all profile and store them with setUser
  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    findUsers();
  }, []);

let quoteArr = []
let formattedDate = moment(profile.joinDate).format("l")

const queue = profile.queue;
const rec = profile.recommended;

quoteArr.push(Randomizer.randomVal(Quotes))

  // Loads all profile and sets them to profile
  // function loadProfile() {
  //   AUTH.getUser()
  //     .then(res => {
  //       setUser(res.data.user);
  //     }).then(res => {API.getProfile(),
  //     console.log("profile: ", )})
  //     .catch(err => console.log(err));
  // };

  // Maybe I break this into a split function, where we get the user, but pass a different
  // userID in as props.  If the props.userId doesn't equal the user in getuser we loadprofile with props,
  // otherwise we load it with getUser?

  async function loadProfile () {
    // console.log("userset", user)
    let thisUser = await AUTH.getUser()
    let userSet = setUser(thisUser.data.user);
    // console.log("user conditional: ", user === null)
    // if (props.user === null) {
    //   console.log("not yet")
    // } else {
    let thisProfile = await API.getProfile(user)
    // console.log("thisprofile: ", thisProfile.data.user)
    setProfile(thisProfile.data.user)
    // }
  }

  async function findUsers () {
    let userList = await API.getAllProfiles()
    console.log("userlist: ", userList.data.users)
    setAllUsers(userList.data.users)
  }

  async function changeDetailFromQueue (event, list) {

    console.log("event:  ", event.target.id)
    let queuePeople = [];
    let recPeople = [];
    // console.log("DetailAlbum: ", displayAlbums[event.target.id].mbid)
    // console.log("DetailAlbum: ", profile.queue[event.target.id].artist)
    // console.log("users: ", allUsers)
    allUsers.map(person => {
      person.queue.map(queue => {
        if (queue.mbid === profile.queue[event.target.id].mbid) {
          queuePeople.push(person)
        }
      })
      person.recommended.map(rec => {
        if (rec.mbid === profile.queue[event.target.id].mbid) {
          recPeople.push(person)
        }
      })
    })
    setQueueUsers(queuePeople);
    setRecUsers(recPeople)
    setDetailAlbum(profile.queue[event.target.id])
    setVisibleDetail("visible-detail")
  }

  function loadDetails (event) {
    console.log("event: ", event)
  }

 

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
                          function={changeDetailFromQueue}
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
                          // function={changeDetailAlbum}
                          />  
                        ))}
                  </div> 
              </div>
            </div>
          </div>
        </div>
        <div className="row search-row-bottom profile-detail-display-row" id={visibleDetail}>
            <div className="col-md-3">
            </div>
            <div className="col-md-9 pr-5 pt-5 pb-5">
              <div className="card search-detail-card">
                <div className="card-body search-detail-card-body">
                  <ProfileAlbumView 
                    album={detailAlbum.album}
                    artist={detailAlbum.artist}
                    image={detailAlbum.image}
                    url={detailAlbum.url}
                    tags={detailAlbum.tags}
                    tracks={detailAlbum.tracks}
                    mbid={detailAlbum.mbid}
                    queue={queueUsers}
                    rec={recUsers}

                  />
                </div>  
              </div>
            </div>
          </div>
      </Container>
    );
  }


export default Profile;
