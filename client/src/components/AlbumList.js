import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"


const AlbumList = (props) => {

    return (
        <div className= "col-md-4 album-list-col">
            <Card className= "album-list-card" >
                    <img id={props.id} className="list-img" src={props.image[3]["#text"]} alt={props.album} height="100%" width="100%" onClick={props.onClick} />
            </Card>
        </div>
  );
};
        
export default AlbumList