import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import { Col, Row } from "./Grid";
import TrackList from "./TrackList";

import API from "../utils/API";

const AlbumDetail = (props) => {
  // States to manage when certain elements are visible and not

  const [visibleMain, setVisibleMain] = useState("show");
  const [visibleQueue, setVisibleQueue] = useState("hide");
  const [visibleRecs, setVisibleRecs] = useState("hide");
  const [visibleSuccess, setVisibleSuccess] = useState("hide");

  // Mapping an array of the album's tracklist to reduce data present in the 3rd party call vs what we want
  // to keep in the user's profile

  const trackArr = [];
  props.tracks.track.map((track) => {
    trackArr.push(track.name);
  });

  // Adds the album to my queue

  function addToQueue() {
    const albumData = {
      album: props.album,
      artist: props.artist,
      image: props.image[3]["#text"],
      mbid: props.mbid,
      tags: props.tags.tag,
      tracks: trackArr,
      url: props.url,
    };
    API.addToQueue(props.user, albumData);
    toggleSuccess().catch((err) => console.log(err));
  }

  // Adds the album to my list of recommendations

  function addToRecs() {
    const albumData = {
      album: props.album,
      artist: props.artist,
      image: props.image[3]["#text"],
      mbid: props.mbid,
      tags: props.tags.tag,
      tracks: trackArr,
      url: props.url,
    };
    API.addToRecs(props.user, albumData);
    toggleSuccess().catch((err) => console.log(err));
  }

  // Functions to toggle what's visible:  Either the option to add the album to your queue/recommendations,
  // or a list of current users who have the album either queued or recommended.

  function closeQueue() {
    setVisibleQueue("hide");
    setVisibleMain("show");
  }

  function closeRecs() {
    setVisibleRecs("hide");
    setVisibleMain("show");
  }

  function openQueue() {
    setVisibleMain("hide");
    setVisibleQueue("show");
  }

  function openRecs() {
    setVisibleMain("hide");
    setVisibleRecs("show");
  }

  function moreInfo() {
    window.open(props.url, "_blank");
  }

  // Notification that our list was successfully updated

  function toggleSuccess() {
    setVisibleSuccess("show");
    window.location.reload();
  }

  // Helper to "redirect" to the selected user's page

  function loadNewProfile(event) {
    API.getProfile(event.target.id);
    window.location.reload();
  }

  return (
    <div>
      <div id={props.mbid}>
        <div className="card-body">
          <Row>
            <Col size="md-12">
              <div className="row detail-title-row">
                <h4 className="search-detail-album-text">
                  <a
                    className="search-detail-album-text"
                    href={props.url}
                    target="blank"
                  >
                    {props.album}
                  </a>
                </h4>
              </div>
              <div className="row">
                <h4 className="search-detail-artist-text">{props.artist}</h4>
              </div>
            </Col>
          </Row>

          <div className="row">
            <div className="col-md-6">
              <img
                className="list-detail-img"
                src={props.image[4]["#text"]}
                alt={props.album}
                width="372px"
                height="372px"
              ></img>
            </div>
            <div className="col-md-3" id={visibleMain}>
              <div className="row">
                <button
                  className="btn btn-link search-detail-btn-queue"
                  onClick={addToQueue}
                >
                  add to queue
                </button>
              </div>
              <div className="row">
                <button
                  className="btn btn-link search-detail-btn-rec"
                  onClick={addToRecs}
                >
                  add to favorites
                </button>
              </div>
              <div className="row">
                <button
                  className="btn btn-link search-detail-link-ext"
                  onClick={moreInfo}
                >
                  more info
                </button>
              </div>
              <div className="row">
                <button
                  className="btn btn-link btn-confirm-list"
                  id={visibleSuccess}
                  onClick={moreInfo}
                >
                  success!
                </button>
              </div>
              <div className="row rec-queue-stats-row">
                <p className="rec-queue-stats-text">
                  recommended by{" "}
                  <button
                    className="btn btn-link rec-queue-stats-btn"
                    onClick={openRecs}
                  >
                    {props.rec.length}
                  </button>
                </p>
                <p className="rec-queue-stats-text">
                  queued by{" "}
                  <button
                    className="btn btn-link rec-queue-stats-btn"
                    onClick={openQueue}
                  >
                    {props.queue.length}
                  </button>
                </p>
              </div>
            </div>
            <div
              className="col-md-3 overflow-auto col-tracklist"
              id={visibleMain}
            >
              <h5 className="search-detail-tracklist-header">tracks</h5>
              {props.tracks.track.map((track) => {
                return <TrackList track={track.name} url={track.url} />;
              })}
            </div>

            {/* The below div is hidden initially, visibility is toggled with the state change */}

            <div className="col-md-6" id={visibleQueue}>
              <div className="card detail-card">
                <div className="card-body detail-card-body">
                  <div className="row queue-row-header">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-11">
                          <h6>in queue for:</h6>
                        </div>
                        <div className="col-md-1">
                          <i
                            className="fa fa-times close-list"
                            onClick={closeQueue}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                      {props.queue.map((person) => {
                        return (
                          <div
                            className="row connection-li-row"
                            onClick={loadNewProfile}
                          >
                            <div className="col-md-3">
                              <img
                                src={person.image}
                                alt={person.username}
                                height="50px"
                                width="50px"
                              />
                            </div>
                            <div className="col-md-9">
                              <Link
                                className="profile-link"
                                id={person._id}
                                to={{
                                  pathname: "/profile/" + person._id,
                                  state: "string",
                                }}
                              >
                                <p className="connection-link">
                                  {person.firstName} {person.lastName}
                                </p>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The below div is hidden initially, visibility is toggled with the state change */}

            <div className="col-md-6" id={visibleRecs}>
              <div className="card detail-card">
                <div className="card-body detail-card-body">
                  <div className="row queue-row-header">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-11">
                          <h6>recommended by:</h6>
                        </div>
                        <div className="col-md-1">
                          <i
                            className="fa fa-times close-list"
                            onClick={closeRecs}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                      {props.rec.map((person) => {
                        return (
                          <div
                            className="row connection-li-row"
                            onClick={loadNewProfile}
                          >
                            <div className="col-md-3">
                              <img
                                src={person.image}
                                alt={person.username}
                                height="50px"
                                width="50px"
                              />
                            </div>
                            <div className="col-md-9">
                              <Link
                                className="profile-link"
                                id={person._id}
                                to={{
                                  pathname: "/profile/" + person._id,
                                  state: "string",
                                }}
                              >
                                <p className="connection-link">
                                  {person.firstName} {person.lastName}
                                </p>
                              </Link>
                            </div>
                          </div>
                        );
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

export default AlbumDetail;
