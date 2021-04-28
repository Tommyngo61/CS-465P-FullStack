import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import TopNav from "./TopNav/TopNav";
import "./LandingPage.css";
//import { Container, Row, Col, Button } from "react-bootstrap";
//import Jumbotron from "react-bootstrap/Jumbotron";

function LandingPage() {
  return (
    <div>
      <TopNav />
      <div className="homeCard">
        <h1>Foodie Home Page</h1>
      </div>
      <SearchBar />
    </div>
  );
}

export default LandingPage;
