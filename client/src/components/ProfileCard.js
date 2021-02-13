import React from "react"

import { Row } from "../components/Grid";

function ProfileCard (props) {

    let imgStyle = {
      backgroundImage: `url(${props.image})`,
      backgroundSize: "100%"
    }

    return (
        <div className="card profile-card-top">
            <div className="card-body profile-card-body-top">
                <Row>
                    <p className="profile-username-text">{props.userName}</p>
                </Row>
                <Row>
                    <div className="card profile-pic-card" style={imgStyle}>
                        <div className="card profile-pic-card-body" id= {props.visibleEdits}>
                        <button className="btn btn-link profile-pic-card-body-text"  onClick={props.showWidget}>Change Picture</button>
                        </div>
                    </div>
                </Row>
                <Row>
                  <p className="profile-realname-text">{props.firstName} {props.lastName}</p>
                </Row>
                <Row>
                  <p className="profile-membersince-text">Member Since {props.joinDate}</p>
                </Row>
                <Row>
                  <button className="btn btn-link follow-btn" id={props.visibleAdd} name={props.name} onClick={props.followUser}>Follow {props.firstName}</button>
                </Row>
            </div>
        </div>  
    )
}

export default ProfileCard