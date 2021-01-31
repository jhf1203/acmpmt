import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"


const TrackList = (props) => {

    return (
        <div className="track-list-div">
            <a className="track-list-text" href={props.url} target="_blank">{props.track}</a>
        </div>
  );
};
        
export default TrackList