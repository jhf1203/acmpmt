import React from "react"
import { Col, Row, Container } from "../components/Grid";

function ProfileCard (props) {

    return (
        <div className="card profile-card-top">
              <div className="card-body profile-card-body-top">
                <Row>
                  <p className="profile-username-text">{props.userName}</p>
                </Row>
                <Row>
                  <div className="col-md-12">
                    <img className="profile-img contain" src="https://via.placeholder.com/300"   />
                  </div>
                </Row>
                <Row>
                  <p className="profile-realname-text">{props.firstName} {props.lastName}</p>
                </Row>
                <Row>
                  <p className="profile-membersince-text">Member Since {props.joinDate}</p>
                </Row>
                <Row>
                  <button className="btn btn-link follow-btn">Follow {props.firstName}</button>
                </Row>
              </div>
            </div>  
    )
}

export default ProfileCard