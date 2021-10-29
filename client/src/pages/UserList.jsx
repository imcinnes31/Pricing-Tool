import React, { useEffect, useContext } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";

const { useState } = React;
export default function UserList() {

  const auth = useContext(AuthContext);
  return (
    <div>

    </div>
  );
}
