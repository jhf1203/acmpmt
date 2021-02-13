import React from 'react';


const TrackList = (props) => {

    return (
        <div className="track-list-div">
            <a className="track-list-text" href={props.url} target="_blank">{props.track}</a>
        </div>
    );
};
        
export default TrackList