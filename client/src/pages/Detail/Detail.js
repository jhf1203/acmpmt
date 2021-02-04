import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import API from "../../utils/API";

function Detail(props) {
  const [book, setBook] = useState({})


// ==================THIS PAGE DOES NOTHING RIGHT NOW, IT WAS IN THE STARTER FILE



  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/profile/599dcb67f0f16317844583fc
  const { id } = useParams();


  console.log("props here: ", props)
  // useEffect(() => {
  //   API.getBook(id)
  //     .then(res => setBook(res.data.book))
  //     .catch(err => console.log(err));
  // }, [id]);

  return (
      <Container fluid>
        <Row>
          <Col size="md-2">
            <div className="mt-3"><Link to="/">←</Link> Back to Authors</div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title={`djsfhkasdk`}>
              <article>
                <h5>Synopsis:</h5>
                <p>sdfaesgeg</p>
              </article>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Detail;
