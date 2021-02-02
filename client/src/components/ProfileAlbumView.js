import { PromiseProvider } from 'mongoose';
import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"
import API from '../utils/API';
import {Col, Row} from "./Grid"
import TrackList from "./TrackList"


const ProfileAlbumView = (props) => {

    console.log("props in albumdetail: ", props)

const [visibleMain, setVisibleMain] = useState("show")
const [visibleQueue, setVisibleQueue] = useState("hide")
const [visibleRecs, setVisibleRecs] = useState("hide")


const trackArr = []

// props.tracks.map(track => {
//     trackArr.push(track.name)
// });

for (let i=0; i<props.tracks.length; i++) {
    trackArr.push(props.tracks[i])
}


function addToQueue () {
    const albumData = {
        album: props.album,
        artist: props.artist,
        image: props.image,
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
        image: props.image,
        mbid: props.mbid,
        tags: props.tags.tag,
        tracks: trackArr,
        url: props.url
    }
    API.addToRecs(props.user, albumData)
    .catch(err => console.log(err))
}

function closeQueue () {
    setVisibleQueue("hide");
    setVisibleMain("show")
}

function closeRecs () {
    setVisibleRecs("hide");
    setVisibleMain("show")
}

function openQueue () {
    setVisibleMain("hide");
    setVisibleQueue("show")
}

function openRecs () {
    setVisibleMain("hide");
    setVisibleRecs("show")
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
                            <img src={props.image} alt={props.album} height="100%" width="100%"></img>
                        </div>
                        <div className="col-md-3" id={visibleMain}>
                            <div className="row">
                               <button className="btn btn-link search-detail-btn-queue" onClick={addToQueue}>add to queue</button>
                            </div>
                            <div className="row">
                                <button className="btn btn-link search-detail-btn-rec" onClick={addToRecs}>add to favorites</button>
                            </div>
                            <div className="row">
                                <button className="btn btn-link search-detail-link-ext" onClick={moreInfo}>more info</button>
                            </div>
                            <div className="row rec-queue-stats-row">
                                <p className="rec-queue-stats-text">recommended by <button className="btn btn-link rec-queue-stats-btn" onClick={openRecs}>{props.rec.length}</button></p>
                                <p className="rec-queue-stats-text">queued by <button className="btn btn-link rec-queue-stats-btn" onClick={openQueue}>{props.queue.length}</button></p>
                            </div>
                        </div>
                        <div className="col-md-3 overflow-auto col-tracklist" id={visibleMain}>
                            <h5 className="search-detail-tracklist-header">tracks</h5>
                                {trackArr.map(track => {
                                    return (
                                    <TrackList
                                        track={track}
                                        />
                                    )
                                })} 
                        </div>
                        <div className="col-md-6" id={visibleQueue}>
                            <div className="card detail-card">
                                <div className="card-body detail-card-body">
                                    <div className="row queue-row-header">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-11">
                                                    <h6>users with album in queue</h6>
                                                </div>
                                                <div className="col-md-1">
                                                    <i className="fa fa-times close-list"  onClick={closeQueue} aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            {props.queue.map(person => {
                                                return(
                                                    <div className="row">
                                                        <p>{person.firstName} {person.lastName}</p>
                                                    </div>
                                                    )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" id={visibleRecs}>
                            <div className="card detail-card">
                                <div className="card-body detail-card-body">
                                    <div className="row queue-row-header">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-11">
                                                    <h6>users with album in recs</h6>
                                                </div>
                                                <div className="col-md-1">
                                                    <i className="fa fa-times close-list" onClick={closeRecs} aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            {props.rec.map(person => {
                                                return(
                                                    <div className="row">
                                                        <p>{person.firstName} {person.lastName}</p>
                                                    </div>
                                                    )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>
                        
                    
                </div>
            </div>
        </div>
  );

};
        
export default ProfileAlbumView