import  React, { useState } from "react" 
import { HashRouter as Router, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

import API from "../utils/API"

function ConnectionList (props) {

// Managing visibiity of followers/following, depending on which tab is selected

    const [visibleFollowers, setVisibleFollowers] = useState("show-followers")
    const [visibleFollowing, setVisibleFollowing] = useState("hide-following")
    const [idToggleFollowers, setIdToggleFollowers] = useState("invisible-border")
    const [idToggleFollowing, setIdToggleFollowing] = useState("visible-border")
    const [btnToggleFollowers, setBtnToggleFollowers] = useState("light") 
    const [btnToggleFollowing, setBtnToggleFollowing] = useState("dark") 


    function showFollowers () {
        setVisibleFollowers("show-followers")
        setVisibleFollowing("hide-following")
        setIdToggleFollowers("invisible-border")
        setIdToggleFollowing("visible-border")
        setBtnToggleFollowers("light")
        setBtnToggleFollowing("dark")
    }

    function showFollowing () {
        setVisibleFollowers("hide-followers")
        setVisibleFollowing("show-following")
        setIdToggleFollowers("visible-border")
        setIdToggleFollowing("invisible-border")
        setBtnToggleFollowers("dark")
        setBtnToggleFollowing("light")
    }

// Helper to "redirect" to the user's page who is selected

    function loadNewProfile (event) {
        API.getProfile(event.target.id)
        window.location.reload()
    }

    return (
        <div className="container connection-container">
            <div className="row connection-row-header">
                <div className="col-md-6 connection-col-header-left" id={idToggleFollowers}>
                    <button className="btn btn-link follower-btn" id={btnToggleFollowers} onClick={showFollowers}>followers</button>
                </div>
                <div className="col-md-6 connection-col-header" id={idToggleFollowing}>
                    <button className="btn btn-link follower-btn" id={btnToggleFollowing} onClick={showFollowing}>following</button>
                </div>
                <div className="follower-list" id={visibleFollowers}>
                    {props.followers.map(follower => {
                        return (
                            <div className="row connection-li-row" id={follower.id}>
                                <div className="col-md-3">
                                    <img src={follower.image} alt={follower.username} height="50px" width="50px" />
                                </div>
                                <div className="col-md-7" 
                                    id={follower.id}                                                     
                                    onClick={loadNewProfile} >
                                    <Link to={{
                                        pathname: "/profile/" + follower._id,
                                        state: "string"
                                        }}>
                                        <p className="connection-link">
                                            {follower.firstName} {follower.lastName}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="following-list" id={visibleFollowing}>
                    {props.following.map(following => {
                        return (
                            <div className="row connection-li-row" id={following.id}>
                                <div className="col-md-3">
                                    <img src={following.image} alt={following.username} height="50px" width="50px" />
                                </div>
                                <div className="col-md-7" 
                                    id={following.id}                                                     
                                    onClick={loadNewProfile} >
                                    <Link to={{
                                        pathname: "/profile/" + following._id,
                                        state: "string"
                                        }}>
                                        <p className="connection-link">
                                            {following.firstName} {following.lastName}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ConnectionList