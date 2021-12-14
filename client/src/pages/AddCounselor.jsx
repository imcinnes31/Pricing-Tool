import React from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Country, State, City } from "country-state-city";

import { OPTIONS } from "../constants/addCounselorOptions";
import MultiSelector from "../components/MultiSelector";
import SingleSelector from "../components/SingleSelector";
import ImageUpload from "../components/ImageUpload";
const { useState } = React;

export default function AddCounselor() {
  const [form, setForm] = useState({});

  const submitForm = (e) => {
    // alert(JSON.stringify(form));
    const formData = new FormData();
    for (var key in form) {
      formData.append(key, form[key]);
    }
    console.log(formData);
    Axios.post("/api/insertCounselor", formData);
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
    console.log(State.getStatesOfCountry("CA"));
  };

  const handleImg = (file) => {
    setForm({
      ...form,
      pfp: file,
    });
  };
  return (
    <div>
      <h1>Add Counselor</h1>
      {/* Change Form.Control id to control id in the form group  */}
      <Form onSubmit={submitForm}>
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
          id="introduction"
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

        <Form.Label>Roles</Form.Label>
        <MultiSelector
          filters={OPTIONS[7]}
          id="roles"
          onChange={handleSelect}
          isQuery={true}
        />

        <Form.Label>In Person</Form.Label>
        <Form.Check name="terms" onChange={handleCheck} id="in_person" />

        <Form.Label>Province</Form.Label>
        <SingleSelector
          filters={OPTIONS[8]}
          id="province"
          onChange={handleSelect}
          isQuery={true}
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
