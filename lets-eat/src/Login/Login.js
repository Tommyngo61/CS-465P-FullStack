import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import TopNav from "../Landingpage/TopNav/TopNav";

export default function Login() {
  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <TopNav></TopNav>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">Need an account? Sign Up</div>
    </>
  );
}
