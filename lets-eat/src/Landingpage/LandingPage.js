import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import TopNav from "./TopNav/TopNav";
import "./LandingPage.css";
import Background from "./Background.js";
//import { Container, Row, Col } from "react-bootstrap";
//import Jumbotron from "react-bootstrap/Jumbotron";
//import Carousel from "react-bootstrap/Carousel"

function LandingPage() {
  return (
    <div className="landingPage">
      <TopNav />
      <h1 className="header text-center">Foodie Home Page</h1>
      <SearchBar />
    </div>
  );
}

export default LandingPage;
