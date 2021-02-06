import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"
import { BrowserRouter as Link } from 'react-router-dom';

import API from "../utils/API"

const AccordionComp = (props) => {

    function loadNewProfile (event) {
        API.getProfile(event.target.id)
        window.location.reload()
    }

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <div className="card-header toggle-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <p className="accordion-header-text">{props.followers.length} followers</p>
                </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <div className="row">
                        {props.followers.map(follower => {
                            return (
                                <div className="col-md-4 connection-col">
                                    <div className="row connection-row">
                                        <div style={{backgroundImage: `url(${follower.image})`}}  className="card connection-card-bkgd">
                                            <div className="card-body connection-card-body">
                                                <div className="connection-hover-text"
                                                    onClick={loadNewProfile}>
                                                        <Link className="connection-hover-text" id={follower._id} to={{
                                                            pathname: "/profile/" + follower._id,
                                                            state: "string"
                                                        }}>
                                                            profile
                                                        </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row connection-row">
                                        <p className="connection-name-text">
                                            {follower.firstName}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <div className="card-header toggle-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <p className="accordion-header-text">following {props.following.length}</p>
                </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                <div className="row">
                    {props.following.map(following => {
                            return (
                                <div className="col-md-4 connection-col">
                                    <div className="row connection-row">
                                        <div style={{backgroundImage: `url(${following.image})`}} className="card connection-card-bkgd">
                                            <div className="card-body connection-card-body">
                                                <div className="connection-hover-text"
                                                    onClick={loadNewProfile}>
                                                        <Link className="connection-hover-text" id={following._id} to={{
                                                            pathname: "/profile/" + following._id,
                                                            state: "string"
                                                        }}>
                                                            profile
                                                        </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row connection-row">
                                        <p className="connection-name-text">
                                            {following.firstName}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
  );
};
        
export default AccordionComp