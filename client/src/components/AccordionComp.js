import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"

const AccordionComp = (props) => {

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <div className="card-header toggle-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <p className="accordion-header-text">followers</p>
                </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>User's followers will render here</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <div className="card-header toggle-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <p className="accordion-header-text">following</p>
                </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="1">
                <Card.Body>People the user follows will render here</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
  );
};
        
export default AccordionComp