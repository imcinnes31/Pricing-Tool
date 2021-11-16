import React from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";

import { OPTIONS } from "../constants/addCounselorOptions";
import MultiSelector from "../components/MultiSelector";
import SingleSelector from "../components/SingleSelector";
import ImageUpload from "../components/ImageUpload";
const { useState } = React;

export default function AddCounselor() {
  const [form, setForm] = useState({
    pfp: "https://picsum.photos/360/240?random=0",
    date: "2021-05-31T12:04:39.572Z",
  });

  const submitTest = (e) => {
    // alert(JSON.stringify(form));
    console.log(form);
    // Axios.post("/api/insertCounselor", form);
    e.preventDefault();
  };

  const handleField = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelect = (selected) => {
    setForm({
      ...form,
      [selected.id]: selected.optionsSelected,
    });
  };

  const handleCheck = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.checked,
    });
  };

  const handleImg = (id, file, isValid) => {
    setForm({
      ...form,
      [id]: file,
    });
  };
  return (
    <div>
      <h1>Add Counselor</h1>
      {/* Change Form.Control id to control id in the form group  */}
      <Form onSubmit={submitTest}>
          <ImageUpload id={"pfp"} center onInput={handleImg} />
        <Row>
          <Col>
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={handleField}
              required
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>Gender</Form.Label>
            <SingleSelector
              filters={OPTIONS[0]}
              id="gender"
              onChange={handleSelect}
              isQuery={false}
            />
          </Col>
          <Col>
            <Form.Label>Pronouns</Form.Label>
            <SingleSelector
              filters={OPTIONS[1]}
              id="pronouns"
              onChange={handleSelect}
              isQuery={false}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              id="age"
              onChange={handleField}
              required
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>Credentials</Form.Label>
            <MultiSelector
              filters={OPTIONS[4]}
              id="credentials"
              onChange={handleSelect}
              isQuery={false}
            />
          </Col>
        </Row>
        <Form.Label>Introduction</Form.Label>
        <Form.Control
          as="textarea"
          id="description"
          onChange={handleField}
          required
        ></Form.Control>
        <Row>
          {/* Ethnicity not needed right now */}
          {/* <Col>
            <Form.Label>ethnicity</Form.Label>
            <MultiSelector
              filters={FILTERS[5]}
              id="ethnicity"
              onChange={handleChangeArray}
            />
          </Col> */}
          <Col>
            <Form.Label>Specialization</Form.Label>
            <MultiSelector
              filters={OPTIONS[2]}
              id="specializations"
              onChange={handleSelect}
              isQuery={true}
            />
          </Col>
        </Row>
        <Form.Label>Specialization Description</Form.Label>
        <Form.Control
          as="textarea"
          id="specializationDesc"
          onChange={handleField}
          required
        ></Form.Control>
        <Form.Label>Approach</Form.Label>
        <MultiSelector
          filters={OPTIONS[3]}
          id="approach"
          onChange={handleSelect}
          isQuery={true}
        />
        <Form.Label>Approach Description</Form.Label>
        <Form.Control
          as="textarea"
          id="approachDesc"
          onChange={handleField}
          required
        ></Form.Control>

        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          id="price"
          onChange={handleField}
          required
        ></Form.Control>

        <Form.Label>In Person</Form.Label>
        <Form.Check
              name="terms"
              onChange={handleCheck}
              id="in_person"
            />

        <Button
          type="submit"
          style={{ marginTop: "20px", marginBottom: "202px" }}
        >
          ADD
        </Button>
      </Form>
    </div>
  );
}
