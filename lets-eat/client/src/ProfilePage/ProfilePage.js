import React, { useState } from "react";
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

export default function ProfilePage() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <TopNav></TopNav>
      <Container className="container-fluid mt-5">
        <Card className="ml-5">
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <strong>Email:</strong> {currentUser.email}
            </Row>
            <Row>
              <Col xs={4}>
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="placeholder"
                ></img>
              </Col>
              <Col>
                <Card>
                  <Card.Header>
                    <h2>Bio</h2>
                  </Card.Header>
                  <Card.Body>
                    <p>
                      Even in unflattering office light, Breanna McKenzie had
                      the healthy glow of someone who jogged each morning,
                      practised yoga with intent and deep-conditioned her glossy
                      black ponytail religiously every Sunday.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="mt-5">
                <h3>List of Restaurants</h3>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>name of Restaurant</th>
                      <th>Location</th>
                      <th>x</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>location</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
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
