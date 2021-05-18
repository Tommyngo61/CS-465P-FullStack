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
  const params = new URLSearchParams(location1.search);
  const term = params.get("find_desc");
  const location = params.get("find_loc");
  const price = params.get("price");
  const [places, setPlaces] = useState([]);
  const [randomPlace, setRandomPlace] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [review, setReview] = useState("");

  const getReview = async () => {
    const review = async () => {
      await axios
        .get(`http://localhost:5000/v3/businesses/${randomPlace.id}`)
        .then(({ data }) => setReview(data.reviews))
        .catch((err) => console.log(err));
    };
    review();
  };

  useEffect(() => {
    setIsLoading(false);
    const getData = async () => {
      await axios
        .get(
          `http://localhost:5000/v3/businesses/search?term=${term}&location=${location}&price=${price}`
        )
        .then(({ data }) => setPlaces(data))
        .catch((err) => console.log(err));
    };
    getData();
  }, [location, term, price]);

  useLayoutEffect(() => {
    const chooseRandom = async () => {
      setIsLoading(false);
      const len = places.length;
      const number = Math.floor(Math.random() * len);
      setRandomPlace(places[number]);
      setIsLoading(true);
    };
    setIsLoading(false);
    chooseRandom();
    setIsLoading(true);
  }, [places]);
  ///end here

  const updateFirestore = () => {
    console.log("random place23", randomPlace);
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        restaurants: firebase.firestore.FieldValue.arrayUnion(randomPlace),
      });
  };
  return (
    <>
      {isLoading ? (
        <div>
          <TopNav />
          <Container fluid>
            <Row>
              <Col>
                <h1>{randomPlace.name}</h1>
              </Col>
            </Row>
            <Row className="mt-5 justify-content-md-center">
              <Col xs={{ span: 3, offset: 1 }}>
                <img
                  className="image"
                  src={randomPlace.image_url}
                  alt={randomPlace.name}
                  width={300}
                  height={300}
                ></img>
              </Col>
              <Col xs={6} className="description ml-5">
                <ReactStars
                  count={5}
                  value={randomPlace.rating}
                  size={30}
                  edit={false}
                  activeColor="#ffd700"
                />

                <h2>Description</h2>
                <span>
                  Mauris a laoreet congue luctus. Ut condimentum magna id risus
                  iaculis, ac mollis turpis ultrices. Sed facilisis dui neque,
                  malesuada dictum enim malesuada non. Cras congue auctor libero
                  et imperdiet. Vestibulum interdum arcu est. Aliquam ultricies
                  accumsan arcu id hendrerit. Fusce cursus, urna vel pulvinar
                  ullamcorper, augue lorem varius diam, ut varius erat sapien at
                  odio. Sed bibendum ante et ullamcorper hendrerit. Vestibulum
                </span>
              </Col>
              <Col></Col>
            </Row>
            <Row className="mt-5 justify-content-md-center">
              <Col xs={{ offset: 6 }}>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  onClick={() => window.location.reload()}
                >
                  Reroll
                </Button>
                <Button
                  className="pick-btn"
                  variant="primary"
                  size="lg"
                  type="submit"
                  onClick={() => updateFirestore()}
                >
                  Try This Place!
                </Button>
                <Button
                  className="pick-btn"
                  variant="primary"
                  size="lg"
                  type="button"
                  onClick={() => getReview()}
                >
                  Reviews
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        "Is Loading"
      )}
    </>
  );
}

export default Search;
