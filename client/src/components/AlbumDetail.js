import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"
import {Col, Row} from "./Grid"
import TrackList from "./TrackList"


const AlbumDetail = (props) => {

// console.log("props: ", props)

const tracks = props.tracks
console.log("deez props: ", props)

    return (
        <div>
            <Card className= "album-detail-card" id={props.mbid}>
                <Card.Body>
                    <Row>
                        <Col size="md-3">
                            <h3>{props.album}</h3>
                            <h4>{props.artist}</h4>
                        </Col>
                        <Col size="md-3">
                            <img src={props.image[2]["#text"]} alt={props.album} height="100%" width="100%" />
                        </Col>
                        <Col size="md-3">
                            <h5>Track List</h5>
                                {props.tracks.track.map(track => {
                                    return (
                                    <TrackList
                                        track={track.name}
                                        />
                                    )
                                })} 
                        </Col>
                        <Col size="md-3">
                            <button className="btn btn-link">Add To Queue</button>
                            <button className="btn btn-link">Add To Favorites</button>
                            <button className="btn btn-link">Explore More Details</button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
  );
};
        
export default AlbumDetail