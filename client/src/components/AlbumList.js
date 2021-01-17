import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"


const AlbumList = (props) => {

console.log("props: ", props)



    return (
        <div className= "col-md-4 album-list-col">
            <Card className= "album-list-card">
                <Card.Body>
                    {props.album}
                </Card.Body>
            </Card>
        </div>
  );
};
        
export default AlbumList