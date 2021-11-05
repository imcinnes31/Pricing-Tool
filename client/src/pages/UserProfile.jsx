import React, { useContext } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";
import { Link, useParams } from "react-router-dom";

const { useState } = React;

export default function UserProfile() {
  const { userid } = useParams();
  <div>
    <h1>Registration</h1>
    {/* Change Form.Control id to control id in the form group  */}
    <Form>
      <Row>
        <Col>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            id="firstName"
            // onChange={handleChange}
            required
          ></Form.Control>
        </Col>
        <Col>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            id="lastName"
            // onChange={handleChange}
            required
          ></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            id="email"
            // onChange={handleChange}
            required
          ></Form.Control>
        </Col>
        <Col>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            id="phone"
            // onChange={handleChange}
            required
          ></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            // onChange={handleChange}
            required
          ></Form.Control>
        </Col>
        <Col>
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            id="repeatPassword"
            // onChange={handleChange}
            required
          ></Form.Control>
        </Col>
      </Row>
      <Button
        type="submit"
        style={{ marginTop: "20px", marginBottom: "202px" }}
      >
        ADD
      </Button>
    </Form>
  </div>;
}
