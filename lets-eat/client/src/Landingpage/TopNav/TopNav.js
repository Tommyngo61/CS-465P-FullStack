import React from "react";
import "./TopNav.css";
import icon from "../../images/icon.png";
import { Link } from "react-router-dom";
function TopNav() {
  return (
    <div className="topNav">
      <div className="home">
        <a href="/">Home Page</a>
      </div>
      <div className="title">
        <img src={icon} alt="let's eat" />
        <span>Let's Eat</span>
      </div>
      <div className="profile">
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/signup" className="link">
          Sign up
        </Link>
        <Link to="/profilepage" className="link">
          Profile
        </Link>
        {/* <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
        <a href="/profilepage">Profile</a> */}
      </div>
    </div>
  );
}

export default TopNav;
