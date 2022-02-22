import React, { useEffect, useContext } from "react";
import Axios from "axios";
import {
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
  Container,
  Button,
  Spinner,
} from "react-bootstrap";
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
      setSearch(true);
      setSearchData(searchResult.data.existingUser);
    } catch (err) {
      alert("User Not Found");
    }
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

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // console.log(users);
  }, [searchData]);

  if (search && searchData != null) {
    changeRadio(searchData.role);
    if (
      radioClient == false &&
      radioCounselor == false &&
      radioAdmin == false
    ) {
      return <Spinner />;
    }
  }

  if (search && searchData != null) {
    return (
      <div className="container pb-5">
        <div className="container  border-bottom">
          <h1>User Management</h1>
        </div>
        <br />
        <div className="card mb-3 offWhite">
          <div className="card-body">
            <Row>
              <Col>
                <h5 className="card-title" style={{ fontWeight: 700 }}>
                  {searchData.email}
                </h5>
                <p className="card-text">
                  {searchData.firstName} {searchData.lastName}
                </p>
              </Col>
              <Col>
                <div>
                  <input
                    type="radio"
                    value="Client"
                    name={searchData.email}
                    defaultChecked={radioClient}
                    onChange={handleChange(searchData.email)}
                  />
                  Client &nbsp;
                  <input
                    type="radio"
                    value="Counselor"
                    name={searchData.email}
                    defaultChecked={radioCounselor}
                    onChange={handleChange(searchData.email)}
                  />
                  Counselor &nbsp;
                  <input
                    type="radio"
                    value="Admin"
                    name={searchData.email}
                    defaultChecked={radioAdmin}
                    onChange={handleChange(searchData.email)}
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
                      handleDelete(searchData.email);
                    window.location.reload(false);
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <Button
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Back
        </Button>
      </div>
    );
  } else if (!search || searchData == null) {
    return (
      <div className="container pb-5">
        <div className="container  border-bottom">
          <h1>User Management</h1>
        </div>
        <br />
        <InputGroup className="mb-3">
          <FormControl
            id="header-search"
            placeholder="Search by Email"
            aria-describedby="basic-addon2"
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputGroup>

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
  } else {
    return <Spinner />;
  }
}
