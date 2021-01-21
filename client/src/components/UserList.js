import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"
import { Row, Col} from "./Grid"


const AlbumCover = (props) => {

    return (
        <div className= "col-md-4">
            <Card className= "album-list-card">
                <Card.Body>
                    <Row>
                        <img src={props.image} alt="album cover" height="100%" width="100%" />
                    </Row>
                    <Row>
                        <p className="list-album-text">{props.album}</p>
                    </Row>
                    <Row>
                        <p className="list-artist-text">{props.artist}</p>
                    </Row>
                </Card.Body>
            </Card>
        </div>
  );
};
        
export default AlbumCover