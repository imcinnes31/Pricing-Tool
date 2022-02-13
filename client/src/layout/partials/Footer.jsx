import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { AiOutlineUser } from "react-icons/ai";
import {
  Form,
  OverlayTrigger,
  Popover,
  Button,
  Row,
  Col,
  Container,
  Dropdown,
} from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";

export default function Footer({ children }) {

  const auth = useContext(AuthContext);

  return (
    <footer
      //   className="position-absolute bottom-0 w-100 m-auto"
      className="footer position-fixed bottom-0 w-100 m-auto border-top"
    >
      <div id="footer-inner" className="container py-1 text-black">
        <div className="row w-100">
          <div className="col-4 text-start">
            <small className="text-muted">{children}</small>
          </div>
          <div className="col-4">
            <small className="text-muted">linkedIn</small>
          </div>
          {!auth.isLoggedIn ? (
            <div className="col-4 text-end">
              <small className="text-muted"><NavLink to={ROUTES.LOGIN}>Counselor? Login here</NavLink></small>
            </div>
          ) : ("")}
        </div>
      </div>
    </footer>
  );
}
