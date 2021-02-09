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
import RandomQuote from "../../components/RandomQuote"
import ProfileAlbumView from "../../components/ProfileAlbumView"
import PlaceholderAlbum from "../../utils/placeholder.json"
import ProfileCard from "../../components/ProfileCard"
import WordCloud from "../../components/WordCloud"


const Profile = (props) => {


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
  console.log("user: ", user)
  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    findUsers();
  }, []);

let params = useParams().id

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

  async function loadProfile () {
    let foundUser = await AUTH.getUser();
    setUser(foundUser.data.user)
    if (params) {
      let foundProfile = await API.getProfile(params);
      setProfile(foundProfile.data.result)
    } else {
    let foundProfile = await API.getProfile(foundUser._id)
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
    let userToFollowId = userToFollow.data.result._id
    API.followUser(me, userToFollowId)
    API.followerAdd(userToFollowId, me)
  }

  let widget =  window.cloudinary.createUploadWidget({
    cloud_name: "duf4y1dco",
    upload_preset: "lni6nbrv",
    styles: {
      palette: {
        window: "#ececec",
        windowBorder: "#374785",
        tabIcon: "#374785",
        menuIcons: "#2a2a2a",
        textDark: "#2a2a2a",
        textLight: "#ececec",
        link:  "#374785",
        action:  "#374785",
        inactiveTabIcon: "#9a9a9a",
        error: "#F76C6C",
        inProgress: "#F8E9A1",
        complete: "#374785",
        sourceBg: "#ececec"
      },
      fonts: {
        "'Raleway', sans serif" : "https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap"
      },
    },
    cropping: true,
    croppingCoordinatesMode: "custom",
    croppingAspectRatio: 1,
    showSkipCropButton: false
  },
  function (error, result) {
    imageUpload(result);
  });



function showWidget() {
    widget.open();
};

function imageUpload(resultEvent) {
  if (user) {
  const userID = user._id;
  
  if(resultEvent.event === "success") {
      const imageURL = {
          image: resultEvent.info.secure_url
      };

      API.updateImage(userID, imageURL)
      .then((res) => {
          console.log(res.data);
          setUser(res.data);
      })
    }
  }
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
              showWidget={showWidget}

              />
          </div>
          <div className="col-md-4 pr-5 pl-5 pt-5 pb-5 profile-col">
            <div className="card profile-card-top">
              <div className="card-body profile-card-body-top">
                <Accordion 
                  followers={profile.followers}
                  following={profile.following}
                  userName={profile.username}/>
              </div>
            </div>
          </div>
          <div className="col-md-4 pr-5 pl-3 pt-5 pb-5 profile-col">
            <div className="card profile-card-top">
              <div className="card-body profile-card-body-top">
                <div className="row">
                  <p className="cloud-header-text">{profile.firstName}'s collection</p>
                </div>
                <WordCloud 
                  queue={profile.queue}
                  recommended={profile.recommended}
                  />
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
