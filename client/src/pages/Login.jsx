import React, { useContext } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";
import { AuthContext } from "../context/auth-context";

const { useState } = React;

export default function Login() {
  const [form, setForm] = useState({
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    pfp: "https://picsum.photos/360/240?random=0",
    date: "2021-05-31T12:04:39.572Z",
  });

  const [user, setUser] = useState();
  const [email, setEmail] = useState();

  const submitTest = async (e) => {
    // alert(JSON.stringify(form));
    e.preventDefault();
    console.log(form);

    try {
      const responseData = await Axios.post("/api/users/userlogin", form);
      auth.login(responseData.data.userId, responseData.data.token, responseData.data.role);
      console.log(responseData.data.userId);
      console.log(responseData.data.token);
      console.log(responseData.data.email);
      console.log(responseData.data.role);
      setUser(responseData.data);
      localStorage.setItem(
        "userEmail",
        responseData.data.email

      );
      setEmail(responseData.data.email);
      window.location.reload(false);
    } catch (err) {
      alert("Login Error");
      // throw new Error("Login Error");
    }
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

  const auth = useContext(AuthContext);

  return (
    <Container id="loginPage">
      <h1 class="display-1 text-center">Login</h1>
      <Form onSubmit={submitTest}>
        <Row>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              id="email"
              onChange={handleChange}
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
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
        </Row>
        <Row>
          <Col id="loginButton">
            <Button
              type="submit"
              style={{ marginTop: "20px", marginBottom: "202px" }}
            >
              Login
            </Button>
          </Col>
          <Col id="loginOptions">
            <p style={{ fontWeight: "bold" }}>
              New user? &nbsp;
              <NavLink to={ROUTES.REGISTERUSER}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "var(--secondary_3)",
                    textDecoration: "underline",
                  }}
                >
                  Register here
                </span>
              </NavLink>
            </p>
            <p style={{ fontWeight: "bold" }}>
              Forgot Password? &nbsp;
              <NavLink to={ROUTES.FORGOTPASSWORD}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "var(--secondary_3)",
                    textDecoration: "underline",
                  }}
                  // Hack to close popover form when register is clicked.
                  onClick={() => {
                    document.body.click();
                  }}
                >
                  Reset here
                </span>
              </NavLink>
            </p>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
