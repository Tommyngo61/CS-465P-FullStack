import React, { useState, useLayoutEffect, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TopNav from "../Landingpage/TopNav/TopNav";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import firebase from "../firebaseDB/firebase";
import { useAuth } from "../contexts/AuthContext";
import "./Search.css";

function Search() {
  let location1 = useLocation();
  //this is the infomation the people seach. I got the variables for you to use it anywhere you want
  const db = firebase.firestore();
  console.log("bye");
  const params = new URLSearchParams(location1.search);
  const term = params.get("find_desc");
  const location = params.get("find_loc");
  const [places, setPlaces] = useState([]);
  const [randomPlace, setRandomPlace] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(false);
    const getData = async () => {
      await axios
        .get(
          `http://localhost:5000/v3/businesses/search?term=${term}&location=${location}`
        )
        .then(({ data }) => setPlaces(data))
        .catch((err) => console.log(err));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const chooseRandom = () => {
      const len = places.length;
      const number = Math.floor(Math.random() * len);
      setRandomPlace(places[number]);
      setIsLoading(true);
      console.log("random place", randomPlace);

      // db.collection('users').doc(currentUser.uid).set({
      // restaurant: 'PhoKing'
      // })
    };
    chooseRandom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);
  ///end here
  return (
    <>
      <TopNav />
      <Container fluid>
        <Row>
          <Col>
            <h1>{isLoading ? randomPlace.name : ""}</h1>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-md-center">
          <Col xs={{ span: 3, offset: 1 }}>
            <img
              className="image"
              src={isLoading ? randomPlace.image_url : ""}
              alt={isLoading ? randomPlace.name : ""}
              width={300}
              height={300}
            ></img>
          </Col>
          <Col xs={6} className="description ml-5">
            {isLoading && (
              <ReactStars
                count={5}
                value={isLoading ? randomPlace.rating : 0}
                size={30}
                edit={false}
                activeColor="#ffd700"
              />
            )}
            <h2>Description</h2>
            <span>
              Mauris a laoreet congue luctus. Ut condimentum magna id risus
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
          return <li key={place.key}>{place.name}</li>;
        })}
      </ul> 
*/

export default Search;
