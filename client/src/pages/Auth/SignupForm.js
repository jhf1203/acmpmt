import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Container, Row, Col } from '../../components/Grid';

import AUTH from '../../utils/AUTH';

function SignupForm() {
    const [userObject, setUserObject] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        redirectTo: null
    });
    
    const [redirectTo, setRedirectTo] = useState(null);

    const handleChange = (event) => {
        setUserObject({
            ...userObject,
            [event.target.name]: event.target.value
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        AUTH.signup({
            firstName: userObject.firstName,
            lastName: userObject.lastName,
            username: userObject.username,
            password: userObject.password
        }).then(response => {
            // console.log("response: ", response)
            if (!response.data.errmsg) {
              setRedirectTo('/');
            } else {
              console.log('duplicate');
            }
        });
    };
    
    if (redirectTo) {
        return <Redirect to={{ pathname: redirectTo }} />
    }
    
    return (
        <Container>
            <Row>
                <div className="col-md-12 outer-col">
                  <div className="row inner-row">
                    <div className="col-md-4 inner-col">
                        <div className="row register-title-row">
                            <h2 className="signup-title-text">register</h2>
                        </div>
                        <div className="row signup-form-row">
                            <div className="card register-card">
                                <form style={{marginTop: 10}}>
                                    <input className="signup-input"
                                      placeholder="first name"
                                      type="text"
                                      name="firstName"
                                      value={userObject.firstName}
                                      onChange={handleChange}
                                    />
                                    <input className="signup-input"
                                      placeholder="last name"
                                      type="text"
                                      name="lastName"
                                      value={userObject.lastName}
                                      onChange={handleChange}
                                    />
                                    <input className="signup-input"
                                      placeholder="username"
                                      type="text"
                                      name="username"
                                      value={userObject.username}
                                      onChange={handleChange}
                                    />
                                    <input className="signup-input"
                                      placeholder="password"
                                      type="password"
                                      name="password"
                                      value={userObject.password}
                                      onChange={handleChange}
                                    />
                                    <input className="signup-input"
                                      placeholder="confirm password"
                                      type="password"
                                      name="confirmPassword"
                                      value={userObject.confirmPassword}
                                      onChange={handleChange}
                                    />
                                    <Link className="btn btn-link login-btn mb-4" to="/">Login</Link>
                                    <button className="btn btn-link signup-btn mb-4 mr-5" onClick={handleSubmit}>Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                        <Col size="md-4"></Col>  
                        <Col size="md-4"></Col>
                    </div>
                </div>
            </Row>
          
        </Container>
    )
}

export default SignupForm;
