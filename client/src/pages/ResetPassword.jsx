import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";

export default function ResetPassword() {
  const [form, setForm] = useState({
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    pfp: "https://picsum.photos/360/240?random=0",
    date: "2021-05-31T12:04:39.572Z",
  });

  const { resetKey, emailKey } = useParams();

  const submitTest = async (e) => {
    // alert(JSON.stringify(form));
    e.preventDefault();

    try {
      const PWkey = document.getElementById("formPW").value;
      const responseData = await Axios.post(
        `${process.env.REACT_APP_BACKEND_API}/users/resetPassword/${resetKey}/${emailKey}`,
        form
      );
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Container style={{ width: "50%" }}>
      <h2 class="text-center">Reset Password for {emailKey}</h2>
      <Form>
        <hr />
        <br />
        <Form.Group className="mb-3" controlId="formPW">
          <Form.Control
            type="email"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control type="email" placeholder="Re-enter Password" required />
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
