import React, { useEffect, useContext } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";

const { useState } = React;
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const fetchUsers = async () => {
    const { data } = await Axios.get("/api/users/");
    const userLists = data;
    setUsers(userLists.users);
  };

  let radioClient = false;
  let radioCounselor = false;
  let radioAdmin = false;

  const handleChange = (emailKey) => async (e) => {
    const responseData = await Axios.post(
      `/api/users/userRoleChange/${emailKey}/${e.target.value}`
    );
  };

  const handleDelete = async (emailKey) => {
    await Axios.delete(`/api/users/userDelete/${emailKey}`);
  };

  const handleSearch = async () => {
    const emailkey = document.getElementById("header-search").value;
    console.log(emailkey);
    let searchResult;
    try {
      searchResult = await Axios.get(`/api/users/search-user/${emailkey}`);
      console.log(searchResult);
    } catch (err) {
    } finally {
    }
    setSearch(true);
    setSearchData(searchResult.data.existingUser);
    // console.log(searchResult.data.existingUser);
    // // console.log(users);
    // setUsers([searchResult.data.existingUser]);
    // console.log(searchData);
  };

  const changeRadio = (role) => {
    if (role === "Client") {
      radioClient = true;
      radioCounselor = false;
      radioAdmin = false;
    } else if (role === "Counselor") {
      radioClient = false;
      radioCounselor = true;
      radioAdmin = false;
    } else if (role === "Admin") {
      radioClient = false;
      radioCounselor = false;
      radioAdmin = true;
    }
  };

  const resetRadio = () => {
    radioClient = false;
    radioCounselor = false;
    radioAdmin = false;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   // console.log(users);
  // }, [searchData]);

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

      <input
        type="text"
        id="header-search"
        placeholder="Search by Email"
        name="s"
      />
      <button type="submit" onClick={handleSearch}>
        Search
      </button>

      {users.map((user, index) => (
        <div className="card mb-3 offWhite">
          {/* <Row> */}
          <div className="card-body">
            {changeRadio(user.role)}
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
                {search ? (
                  <div>
                    <input
                      type="radio"
                      value="Client"
                      name={user.email}
                      defaultChecked={searchData[0].role === "Client" ? true : false}
                      onChange={handleChange(user.email)}
                    />
                    Client &nbsp;
                    <input
                      type="radio"
                      value="Counselor"
                      name={user.email}
                      defaultChecked={
                        searchData[0].role === "Counselor" ? true : false
                      }
                      onChange={handleChange(user.email)}
                    />
                    Counselor &nbsp;
                    <input
                      type="radio"
                      value="Admin"
                      name={user.email}
                      defaultChecked={searchData[0].role === "Admin" ? true : false}
                      onChange={handleChange(user.email)}
                    />
                    Admin
                  </div>
                ) : (
                  <div>
                    <input
                      type="radio"
                      value="Client"
                      name={user.email}
                      defaultChecked={radioClient}
                      onChange={handleChange(user.email)}
                    />
                    Client &nbsp;
                    <input
                      type="radio"
                      value="Counselor"
                      name={user.email}
                      defaultChecked={radioCounselor}
                      onChange={handleChange(user.email)}
                    />
                    Counselor &nbsp;
                    <input
                      type="radio"
                      value="Admin"
                      name={user.email}
                      defaultChecked={radioAdmin}
                      onChange={handleChange(user.email)}
                    />
                    Admin
                  </div>
                )}
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
