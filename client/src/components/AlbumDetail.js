import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"
import API from '../utils/API';
import {Col, Row} from "./Grid"
import TrackList from "./TrackList"


const AlbumDetail = (props) => {

const trackArr = []

props.tracks.track.map(track => {
    trackArr.push(track.name)
})

console.log("tracks!", trackArr)

function addToQueue () {
    const albumData = {
        album: props.album,
        artist: props.artist,
        image: props.image[2]["#text"],
        mbid: props.mbid,
        tags: props.tags.tag,
        tracks: trackArr,
        url: props.url
    }
    API.addToQueue(props.user, albumData)
    .catch(err => console.log(err))
};

function addToRecs () {
    const albumData = {
        album: props.album,
        artist: props.artist,
        image: props.image[2]["#text"],
        mbid: props.mbid,
        tags: props.tags.tag,
        tracks: trackArr,
        url: props.url
    }
    API.addToRecs(props.user, albumData)
    .catch(err => console.log(err))
}

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
                            <img src={props.image[2]["#text"]} alt={props.album}  />
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
                            <button className="btn btn-link" onClick={addToQueue}>Add To Queue</button>
                            <button className="btn btn-link" onClick={addToRecs}>Add To Favorites</button>
                            <button className="btn btn-link">Explore More Details</button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
  );
};
        
export default AlbumDetail