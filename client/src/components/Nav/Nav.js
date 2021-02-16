import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import API from "../../utils/API";
import { Col } from '../Grid';
import logo from "../../assets/logos/android-chrome-512x512.png"
import './Nav.css';

const Nav = (props) => {
  let greeting;
  console.log("nav props: ", props)


  function loadMyProfile () {
    console.log("we should be loading user: ", props.user.firstName)
    API.getProfile(props.user._id)
    
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Col size="md-6 sm-6">
          <Link to="/" className="navbar-brand">cr<span className="eight-nav">8</span>ed<span className="nav-img-span"><img className="nav-img" src={logo} alt="logo" /> </span></Link>
        </Col>
        <Col size="md-6 sm-6">
          <ul className="navbar-nav float-right"> 
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
      <div className=" row border-row border-2"></div>
      <div className=" row border-row border-3"></div>
      <div className=" row border-row border-4"></div>
      <div className=" row border-row border-5"></div>
    </div>
  )
};

export default Nav;
