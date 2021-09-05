import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import {OverlayTrigger, Popover} from 'react-bootstrap';

export default function Header({ company }) {
  return (
    <header className="header">
      <div className="inner_header">
        <div className="logo_container">
          {/* <Link to={'/'} onClick={() => setShowCounselors(false)}> */}
          <NavLink to={ROUTES.HOME}>
            <img
              id="img-logo"
              src={require("../../assets/images/logo.jpg").default}
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
          <OverlayTrigger trigger="click" placement="bottom" overlay={popoverForm} container={this}>
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
const popoverForm = (
  <Popover id="popover-basic" >
    <Popover.Header as="h3" >Popover right</Popover.Header>
    <Popover.Body>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Body>
  </Popover>
);