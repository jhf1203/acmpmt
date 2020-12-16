import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"

const AccordionComp = (props) => {

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Followers
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>User's followers will render here</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Following
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body>People the user follows will render here</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
  );
};
        
export default AccordionComp