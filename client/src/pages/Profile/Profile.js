import React, { useState, useEffect, useRef } from "react";
import moment from "moment"
import { HashRouter as Router, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

import { Col, Container } from "../../components/Grid";
import UserList from "../../components/UserList";
import RandomQuote from "../../components/RandomQuote"
import ProfileAlbumView from "../../components/ProfileAlbumView"
import PlaceholderAlbum from "../../utils/placeholder.json"
import ProfileCard from "../../components/ProfileCard"
import WordCloud from "../../components/WordCloud"
import ConnectionList from "../../components/ConnectionList"

import API from "../../utils/API";
import AUTH from "../../utils/AUTH"
import PlaceholderProfile from "../../utils/placeholderProfile.json"
import Randomizer from "../../utils/randomizer"
import Quotes from "../../utils/quotes.json"


const Profile = (props) => {

    // Setting our component's initial state
    const [user, setUser] = useState();
    const [profile, setProfile] = useState(
      PlaceholderProfile
    )

// Determining which album will be passed into the ProfileAlbumView component 
    const [detailAlbum, setDetailAlbum] = useState(
      PlaceholderAlbum
    )

// Toggling the display property of the ProfileAlbumView component to hide until it has content
    const [visibleDetail, setVisibleDetail] = useState("hide")

// Storing the info for all users, to obtain list data
    const [allUsers, setAllUsers] = useState([])

// Arrays housing all users who have a particular album on a list
    const [queueUsers, setQueueUsers] = useState([]);
    const [recUsers, setRecUsers] = useState([]);
  
// Managing display properties of elements we only want to see on the user page or the non-user pages (Follow user, delete album)
    const [visibleEdits, setVisibleEdits] = useState("hide")
    const [visibleAdd, setVisibleAdd] = useState("show")

// Calling functions on load 
    useEffect(() => {
      loadProfile();
    }, []);

    useEffect(() => {
      findUsers();
    }, []);

    useEffect(() => {
      checkForMatch()
    })

// Passing the userID into this page from links on various components
    let params = useParams().id

// Using Moment to format the join date properly
    let formattedDate = moment(profile.joinDate).format("l")

// Using the randomizer util to populate the RandomQuote component
    let quoteArr = []
    quoteArr.push(Randomizer.randomVal(Quotes))

// Determining if the profile page we're on is for the logged in user, which will toggle some display properties
    function checkForMatch () {
        setTimeout(function () {
            if(user) {
                if (profile._id === user._id) {
                    setVisibleEdits("show")
                    setVisibleAdd("hide")
                }
            }
        }, 1000);
    }

// Setting the profile state based on whose page we should be on
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

// Creating an array of all users to populate list data
    async function findUsers () {
        let userList = await API.getAllProfiles()
        setAllUsers(userList.data.users)
    }

// Populating the ProfileAlbumView component from the profile's queue list
    async function changeDetailFromQueue (event) {
        let queuePeople = [];
        let recPeople = [];
        allUsers.map(person => {
            person.queue.map(queue => {
                if (queue.mbid === profile.queue[event.target.title].mbid) {
                      queuePeople.push(person)
                }
            })
            person.recommended.map(rec => {
                if (rec.mbid === profile.queue[event.target.title].mbid) {
                      recPeople.push(person)
                }
            })
        })
        setQueueUsers(queuePeople);
        setRecUsers(recPeople)
        setDetailAlbum(profile.queue[event.target.title])
        setVisibleDetail("visible-detail")
        setVisibleAdd("hide")
    };

// Populating the ProfileAlbumView component from the profile's recommendation list
    async function changeDetailFromRec (event, list) {
        let queuePeople = [];
        let recPeople = [];
        allUsers.map(person => {
            person.queue.map(queue => {
                if (queue.mbid === profile.recommended[event.target.title].mbid) {
                    queuePeople.push(person)
                }
            })
            person.recommended.map(rec => {
                if (rec.mbid === profile.recommended[event.target.title].mbid) {
                    recPeople.push(person)
                }
            })
        })
        setQueueUsers(queuePeople);
        setRecUsers(recPeople)
        setDetailAlbum(profile.recommended[event.target.title])
        setVisibleDetail("visible-detail")
    }

// Creating ourselves as a profile user's follower, and them as a followee
    async function followUser (event) {
        let me = user._id;
        let userToFollow = await API.getProfile(event.target.name)
        let userToFollowId = userToFollow.data.result._id
        API.followUser(me, userToFollowId)
        API.followerAdd(userToFollowId, me)
        toggleSuccess()
    }

// Handling the widget that uploads profile images
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
                setUser(res.data);
                })
            }
        }
    }

