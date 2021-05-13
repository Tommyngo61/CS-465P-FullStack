import React from "react";
import "./TopNav.css";
import icon from "../../images/icon.png";
import { Navbar, Nav } from "react-bootstrap";

function TopNav() {
  return (
    <Navbar className="nav">
      <Navbar.Brand href="/">
        <img alt="" src={icon} className="title d-inline-block align-top" />{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="nav-links" href="/">
            Home Page
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link className="nav-links justify-content-end" href="/login">
            Login
          </Nav.Link>
          <Nav.Link className="nav-links justify-content-end" href="/signup">
            Sign Up
          </Nav.Link>
          <Nav.Link
            className="nav-links justify-content-end"
            href="/Profilepage"
          >
            Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

/*
<Navbar.Brand href="#home">
        <img
          alt=""
          src={icon}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
      </Navbar.Brand>
 */
/*
<div className="topNav">
<div className="home">
  <a href="/">Home Page</a>
</div>
<div className="title">
  <img src={icon} alt="let's eat" />
  <span>Let's Eat</span>
</div>
<div className="profile">
  <a href="/login">Login</a>
  <a href="/signup">Sign Up</a>
  <a href="/profilepage">Profile</a>
</div>
</div>
*/

export default TopNav;
