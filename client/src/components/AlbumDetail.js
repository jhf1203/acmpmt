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

function moreInfo () {
    window.open(props.url, "_blank")
}

    return (
        <div>
            <div id={props.mbid}>
                <div className="card-body">
                    <Row>
                        <Col size="md-12">
                            <div className="row detail-title-row">
                                <h4 className="search-detail-album-text">
                                    <a className="search-detail-album-text" href={props.url} target="blank">{props.album}</a>
                                </h4>
                            </div>
                            <div className="row">
                                <h4 className="search-detail-artist-text">
                                    {props.artist}
                                </h4>
                            </div>
                        </Col>
                    </Row>

                    <div className="row">
                        <div className="col-md-6">
                            <img src={props.image[3]["#text"]} alt={props.album} height="100%" width="100%"></img>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                               <button className="btn btn-link search-detail-btn-queue" onClick={addToQueue}>add to queue</button>
                            </div>
                            <div className="row">
                                <button className="btn btn-link search-detail-btn-rec" onClick={addToRecs}>add to favorites</button>
                            </div>
                            <div className="row">
                                <button className="btn btn-link search-detail-link-ext" onClick={moreInfo}>more info</button>
                            </div>
                        </div>
                        <div className="col-md-3 overflow-auto col-tracklist">
                            <h5 className="search-detail-tracklist-header">tracks</h5>
                                {props.tracks.track.map(track => {
                                    return (
                                    <TrackList
                                        track={track.name}
                                        url={track.url}
                                        />
                                    )
                                })} 
                        </div>
                    </div>
                        
                    
                </div>
            </div>
        </div>
  );
};
        
export default AlbumDetail