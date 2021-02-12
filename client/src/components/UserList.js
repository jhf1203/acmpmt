import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"
import { Row, Col} from "./Grid"


const AlbumCover = (props) => {

    return (
        <div className= "col-md-4">
            <div style={{backgroundImage: `url(${props.image})`}} className= "card user-list-card">
                <div className="card-body list-card-body">
                    <Row>
                        <p className="userlist-card-hover-text userlist-album-album">{props.album}</p>
                    </Row>
                    <Row>
                        <p className="userlist-card-hover-text userlist-album-artist">{props.artist}</p>
                    </Row>
                    <Row>
                        <button className=" btn btn-link userlist-card-hover-text userlist-album-button" title={props.title} onClick={props.function}>more info</button>
                    </Row>
                    <Row>
                        <button className=" btn btn-link userlist-card-hover-text userlist-album-delete" name={props.name} id={props.visibleEdits} onClick={props.remove}>remove</button>
                    </Row>
                </div>
            </div>
        </div>
  );
};
        
export default AlbumCover