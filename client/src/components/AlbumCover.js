import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"


const AlbumCover = (props) => {

    return (
        <div className= "col-md-3">
            <Card className= "album-list-card">
                <Card.Body>
                    Here's where we'll render the album art as a background image within the card.  We will use this component for both "Lists" on the user page.
                </Card.Body>
            </Card>
        </div>
  );
};
        
export default AlbumCover