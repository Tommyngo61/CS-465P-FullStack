import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TopNav from "../Landingpage/TopNav/TopNav";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
function Search() {
  let location1 = useLocation();
  //this is the infomation the people seach. I got the variables for you to use it anywhere you want
  const [term, setTerm] = useState("");
  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(location1.search);
    setTerm(params.get("find_desc"));
    setLocation(params.get("find_loc"));
    const getData = async () => {
      await axios
        .get(
          `http://localhost:5000/v3/businesses/search?term=${term}&location=${location}`
        )
        .then(({ data }) => setPlaces(data))
        .catch((err) => console.log(err));
    };
    getData();
  }, [location1.search, location, term]);

  ///end here
  return (
    <>
      <TopNav />
      <Container fluid>
        <Row>
          <Col>
            <h1>Restaurant Name</h1>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-md-center">
          <Col xs={{ span: 3, offset: 1 }}>
            <img src="https://via.placeholder.com/300" alt="placeholder"></img>
          </Col>
          <Col xs={6} className="ml-5">
            <ReactStars
              count={5}
              value={4}
              size={30}
              edit={false}
              activeColor="#ffd700"
            />
            <h2>Description</h2>
            <span>
              Mauris laoreet congue luctus. Ut condimentum magna id risus
              iaculis, ac mollis turpis ultrices. Sed facilisis dui neque,
              malesuada dictum enim malesuada non. Cras congue auctor libero et
              imperdiet. Vestibulum interdum arcu est. Aliquam ultricies
              accumsan arcu id hendrerit. Fusce cursus, urna vel pulvinar
              ullamcorper, augue lorem varius diam, ut varius erat sapien at
              odio. Sed bibendum ante et ullamcorper hendrerit. Vestibulum
            </span>
          </Col>
          <Col></Col>
        </Row>
        <Row className="mt-5 justify-content-md-center">
          <Col xs={{ offset: 6 }}>
            <Button variant="primary" size="lg" type="submit">
              Reroll
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

/*
  <h1>
        {term} {location}
      </h1>

      <ul>
        {places.map((place) => {
          return <li key={place.id}>{place.name}</li>;
        })}
      </ul> 
*/

export default Search;