// Toggling notification that a selected album was added to our list
    function toggleSuccess () {
        window.location.reload()
    }

// Removing an album from our queue, or our recommendations (element only visible on the logged in user's page)
    async function removeFromQueue (event) {
        event.preventDefault();
        API.removeFromQueue(event.target.name)
        window.location.reload()
    };

    async function removeFromRecs (event) {
        event.preventDefault();
        API.removeFromRecs(event.target.name)
        window.location.reload()
    }

    return (
        <Container fluid>
            <div className=" row profile-row-top">
                <div className="col-md-4 pl-5 pr-3 pt-5 pb-5 profile-col">
                  <ProfileCard 
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    userName={profile.username}
                    joinDate={formattedDate}
                    name={profile._id}
                    image={profile.image}
                    visibleEdits={visibleEdits}
                    visibleAdd={visibleAdd}
                    followUser={followUser}
                    showWidget={showWidget}
                    />
                </div>
                <div className="col-md-4 pr-5 pl-5 pt-5 pb-5 profile-col">
                    <div className="card profile-card-top">
                        <div className="card-body profile-card-body-top">
                            <ConnectionList 
                            followers={profile.followers}
                            following={profile.following}
                            userName={profile.username}
                            />
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
                <div className="col-md-6 pl-5 pr-4 pt-5 pb-5 profile-list-col">
                    <div className="card profile-card-bottom">
                        <div className="card-body profile-card-body-bottom">
                            <div className="row">
                                <h3>
                                    {profile.firstName}'s queue:
                                </h3>
                            </div>  
                            <div className="row list-row">
                                {profile.queue.map((album, index) => (
                                    <UserList
                                      name={album._id}
                                      key={index}
                                      title={index}
                                      album={album.album}
                                      artist={album.artist}
                                      image={album.image}
                                      url={album.url}
                                      tags={album.tags}
                                      tracks={album.tracks}
                                      mbid={album.mbid}
                                      user={user}
                                      visibleEdits={visibleEdits}
                                      function={changeDetailFromQueue}
                                      remove={removeFromQueue}
                                      />  
                                  ))}
                              </div> 
                            </div>
                        </div>
                    </div>
                <div className="col-md-6 pl-4 pr-5 pt-5 pb-5 profile-list-col">
                    <div className="card profile-card-bottom">
                        <div className="card-body profile-card-body-bottom">
                            <div className="row">
                                <h3>
                                    {profile.firstName}'s recommendations:
                                </h3>
                            </div>  
                            <div className="row list-row">
                                {profile.recommended.map((album, index) => (
                                    <UserList
                                      name={album._id}
                                      key={index}
                                      title={index}
                                      album={album.album}
                                      artist={album.artist}
                                      image={album.image}
                                      url={album.url}
                                      tags={album.tags}
                                      tracks={album.tracks}
                                      mbid={album.mbid}
                                      user={user}
                                      visibleEdits={visibleEdits}
                                      function={changeDetailFromRec}
                                      remove={removeFromRecs}
                                    />  
                                ))}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>

{/* Below has a display value of "none" until a result is actually populated, triggering a change in the
visibleDetail state */}
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
                                user={user}
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
