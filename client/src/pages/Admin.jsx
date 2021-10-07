import React from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";

import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";

const { useState } = React;

export default function Admin() {
  const [form, setForm] = useState({
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    pfp: "https://picsum.photos/360/240?random=0",
    date: "2021-05-31T12:04:39.572Z",
  });

  const submitTest = (e) => {
    // alert(JSON.stringify(form));
    Axios.post("/api/insertCounselor", form);
    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeArray = (selected) => {
    setForm({
      ...form,
      [selected.id]: selected.optionsSelected,
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
              as="select"
              id="gender"
              onChange={handleChange}
              required
            >
              <option disabled selected value="">
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
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
            <MultiSelector
              filters={FILTERS[5]}
              id="ethnicity"
              onChange={handleChangeArray}
            />
          </Col>
          <Col>
            <Form.Label>issues</Form.Label>
            <MultiSelector
              filters={FILTERS[0]}
              id="issues"
              onChange={handleChangeArray}
            />
          </Col>
        </Row>
        <Form.Label>insurance</Form.Label>
        <MultiSelector
          filters={FILTERS[1]}
          id="insurance"
          onChange={handleChangeArray}
        />
        <Form.Label>therapy_type</Form.Label>
        <MultiSelector
          filters={FILTERS[3]}
          id="therapy_type"
          onChange={handleChangeArray}
        />
        <Form.Label>credentials</Form.Label>
        {/* NEED INFO ON CREDENTIAL CATEGORIES */}
        {/* <MultiSelector
          filters={FILTERS[]}
          id="credentials"
          onChange={handleChangeArray}
        /> */}
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
