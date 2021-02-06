import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import moment from "moment"
import { BrowserRouter as Router, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
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
import thisPic from "../../assets/content-imgs/alanis.jpg"
import RandomQuote from "../../components/RandomQuote"
import ProfileAlbumView from "../../components/ProfileAlbumView"
import PlaceholderAlbum from "../../utils/placeholder.json"
import ProfileCard from "../../components/ProfileCard"


const Profile = (props) => {


console.log("props? ", props)
console.log("")

  // Setting our component's initial state
  const [user, setUser] = useState();
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
  const [otherUser, setOtherUser] = useState("dummy")
  const [formObject, setFormObject] = useState({});
 
  const formEl = useRef("rvfr");

  // Load all profile and store them with setUser
  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    findUsers();
  }, []);

  // useEffect(() => {
  //   setOtherUser(useParams().id)
  // }, [])

  // console.log("params?: ", useParams().id)

  let params = useParams().id

  // if (params) {
  //   console.log("there are params and they are: ", params)
  // } else {
  //   console.log("aint no params up in hurr")
  // }
  // console.log(!params, "params")

let quoteArr = []
let formattedDate = moment(profile.joinDate).format("l")

const queue = profile.queue;
const rec = profile.recommended;

quoteArr.push(Randomizer.randomVal(Quotes))



// ===============BELOW WAS THE ORIGINAL FUNCTION, WHICH I CONVERTED TO ASYNC

  // Loads all profile and sets them to profile
  // function loadProfile() {
  //   AUTH.getUser()
  //     .then(res => {
  //       console.log("first res: ", res)
  //       setUser(res.data.user);
  //       return res.data.user
  //     }).then(res => {
  //       console.log("middle res: ", res)
  //       API.getProfile(res._id)
  //       return res
  //     }).then(res => {
  //       console.log("new second res: ", res)
  //       setProfile(res)
  //     }) 
  //     .catch(err => console.log(err));
  // };


// ===HERE'S OUR PROBLEM CHILD!!!===

// If I click on a user from either the albumDetail or ProfileAlbumView components, that person's userid
// will successfully populate under params in the below console.log

console.log("user: ", user)
console.log("profile: ", profile)

  async function loadProfile () {
    let foundUser = await AUTH.getUser();
    setUser(foundUser.data.user)
    // console.log("founduser data: ", foundUser.data.user)

// Even if params are found and validated in the log above, the profile is always set/displayed as
// the foundUser.id, i.e. the logged in user from AUTH.getUser.  

// - I thought about getting the page to reload, or creating a dummy function to place in the dependency
// for the useEffect to ensure it re-runs, but either way the params update from undefined to the correct
// value but the console.log for profile still reads just the logged in user.
    // console.log("params in fn: ", params)
    if (params) {
      let foundProfile = await API.getProfile(params);
      // console.log("foundprofile with the conditional true: ", foundProfile)
      setProfile(foundProfile.data.result)
    } else {
    let foundProfile = await API.getProfile(foundUser._id)
    // console.log("foundprofile with the conditional false: ", foundProfile)
    setProfile(foundProfile.data.result)
    }
  }

  async function findUsers () {
    let userList = await API.getAllProfiles()
    setAllUsers(userList.data.users)
  }

  async function changeDetailFromQueue (event, list) {

    let queuePeople = [];
    let recPeople = [];

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

  async function followUser (event) {
    let me = user._id;
    let userToFollow = await API.getProfile(event.target.id)
    console.log("usertofollow: ", userToFollow.data.result);
    let userToFollowId = userToFollow.data.result._id
    API.followUser(me, userToFollowId)
    API.followerAdd(userToFollowId, me)
  }

    return (
      <Container fluid>
        <div className=" row profile-row-top">
          <div className="col-md-4 pl-5 pr-3 pt-5 pb-5 profile-col">
            {console.log("profile log in jsx: ", profile)}
            <ProfileCard 
              firstName={profile.firstName}
              lastName={profile.lastName}
              userName={profile.username}
              joinDate={formattedDate}
              id={profile._id}
              image={profile.image}
              followUser={followUser}

              />
            {/* <div className="card profile-card-top">
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
            </div>   */}
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
                    loadProfile={loadProfile}

                  />
                </div>  
              </div>
            </div>
          </div>
      </Container>
    );
  }


export default Profile;
