import React, { useState } from 'react';
import { Accordion, Card } from "react-bootstrap"

const AccordionComp = (props) => {

    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle id="Followers">
                        <h3>Followers</h3>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <div className="row">
                        <p>Here we will render each follower</p>  
                        </div> 
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle id="Following">
                        <h3>Followers</h3>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <div className="row">
                        <p>Here we will render each person who the user is following</p>  
                        </div> 
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
        
      </Accordion>
    </div>
  );
};
        
export default AccordionComp