import React, { useEffect, useContext } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";

const { useState } = React;
export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await Axios.get(process.env.REACT_APP_BACKEND_URL + "/users/");
    const userLists = data;
    setUsers(userLists.users);
    //console.log(userLists);
    //console.log(userLists.users);
  };

  const handleChange = (emailKey) => async (e) => {
    const responseData = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/userRoleChange/${emailKey}/${e.target.value}`
    );
    //console.log(e.target.value + emailKey);
  };

  const handleDelete = async (emailKey) => {
    await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/userDelete/${emailKey}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody> */}
      {users.map((user, index) => (
        <div className="card mb-3 offWhite">
          {/* <Row> */}
          <div className="card-body">
            <Row>
              <Col>
                <h5 className="card-title" style={{ fontWeight: 700 }}>
                  {user.email}
                </h5>
                <p className="card-text">
                  {user.firstName} {user.lastName}
                </p>
              </Col>
              <Col>
                {/* <h5
                  className="card-title"
                  style={{ fontWeight: 700, textAlign: "center" }}
                >
                  {user.role}
                </h5> */}
                <div>
                  <input
                    type="radio"
                    value="Client"
                    name={user.email}
                    defaultChecked={user.role === "Client" ? true : false}
                    onChange={handleChange(user.email)}
                  />
                  Client &nbsp;
                  <input
                    type="radio"
                    value="Counselor"
                    name={user.email}
                    defaultChecked={user.role === "Counselor" ? true : false}
                    onChange={handleChange(user.email)}
                  />
                  Counselor &nbsp;
                  <input
                    type="radio"
                    value="Admin"
                    name={user.email}
                    defaultChecked={user.role === "Admin" ? true : false}
                    onChange={handleChange(user.email)}
                  />
                  Admin
                </div>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      handleDelete(user.email);
                      window.location.reload(false);
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </div>
          {/* </Row> */}
        </div>
      ))}
    </div>
  );
}
