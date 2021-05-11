import React from "react";
import "./SearchBar.css";
import { Form, Button, Card, Col, InputGroup, Row } from "react-bootstrap";

/*
<select id="select" onChange={handleSelect} value={value}>
                <option value="selectOne">Select One</option>
                <option value="zip">Search by Zip</option>
                <option value="address">Search by Address</option>
              </select>
*/

function SearchBar() {
  return (
    <div className="container-fluid w-100 m-200 p-3 justify-content-center">
      <Col className="col-4" xs={{ offset: 4 }}>
        <Card className="card p-3 rounded shadow-sm">
          <Card.Body>
            <Form className="">
              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Search for a resturant, bakery, etc
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="">Find</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  id="inlineFormInputGroup"
                  placeholder="Restaurants, Bakeries, etc"
                  required
                />
              </InputGroup>

              <Form.Group controlId="address">
                <Form.Label className="">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="1234 Main St"
                  required
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="city">
                  <Form.Label className="">City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="state">
                  <Form.Label className="">state</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="zip">
                  <Form.Label className="">Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    placeholder="Enter Zip Code"
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="distance">
                <Form.Label className="header">Distance</Form.Label>
                <Form.Control
                  type="text"
                  name="distance"
                  placeholder="Enter Max Distance"
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="preferences">
                <Form.Label className="header">Other Preferences: </Form.Label>
                <Form.Check
                  type="checkbox"
                  name="vegan"
                  label="Vegan Friendly"
                ></Form.Check>
                <Form.Check
                  type="checkbox"
                  name="vegetarian"
                  label="vegetarian"
                ></Form.Check>
                <Form.Check
                  type="checkbox"
                  name="dine-in"
                  label="dine-in"
                ></Form.Check>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label className="header">Price Ranges:</Form.Label>
                <Row xs={6}>
                  <Col>
                    <Form.Check
                      className="checkbox-lg"
                      type="checkbox"
                      name="cheapest"
                      label="$"
                    ></Form.Check>
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      name="cheaper"
                      label="$$"
                    ></Form.Check>
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      name="lessCheap"
                      label="$$$"
                    ></Form.Check>
                  </Col>
                </Row>
              </Form.Group>

              <Button variant="primary" size="lg" type="submit">
                Search
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

/*
  <Form.Group controlId="cuisine">
                <Form.Label className="header">Cuisine Type</Form.Label>
                <Form.Control
                  type="text"
                  name="cuisine"
                  placeholder="Enter a Cuisine Type"
                ></Form.Control>
              </Form.Group>
*/

export default SearchBar;
