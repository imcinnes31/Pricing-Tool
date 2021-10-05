import React from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";

import { FILTERS } from "../constants/filters";

const { useState } = React;

export default function Register() {
  const [form, setForm] = useState({
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    pfp: "https://picsum.photos/360/240?random=0",
    date: "2021-05-31T12:04:39.572Z",
  });
  const [ethnicity, setEthnicity] = useState([]);


  const counselor_data = {
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    name: "",
    gender: "",
    title: "",
    age: 0,
    ethnicity: ethnicity,
    issues: ["adoption"],
    insurance: ["ceridian"],
    therapy_type: ["cognitive_behavioural"],
    credentials: ["a"],
    description:
      "ut libero sit aut totam inventore sunt\nporro sint qui sunt molestiae\nconsequatur cupiditate qui iste ducimus adipisci\ndolor enim assumenda soluta laboriosam amet iste delectus hic",
    price: 219,
    pfp: "https://picsum.photos/360/240?random=0",
    pronouns: "She/Her/her's",
    date: "2021-05-31T12:04:39.572Z",
  };
  const postTest = () => {};
  const submitTest = (e) => {
    alert(JSON.stringify(form));
    Axios.post("/api/insertCounselor", form);
    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeArray = (e) => {

    setForm({
      ...form,
      [e.target.id]: [e.target.value],
    });
  };
  return (
    <div>
      <h1>Add Counselor</h1>
      {/* Change Form.Control id to control id in the form group  */}
      <Form onSubmit={submitTest}>
        <Row>
          <Col>
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>gender</Form.Label>
            <Form.Control
              type="text"
              id="gender"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>title</Form.Label>
            <Form.Control
              type="text"
              id="title"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>age</Form.Label>
            <Form.Control
              type="number"
              id="age"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label>ethnicity</Form.Label>

            <Form.Control
              type="text"
              id="ethnicity"
              onChange={handleChangeArray}
              required
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>issues</Form.Label>
            <Form.Control
              type="text"
              id="issues"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
        </Row>
        <Form.Label>insurance</Form.Label>
        <Form.Control
          type="text"
          id="insurance"
          onChange={handleChange}
          required
        ></Form.Control>
        <Form.Label>therapy_type</Form.Label>
        <Form.Control
          type="text"
          id="therapy_type"
          onChange={handleChange}
          required
        ></Form.Control>
        <Form.Label>credentials</Form.Label>
        <Form.Control
          type="text"
          id="credentials"
          onChange={handleChange}
          required
        ></Form.Control>
        <Form.Label>description</Form.Label>
        <Form.Control
          as="textarea"
          id="description"
          onChange={handleChange}
          required
        ></Form.Control>
        <Form.Label>price</Form.Label>
        <Form.Control
          type="number"
          id="price"
          onChange={handleChange}
          required
        ></Form.Control>
        <Form.Label>pronouns</Form.Label>
        <Form.Control
          type="text"
          id="pronouns"
          onChange={handleChange}
          required
        ></Form.Control>
        <Button type="submit" style={{ marginBottom: "202px" }}>
          Work
        </Button>
      </Form>
    </div>
  );
}
