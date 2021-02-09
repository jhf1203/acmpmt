import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import API from "../../utils/API";
import { Col } from '../Grid';
import './Nav.css';

const Nav = (props) => {
  let greeting;
  console.log("nav props: ", props)

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username} </strong>
			</Fragment>
		)
  }

  function loadMyProfile () {
    console.log("we should be loading user: ", props.user.firstName)
    API.getProfile(props.user._id)
    
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <Col size="md-6 sm-6">
        <Link to="/" className="navbar-brand"><span id="a">a</span>c<span id="c">c</span>om<span id="p">p</span>animen<span id="t">t</span></Link>
      </Col>
      <Col size="md-6 sm-6">
        <ul className="navbar-nav float-right">
        {greeting} - 
          <li className="nav-item">
            <Link to="/login" className="logout link-logout" onClick={props.logout}>Logout</Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="logout link-discover">Discover</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="logout link-profile" onClick={loadMyProfile}>Profile</Link>
          </li>
        </ul>
        
      </Col>
    </nav>
  )
};

export default Nav;
