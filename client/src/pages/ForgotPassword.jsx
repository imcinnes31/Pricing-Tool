import React, { useContext, useState } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";

export default function ForgotPassword() {

  const submitTest = async (e) => {
    // alert(JSON.stringify(form));
    e.preventDefault();

    try {
      const emailkey = document.getElementById("formEmail").value;
      const responseData = await Axios.post(`/api/users/forgotPassword/${emailkey}`);
    } catch (err) {
      alert("Email Error");
    }
  };

  return (
    <Container style={{ width: "50%" }}>
      <h1 class="display-1 text-center">Forgot Password</h1>
      <Form>
        <hr />
        <br />
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>

        {/* Hack: margin bottom for text-area */}
        <Form.Label></Form.Label>

        <Form.Group className="mb-3" controlId="formSubmit">
          <button
            type="submit"
            className="btn primary-button w-100"
            style={{ marginLeft: "0px" }}
            onClick={submitTest}
          >
            Submit
          </button>
        </Form.Group>
      </Form>
    </Container>
  );
}
