import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import Randomizer from "../../utils/randomizer"
import Quotes from "../../utils/quotes.json"
import RandomQuote from "../../components/RandomQuote"

function LoginForm({login}) {
  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
  });
  const [redirectTo, setRedirectTo] = useState(null);

  let quoteArr = []

  quoteArr.push(Randomizer.randomVal(Quotes))

	const handleChange = (event) => {
		setUserObject({
      ...userObject,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		login(userObject.username, userObject.password);
		setRedirectTo('/');
	};

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <Container>
        <div className="row title-row">
          <Col size="md-8">
            <h1>accompaniment</h1>
          </Col>
          <Col size="md-4">
            <div className="row">
              <p className="pronunciation-text">/əˈkəmp(ə)nimənt/</p>
            </div>
            <div className="row">
              <p className="definition-text">something that is supplementary to or complements something else</p>
            </div>
          </Col>
        </div>
        <div className=" row border-row border-2"></div>
        <div className=" row border-row border-3"></div>
        <div className=" row border-row border-4"></div>
        <div className=" row border-row border-5"></div>
        <div className="card img-card-login">
          <div className="card-body img-card-content">
            <div className="row row-login">
              <Col size="md-6">
                <div className="card login-card">
                  <p className="desc-header">simple:</p>  
                  <p className="desc-body">you give us three that you <span className="do">do</span> like</p>
                  <p className="desc-body">we give you three that you <span className="will">will</span> like.</p>
                  <p className="desc-body">you see who likes what you do like</p>
                  <p className="desc-body">you see who likes what you will like</p>
                  <p className="simple1">simple?</p>
                  <p className="simple2">simple.</p>
                </div>
              </Col>
              <Col size="md-6">
                <div className="card login-card">
                  <form style={{marginTop: 10}}>
                    <div className="row input-row-name">
                        <input
                        type="text"
                        name="username"
                        value={userObject.username}
                        onChange={handleChange}
                        placeholder="username"
                        className="login-input"
                      />
                    </div>
                    <div className="row input-row-password">
                      <input
                        type="password"
                        name="password"
                        value={userObject.password}
                        onChange={handleChange}
                        placeholder="password"
                        className="login-input"
                      />
                    </div>
                    <div className="btn btn-link login-btn" onClick={handleSubmit}>login</div>
                    <div>
                    <Link to="/signup"><div className="btn btn-link signup-btn">register</div> </Link>
                    </div>
                  </form>
                </div>
              </Col>
            </div>
            </div>
          </div>
        <Row>
          <Col size="md-4"></Col>
            <Col size="md-8">
              <RandomQuote 
                artist={quoteArr[0].artist}
                quote={quoteArr[0].quote}
                year={quoteArr[0].year}
                  />
            </Col>
        </Row>
      </Container>
    )
  }
}

export default LoginForm;
