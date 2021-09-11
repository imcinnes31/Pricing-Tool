import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import {Form, OverlayTrigger, Popover, Button} from 'react-bootstrap';

export default function Header({ company }) {
  const popoverForm = (
    <Popover id="popover-basic" style={{backgroundColor: "var(--offWhite)"}}>
      <Popover.Body >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formRegister">
            <p style={{fontWeight: "bold"}}>New user? &nbsp;
              {/* Change Link to register page later */}
              <NavLink to={ROUTES.MAIN}
                style={{
                  fontWeight: "bold",
                  color: "var(--secondary_3)",
                  textDecoration: "underline"
                }}>
                Register here
              </NavLink>
            </p>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formSubmit">
            <button type="submit" className="btn primary-button w-100" style={{marginLeft: "0px"}}>
              Submit
            </button>
          </Form.Group>
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <header className="header">
      <div className="inner_header">
        <div className="logo_container">
          {/* <Link to={'/'} onClick={() => setShowCounselors(false)}> */}
          <NavLink to={ROUTES.HOME}>
            <img
              id="img-logo"
              src={require("../../assets/images/logo.png").default}
              // title is for hovering.
              title={company.name}
              alt={company.name}
            />
          </NavLink>
        </div>

        <div className="button_container">
          <NavLink to={ROUTES.MAIN}>
            <button type="button" className="btn secondary-button">
              FIND A COUNSELOR
            </button>
          </NavLink>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popoverForm} rootClose>
          <button type="button" className="btn primary-button" >
            SIGN IN
          </button>
          </OverlayTrigger>

        </div>

        <ul className="navigation">
          <li>
            <NavLink to={ROUTES.ABOUT}>ABOUT US</NavLink>
          </li>

          <li>
            <NavLink to={ROUTES.FAQ}>FAQ</NavLink>
          </li>

          <li>
            <NavLink to={ROUTES.CONTACT}>CONTACT US</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
