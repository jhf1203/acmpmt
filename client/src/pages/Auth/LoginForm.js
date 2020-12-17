import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';

function LoginForm({login}) {
  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
  });
  const [redirectTo, setRedirectTo] = useState(null);

	const handleChange = (event) => {
		setUserObject({
      ...userObject,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = (event) => {
    console.log("USEROBJ", userObject)
		event.preventDefault();
		login(userObject.username, userObject.password);
		setRedirectTo('/');
	};

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <Container>
        <Row>
          <Col size="md-8">
            Brand Text Will Go Here
          </Col>
          <Col size="md-4">
            Here will house the definition of "accompaniment"
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <Card title="What exactly do we do?">
              <p>Here will house an elevator speech regarding how our site works.</p>
            </Card>
          </Col>
          <Col size="md-6">
            <Card>
              <form style={{marginTop: 10}}>
                <Input
                  type="text"
                  name="username"
                  value={userObject.username}
                  onChange={handleChange}
                  placeholder="User Name"
                />
                <Input
                  type="password"
                  name="password"
                  value={userObject.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <Link to="/signup">Register</Link>
                <FormBtn onClick={handleSubmit}>Login</FormBtn>
              </form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-4"></Col>
          <Col size="md-8">
            More lyrics here
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LoginForm;
