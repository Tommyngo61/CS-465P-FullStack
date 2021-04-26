import React from "react";
import "./TopNav.css";
import icon from "../../images/icon.png";
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
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
}

export default TopNav;
