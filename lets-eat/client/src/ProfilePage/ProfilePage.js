import React, { useEffect, useState, useRef } from "react";
import TopNav from "../Landingpage/TopNav/TopNav";
import {
  Card,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./ProfilePage.css";
import firebase from "../firebaseDB/firebase";
import PopBio from "./PopBio.js";

export default function ProfilePage() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [tableData, setTableData] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const db = firebase.firestore();
  const bioRef = useRef();

  //var docRef = db.collection("users").doc(currentUser.uid);
  useEffect(() => {
    var data = async () =>
      await db
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          console.log("Document data:", doc.data());
          setUserName(doc.data().username);
          setBio(doc.data().bio);
          console.log("user-name", username);
          setTableData(doc.data().restaurants);
          console.log("mytable", tableData);
          setLoading(true);
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    data();
    //console.log(data);
    // loading ? console.log(tableData) : console.log("no data");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    db.collection('users').doc(currentUser.uid).update({
      bio: bioRef.current.value
    })
    setButtonPopup(false);
  }

  function handleCancel(e) {
    e.preventDefault();
    setButtonPopup(false);
  }

  const displayTable = () => {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Restaurant Image</th>
            <th>Name of Restaurant</th>
            <th>Address</th>
          </tr>
        </thead>
        {tableData.map((item, i) => (
          <tbody>
            <tr key={item.id}>
              <td>
                <img
                  className="resturant-image inline"
                  width={100}
                  height={80}
                  alt="Restaruant"
                  src={item.image_url}
                ></img>
              </td>
              <td>{item.name}</td>
              <td>{`${item.location.display_address} `}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    );
  };

  return (
    <>
      <TopNav></TopNav>
      <Container className="container-fluid mt-5">
        <Card className="ml-5">
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col className="text-center align-self-center">
                <strong>Username: </strong> {username}
                <Card className="mt-4">
                    <Card.Header>
                      <h2>Bio</h2>
                    </Card.Header>
                    <Card.Body>
                      <p>{bio}</p>
                    </Card.Body>
                    <button onClick={() => setButtonPopup(true)}>Edit Bio</button>
                  </Card>
              </Col>
              <Col xs={6} className="mt-4">
                <h3 className="text-center">List of Restaurants</h3>
                <div className="myTable">{loading && displayTable()}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Container>
      <PopBio trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleSubmit}>
          <strong>Update Bio</strong>
          <textarea className="form-control" contenteditable="true" id="editBio" rows="5" ref={bioRef}>{bio}</textarea>
          <br></br>
          <input type="submit" className="btn-primary" value="submit" />
          <button type="button" className="btn-secondary" onClick={handleCancel}>cancel</button>
        </form>
      </PopBio>
    </>
  );
}
/*
const ProfilePage = () => {
  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <TopNav />
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
          className="border border-blue-300"
        ></div>
        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">Faruq</h2>
          <h3 className="italic">faruq123@gmail.com</h3>
        </div>
      </div>
      <button className="w-full py-3 bg-red-600 mt-4 text-white">
        Sign out
      </button>
    </div>
  );
};
*/
