import React, { useContext } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";
import { Link, useParams } from "react-router-dom";

const { useState } = React;

export default function UserProfile() {
  return (
    <div className="container">
      <div className="container  border-bottom">
        <h1>Frequently Asked Questions</h1>
      </div>

      <br />


    </div>
  );
}