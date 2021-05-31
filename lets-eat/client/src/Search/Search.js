import React, { useState, useLayoutEffect, useEffect } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import TopNav from "../Landingpage/TopNav/TopNav";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import axios from "axios";
import firebase from "../firebaseDB/firebase";
import { useAuth } from "../contexts/AuthContext";
import "./Search.css";
import { v4 as uuidv4 } from "uuid";
import Maps from "./Google/Maps";
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
  const [reviews, setReview] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [alert, setAlert] = useState(false);
  const [count, setCount] = useState(0);

  const getReview = async () => {
    setLoadingReview(false);
    const review = async () => {
      await axios
        .get(`http://localhost:5000/v3/businesses/${randomPlace.id}`)
        .then(({ data }) => setReview(data.reviews))
        .catch((err) => console.log(err));
      setLoadingReview(true);
    };
    review();
  };
  const review = () => {
    if (!loadingReview) {
      // navigator.geolocation.getCurrentPosition(getCoordinates);
    }
    getReview();
    setToggle(!toggle);
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
      pickRandom();
      setIsLoading(true);
    };
    setIsLoading(false);
    chooseRandom();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);
  ///end here
  const pickRandom = () => {
    const len = places.length;
    const number = Math.floor(Math.random() * len);
    setRandomPlace(places[number]);
  };

  const updateFirestore = () => {
    console.log("random place23", randomPlace);
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .update({
          restaurants: firebase.firestore.FieldValue.arrayUnion(randomPlace),
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <TopNav />
          <Container className="body" fluid>
            {alert ? (
              <Row>
                <Col className="alert-card d-flex justify-content-center">
                  <Alert className="alert" show={alert} variant="success">
                    <Alert.Heading>You Chose {randomPlace.name}!</Alert.Heading>
                    <p>
                      Good job! We will save this place into your profile for
                      future reference.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-center">
                      <Button
                        onClick={() => setAlert(false)}
                        variant="outline-success"
                      >
                        Close Me
                      </Button>
                    </div>
                  </Alert>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Row className="mt-4">
              <Col>
                <h1>{randomPlace.name}</h1>
              </Col>
              <Col>
                <StarRatings
                  rating={randomPlace.rating}
                  starRatedColor="yellow"
                  changeRating={randomPlace.rating}
                  numberOfStars={5}
                  name="rating"
                  isSelectable="false"
                />
              </Col>
              <Col>
                <Button
                  className="review-btn"
                  variant="primary"
                  size="lg"
                  type="button"
                  onClick={() => review()}
                >
                  {toggle ? "Close" : "Reviews"}
                </Button>
              </Col>
            </Row>
            <Row className="mt-5 justify-content-md-center">
              <Col xs={{ span: 4 }}>
                <img
                  className="image"
                  src={randomPlace.image_url}
                  alt={randomPlace.name}
                  width={300}
                  height={300}
                ></img>
              </Col>
              <Col xs={4} className="description ">
                <div className="description1">
                  <h2>Infomation</h2>
                  <div>
                    <ul>
                      {randomPlace.categories.map((item) => (
                        <li>{item.title}</li>
                      ))}
                    </ul>
                  </div>
                  <h2>Address</h2>
                  <p>{randomPlace.location.display_address}</p>
                  <h2>Phone Number</h2>
                  <p>{randomPlace.phone}</p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  onClick={() => {
                    if (count < 3) {
                      pickRandom();
                      setCount((count) => count + 1);
                      setToggle(false);
                    }
                  }}
                >
                  {count < 3 ? "Reroll" : "No more reroll"}
                </Button>
                <Button
                  className="pick-btn"
                  variant="primary"
                  size="lg"
                  type="submit"
                  onClick={() => {
                    updateFirestore();
                    setAlert(true);
                  }}
                >
                  Try This Place!
                </Button>
              </Col>
              <Col>
                {toggle &&
                  loadingReview &&
                  reviews.map((review) => (
                    <>
                      <h2 key={uuidv4}>{review.user.name}</h2>
                      <p>{review.text}</p>
                    </>
                  ))}
              
              </Col>
            </Row>
            <Row className="mt-5 justify-content-md-center">
              <Col xs={{ offset: 6 }}></Col>
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
