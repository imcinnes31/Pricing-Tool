import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button, Modal } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";
import { Link, useParams } from "react-router-dom";
import useHttpRequest from "../hooks/HttpRequestObjectType";
import { Spinner } from "../components/Spinner";
import SingleSelector from "../components/SingleSelector";
import AddCounselor from "./AddCounselor";
// import counselorsRoute from "../../../server/routes/counselors.route";
// import { ConnectionStates } from "mongoose";
const { useState } = React;

export default function UserProfile() {
  const { userKey } = useParams();

  const { loading, error, data } = useHttpRequest(
    `http://localhost:5000/api/users/search-user/${userKey}`
  ); // data in this context is a user object.

  // const [userInfo, setUserInfo] = useState();

  const [form, setForm] = useState({
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    pfp: "https://picsum.photos/360/240?random=0",
    date: "2021-05-31T12:04:39.572Z",
  });

  const [edit, setEdit] = useState(false);
  const [editPW, setPWEdit] = useState(false);
  const [userWithData, setUserWithData] = useState();


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //const handleShow = () => setShow(true);


  const submitTest = async (e) => {
    // alert(JSON.stringify(form));
    e.preventDefault();

    console.log(form);

    try {
      const responseData = await Axios.put(
        `/api/users/update-user/${userKey}`,
        form
      );
    } catch (err) {
      alert("Update Error");
    } finally {
      window.location.reload(false);
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

  const switchEditMode = () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const switchPWEditMode = () => {
    if (editPW) {
      setPWEdit(false);
    } else {
      setPWEdit(true);
    }
  };

  const displayCounselorPage = async () => {
    try {
      const responseData = await Axios.get(
        `/api/v2/counselors/getCounselorByEmail/${localStorage.getItem("userEmail")}`
      );
      setUserWithData(responseData.data.existingCounselor);
      console.log("------------------");
      console.log(responseData.data.existingCounselor);
    } catch (err) {
      alert("Please Update your Counselor Profile");
    } finally {
      //window.location.reload(false);
      setShow(true)
    }

  };

  if (loading) return <Spinner />;
  if (error) return "Something went wrong. Please try again.";
  if (data) {
    const userInfo = data.data.existingUser;
    return (
      <div className="container">
        <div className="container  border-bottom">
          <h1>{userKey}'s Profile Page</h1>
        </div>

        <br />
        {/* <UserProfileStatus userKey = {userKey} userInfo = {userInfo}/> */}
        <Form onSubmit={submitTest}>
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                onChange={handleChange}
                defaultValue={`${userInfo.firstName}`}
                disabled={!edit}
                required
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                id="lastName"
                onChange={handleChange}
                defaultValue={`${userInfo.lastName}`}
                disabled={!edit}
                required
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                id="email"
                defaultValue={`${userKey}`}
                disabled={true}
                required
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="phone"
                onChange={handleChange}
                defaultValue={`${userInfo.phone}`}
                disabled={!edit}
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
                disabled={!editPW}
                required
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                type="password"
                id="repeatPassword"
                onChange={handleChange}
                disabled={!editPW}
                required
              ></Form.Control>
            </Col>
          </Row>
          {edit == false && editPW == false ? (
            <Fragment>
              <Button
                style={{ marginTop: "20px", marginBottom: "202px" }}
                onClick={switchEditMode}
              >
                Edit Info
              </Button>{" "}
              <Button
                style={{ marginTop: "20px", marginBottom: "202px" }}
                onClick={switchPWEditMode}
              >
                Change Password
              </Button>
            </Fragment>
          ) : (
            ""
          )}

          {edit == true ? (
            <Fragment>
              <Button
                type="submit"
                style={{ marginTop: "20px", marginBottom: "202px" }}
              >
                Update
              </Button>{" "}
              <Button
                style={{ marginTop: "20px", marginBottom: "202px" }}
                onClick={switchEditMode}
              >
                Back
              </Button>
            </Fragment>
          ) : (
            ""
          )}

          {editPW == true ? (
            <Fragment>
              <Button
                type="submit"
                style={{ marginTop: "20px", marginBottom: "202px" }}
              >
                Update
              </Button>{" "}
              <Button
                style={{ marginTop: "20px", marginBottom: "202px" }}
                onClick={switchPWEditMode}
              >
                Back
              </Button>
            </Fragment>
          ) : (
            ""
          )}
          <div className="container  border-top">
          </div>
        </Form>
        {userInfo.role == "Counselor" || userInfo.role == "Admin" ? (
          <Fragment>
            <Button
              style={{ marginTop: "20px", marginBottom: "202px" }}
              onClick={displayCounselorPage}
            // onClick={handleShow}
            >
              Access Counselor Profile
            </Button>
          </Fragment>
        ) : (
          ""
        )
        }

        <Modal show={show} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container  border-bottom">
              <h1>{userKey}'s Counselor Profile</h1>
            </div>
            {userWithData ? (
              <Fragment>
                <Form>
                  {loading ? <Spinner /> : <img className="mx-auto d-block" src={`http://localhost:5000/${userWithData.pfp}`} style={{ height: '100%', maxWidth: '350px' }} />}
                  {/* `http://localhost:5000/uploads/images/Ally_Goult.png` */}
                  <Row>
                    <Col>
                      <Form.Label>Full name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData.name}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData.gender}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Pronouns</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData.pronouns}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={`${userWithData.age}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Credentials</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData.credentials}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Form.Label>Introduction</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={`${userWithData.introduction}`}
                    disabled={true}
                  ></Form.Control>
                  <Row>
                    <Col>
                      <Form.Label>Specialization</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData.specialization}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Form.Label>Specialization Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={`${userWithData.specializationDesc}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Approach</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData.approach}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Approach Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={`${userWithData.approachDesc}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={`${userWithData.price}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Roles</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData.roles}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>In Person</Form.Label>
                  <Form.Check
                    defaultChecked={userWithData.in_person}
                    disabled={true} />

                  {userWithData.in_person ? (
                    <Fragment>
                      <Form.Label>In Person Price</Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={`${userWithData.in_person_price}`}
                        disabled={true}
                      ></Form.Control>
                    </Fragment>
                  ) : (
                    ""
                  )}

                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData.province}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData.city}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData.email}`}
                    disabled={true}
                  ></Form.Control>
                </Form>
              </Fragment>
            ) : (
              <AddCounselor />
            )
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            {userWithData ? (
              <Fragment>
                <Button variant="primary" onClick={handleShowEdit}>
                  Edit
                </Button>
              </Fragment>
            ) : (
              ""
            )}
          </Modal.Footer>
        </Modal>


        <Modal show={showEdit} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container  border-bottom">
              <h1>{userKey}'s Counselor Profile</h1>
            </div>
            <AddCounselor isUpdate={true} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleCloseEdit}>
              Save
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return null;
  }
}
