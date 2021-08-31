import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

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

          <button type="button" className="btn primary-button">
            SIGN IN
          </button>
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
