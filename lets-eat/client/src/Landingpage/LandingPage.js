import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import TopNav from "./TopNav/TopNav";
import "./LandingPage.css";
//import Background from "./Background.js";
//import { Container, Row, Col } from "react-bootstrap";
//import Jumbotron from "react-bootstrap/Jumbotron";
//import Carousel from "react-bootstrap/Carousel"
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();

  const search = (term, location, price) => {
    const urlEncodedTerm = encodeURI(term);
    const urlEncodedLocation = encodeURI(location);
    const urlEncodedPrice = encodeURI(price);
    console.log(price);
    history.push(
      `/search?find_desc=${urlEncodedTerm}&find_loc=${urlEncodedLocation}&price=${urlEncodedPrice}`
    );
  };
  return (
    <div className="landingPage">
      <TopNav />
      <SearchBar search={search} />
    </div>
  );
}

export default LandingPage;
