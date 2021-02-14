import React from "react";

import { Row, Col } from "./Grid";

function RandomQuote(props) {
  return (
    <div name="quote-div" className="quote-div">
      <Row>
        <Col size="md-2"></Col>
        <Col size="md-9">
          <p className="quote-body" name="quote-div">
            {props.quote}
          </p>
        </Col>
      </Row>
      <Row>
        <Col size="md-3"></Col>
        <Col size="md-8">
          <p className="quote-attr" name="quote-div">
            - {props.artist}, {props.year}
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default RandomQuote;
