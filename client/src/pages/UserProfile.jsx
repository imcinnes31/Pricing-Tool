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
import { ROUTES } from "../constants/routes";
// import counselorsRoute from "../../../server/routes/counselors.route";
// import { ConnectionStates } from "mongoose";

//NEW IMPORTS FROM ADD COUNSELOR
import { OPTIONS, PROVINCE_CODE_MAP } from "../constants/addCounselorOptions";
import ImageUpload from "../components/ImageUpload";
import { Country, State, City } from "country-state-city";

const { useState } = React;

export default function UserProfile() {
  //NEW CONSTANTS FROM ADD COUNSELOR
  const [optionTest, setOptionTest] = useState({});
  const [optionTest2, setOptionTest2] = useState({});
  const [checked, setChecked] = useState(false);
  const [supervisorChecked, setSupervisorChecked] = useState(false);
  const [languagesList, setLanguagesList] = useState({});

  const [userWithData2, setUserWithData2] = useState();

  // React.useEffect(() => {
  //   getCurrentUserData();
  // }, []);
      //FUNCTIONS TAKEN FROM ADD COUNSELOR PAGE
  const [form, setForm] = useState(
    {
      // id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
      // pfp: "https://picsum.photos/360/240?random=0",
      // date: "2021-05-31T12:04:39.572Z",
    }
  );
  
    useEffect(() => {
      if (!userWithData2) {
        getCurrentUserData();
      }
      const cityNames = City.getCitiesOfState("CA", PROVINCE_CODE_MAP[form.province]).map(function (city) {
        return city.name;
      });
      setOptionTest({ category: "Cities", list: cityNames });
      // console.log("current user province");
      // console.log(cityNames);
      const languageData = require('language-list')().getData();
      var langList = [];
      for (const currentLang in languageData) {
        langList.push(languageData[currentLang].language);
      }
      setLanguagesList({ category: "Languages", list: langList });
    }, [form.province]);

  const getCurrentUserData = async () => {
    const responseData2 = await Axios.get(
      `/api/v2/counselors/getCounselorByEmail/${localStorage.getItem("userEmail")}`
    );
    setUserWithData2(responseData2.data.existingCounselor);
    if(responseData2.data.existingCounselor.roles) {
      if(responseData2.data.existingCounselor.roles.includes('supervisor')) {
        setSupervisorChecked(true);
      }
    }
    if(responseData2.data.existingCounselor.in_person) {
      if(responseData2.data.existingCounselor.in_person === true) {
        setChecked(true);
      }
    }
    if(responseData2.data.existingCounselor.province) {
      // console.log(responseData2.data.existingCounselor.province);
      const cityNames = City.getCitiesOfState("CA", PROVINCE_CODE_MAP[responseData2.data.existingCounselor.province]).map(function (city) {
        return city.name;
      });
      setOptionTest2({ category: "Cities", list: cityNames });

    }
    const currentCounselor = responseData2.data.existingCounselor;
  };

  const { userKey } = useParams();

  const { loading, error, data } = useHttpRequest(
    `http://localhost:5000/api/users/search-user/${userKey}`
  ); // data in this context is a user object.

  // const [userInfo, setUserInfo] = useState();

  const [edit, setEdit] = useState(false);
  const [editPW, setPWEdit] = useState(false);
  const [editEM, setEMEdit] = useState(false);
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

    if (form['emailAddress'] && form['emailAddress'] !== userKey) {
      try {
        const existingCounselorSearch = await Axios.get(
          `/api/users/search-email/${form['emailAddress']}`
        );
        if (existingCounselorSearch.data.existingUser.length > 0) {
          alert("User with that email already exists");
          return;
        }
        const checkIfCounselor = await Axios.get(
          `/api/users/search-email/${userKey}`
        );

        if (checkIfCounselor.data.existingUser[0].role == "Counselor") {
          if (userWithData2) {
            Axios.delete(`/api/v2/counselors/counselorDelete/${userKey}`);
            const formData = new FormData();
            for (const [key, value] of Object.entries(userWithData2)) {
              if (key === "email") {
                formData.append(key, form['emailAddress']);
              } else if (key === "gender") {
                formData.append(key, value.toLowerCase());
              } else {
                formData.append(key, value);
              }
            }
            formData.append('existing_pfp_path', userWithData2.pfp);
            Axios.post("/api/insertCounselor", formData);
          }
          else {
            alert("Update error");
          }
        }
        
      } catch (err) {
        alert("Database Error");
        return;
      }

      try {
        const responseData = await Axios.put(
          `/api/users/update-user/${userKey}`,
          form
        );
      } catch (err) {
        alert("Update Error");
      } 

      localStorage.setItem(
        "userEmail",
        form['emailAddress']
      );

      window.location = `${ROUTES.USERPROFILE}/${form['emailAddress']}`;
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

  const switchEMEditMode = () => {
    if (editEM) {
      setEMEdit(false);
    } else {
      setEMEdit(true);
    }
  };

  const displayCounselorPage = async () => {
    try {
      // console.log(localStorage.getItem("userEmail"))
      const responseData = await Axios.get(
        `/api/v2/counselors/getCounselorByEmail/${localStorage.getItem("userEmail")}`
      );
      setUserWithData(responseData.data.existingCounselor);
      // console.log("------------------");
      // console.log(responseData.data.existingCounselor);
    } catch (err) {
      alert("Please Update your Counselor Profile");
    } finally {
      //window.location.reload(false);
      setShow(true)
    }

  };

  // const submitUpdatedForm = (e) => {
  //   // Axios.delete(`/api/v2/counselors/counselorDelete/${localStorage.getItem("userEmail")}`);
  //   const formData = new FormData();
  //   for (var key in form) {
  //     formData.append(key, form[key]);
  //   }
  //   // Axios.post("/api/insertCounselor", formData);
  //   window.location.reload(false);
  //   e.preventDefault();
  // };

  const handleField = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelect = (selected) => {
    if(document.getElementById(`${selected.id}Selection`)){
      document.getElementById(`${selected.id}Selection`).value = selected.optionsSelected;
    }
    setForm({
      ...form,
      [selected.id]: selected.optionsSelected,
    });
    if (selected.id === 'roles') {
      if (selected.optionsSelected.includes('supervisor')) {
        setSupervisorChecked(true);
      }
      else {
        setSupervisorChecked(false);
      }
    }
  };

  const handleCheck = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.checked,
    });
    if (checked == true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const handleImg = (file) => {
    // console.log(file);
    setForm({
      ...form,
      pfp: file,
    });
  };

  const submitForm = (e) => {
    var formData = new FormData();
    for (var key in form) {
      if (key === 'gender') {
        formData.append(key, form[key].replace(/ /g, "_").toLowerCase());
      } else {
        formData.append(key, form[key]);
      }
    }
    if(userWithData2) {
      Axios.delete(`/api/v2/counselors/counselorDelete/${localStorage.getItem("userEmail")}`);
      for (const [key, value] of Object.entries(userWithData2)) {
        if (!(form[key]) && !(key === 'in_person')) {
          formData.append(key, value);
        }
      }
      formData.append('existing_pfp_path', userWithData2.pfp);
    }
    else {
      formData.append('email', localStorage.getItem("userEmail"));
    }
    formData.append('in_person', checked);
    Axios.post("/api/insertCounselor", formData);
    window.location.reload(false);
    e.preventDefault();
  };

  if (loading) return <Spinner />;
  if (error) return "Something went wrong. Please try again.";
  if (data) {
    const userInfo = data.data.existingUser;
    return (
      <div id="userProfilePage" className="container">
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
                id="emailAddress"
                onChange={handleChange}
                defaultValue={`${userKey}`}
                disabled={!editEM}
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
          {edit == false && editPW == false && editEM == false ? (
            <Fragment>
              <div id="buttonContainer">
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
              </Button>{" "}
              <Button
                style={{ marginTop: "20px", marginBottom: "202px" }}
                onClick={switchEMEditMode}
              >
                Change Email
              </Button>
              </div>
            </Fragment>
          ) : (
            ""
          )}

          {edit == true ? (
            <Fragment>
              <div id="buttonContainer">
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
              </div>
            </Fragment>
          ) : (
            ""
          )}

          {editPW == true ? (
            <Fragment>
              <div id="buttonContainer">
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
              </div>
            </Fragment>
          ) : (
            ""
          )}

          {editEM == true ? (
            <Fragment>
              <div id="buttonContainer">
              <Button
                type="submit"
                style={{ marginTop: "20px", marginBottom: "202px" }}
              >
                Update
              </Button>{" "}
              <Button
                style={{ marginTop: "20px", marginBottom: "202px" }}
                onClick={switchEMEditMode}
              >
                Back
              </Button>
              </div>
            </Fragment>
          ) : (
            ""
          )}
          <div className="container  border-top">
          </div>
        </Form>
        {userInfo.role == "Counselor" || userInfo.role == "Admin" ? (
          <Fragment>
            <div id="buttonContainer">
            <Button
              id="accessButton"
              onClick={displayCounselorPage}
            // onClick={handleShow}
            >
              Access Counselor Profile
            </Button>
            </div>
          </Fragment>
        ) : (
          ""
        )
        }

        <Modal show={show} size="lg" id="profileModal"
          aria-labelledby="contained-modal-title-vcenter"
          centered onHide={handleClose}>
          {/* <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <div className="container  border-bottom">
              <h1>{userKey}'s Counselor Profile</h1>
            </div>
            {userWithData2 ? (
              <Fragment>
                <Form>
                  {/* {loading ? <Spinner /> : <img className="mx-auto d-block" src={`http://localhost:5000/${userWithData2.pfp}`} style={{ height: '100%', maxWidth: '350px' }} />} */}
                  {loading ? <Spinner /> : <img className="mx-auto d-block" src={userWithData2.pfp.startsWith("uploads/") ? `http://localhost:5000/${userWithData2.pfp}` : userWithData2.pfp} style={{ height: '100%', maxWidth: '350px' }} />}
                  {/* `http://localhost:5000/uploads/images/Ally_Goult.png` */}
                  <Row>
                    <Col>
                      <Form.Label>Full name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData2.name}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData2.gender}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Pronouns</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData2.pronouns}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={`${userWithData2.age}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Credentials</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData2.credentials}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Form.Label>Short Introduction</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={`${userWithData2.introduction}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Long Introduction</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={`${userWithData2.descriptionLong}`}
                    disabled={true}
                  ></Form.Control>
                  <Row>
                    <Col>
                      <Form.Label>Specialization</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={`${userWithData2.specializations}`}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Form.Label>Specialization Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={`${userWithData2.specializationDesc}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Approach</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData2.approach}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Approach Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={`${userWithData2.approachDesc}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={`${userWithData2.price}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Roles</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData2.roles}`}
                    disabled={true}
                  ></Form.Control>

                {supervisorChecked ? (
                  <Fragment>
                    <Form.Label>Supervision Rate</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={`${userWithData2.min_supervision_rate}`}
                        disabled={true}
                    ></Form.Control>
                  </Fragment>
                ) : (
                  ""
                )}

                  <Form.Label>In Person</Form.Label>
                  <Form.Check
                    defaultChecked={userWithData2.in_person}
                    disabled={true} />

                  {userWithData2.in_person ? (
                    <Fragment>
                      <Form.Label>In Person Price</Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={`${userWithData2.in_person_price}`}
                        disabled={true}
                      ></Form.Control>
                    </Fragment>
                  ) : (
                    ""
                  )}

                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData2.province}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData2.city}`}
                    disabled={true}
                  ></Form.Control>
                  <Form.Label>Languages</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${userWithData2.languages}`}
                    disabled={true}
                  ></Form.Control>
                </Form>
              </Fragment>
            ) : (
              // <AddCounselor />
              //REPLACE WITH EDITABLE DIALOG
              <div id="addCounselorPage">
              <h1>Counselor Profile Management (new counselor)</h1>
              {/* Change Form.Control id to control id in the form group  */}
              <Form onSubmit={submitForm}>
                <ImageUpload id={"pfp"} center onInput={handleImg}/>
                <Row>
                  <Col>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      onChange={handleField}
                      required
                    ></Form.Control>
                    <p className="requiredIndicator">* required</p>
                  </Col>
                  <Col>
                    <Form.Label>Gender</Form.Label>
                    <SingleSelector
                      filters={OPTIONS[0]}
                      id="gender"
                      onChange={handleSelect}
                      isQuery={false}
                      required
                    />
                    <p className="requiredIndicator">* required</p>
                    <Form.Control
                      type="text"
                      id="genderSelection"
                      required='true'
                      className='hiddenValidationField'
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>Pronouns</Form.Label>
                    <SingleSelector
                      filters={OPTIONS[1]}
                      id="pronouns"
                      onChange={handleSelect}
                      isQuery={false}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      id="age"
                      onChange={handleField}
                      required
                    ></Form.Control>
                    <p className="requiredIndicator">* required</p>
                  </Col>
                  <Col>
                    <Form.Label>Credentials</Form.Label>
                    <MultiSelector
                      filters={OPTIONS[4]}
                      id="credentials"
                      onChange={handleSelect}
                      isQuery={false}
                    />
                  </Col>
                </Row>
                <Form.Label>Short Introduction</Form.Label>
                <Form.Control
                  as="textarea"
                  id="introduction"
                  onChange={handleField}
                  required
                ></Form.Control>
                <p className="requiredIndicator">* required</p>
                <Form.Label>Long Introduction</Form.Label>
                <Form.Control
                  as="textarea"
                  id="descriptionLong"
                  onChange={handleField}
                ></Form.Control>
                <Row>
                  {/* Ethnicity not needed right now */}
                  {/* <Col>
                    <Form.Label>ethnicity</Form.Label>
                    <MultiSelector
                      filters={FILTERS[5]}
                      id="ethnicity"
                      onChange={handleChangeArray}
                    />
                  </Col> */}
                  <Col>
                    <Form.Label>Specialization</Form.Label>
                    <MultiSelector
                      filters={OPTIONS[2]}
                      id="specializations"
                      onChange={handleSelect}
                      isQuery={true}
                      required
                    />
                    <p className="requiredIndicator">* required</p>
                    <Form.Control
                      type="text"
                      id="specializationsSelection"
                      required='true'
                      className='hiddenValidationField'
                    ></Form.Control>
                  </Col>
                </Row>
                <Form.Label>Specialization Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="specializationDesc"
                  onChange={handleField}
                  required
                ></Form.Control>
                <p className="requiredIndicator">* required</p>
                <Form.Label>Approach</Form.Label>
                <MultiSelector
                  filters={OPTIONS[3]}
                  id="approach"
                  onChange={handleSelect}
                  isQuery={true}
                  required
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="approachSelection"
                  required='true'
                  className='hiddenValidationField'
                ></Form.Control>
                <Form.Label>Approach Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="approachDesc"
                  onChange={handleField}
                  required
                ></Form.Control>
                <p className="requiredIndicator">* required</p>
        
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  id="price"
                  onChange={handleField}
                  required
                ></Form.Control>
                <p className="requiredIndicator">* required</p>
                <Form.Label>Roles</Form.Label>
                <MultiSelector
                  filters={OPTIONS[7]}
                  id="roles"
                  onChange={handleSelect}
                  isQuery={true}
                  required
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="rolesSelection"
                  required='true'
                  className='hiddenValidationField'
                ></Form.Control>

                {supervisorChecked ? (
                  <Fragment>
                    <Form.Label>Supervision Rate</Form.Label>
                    <Form.Control
                      type="number"
                      id="min_supervision_rate"
                      onChange={handleField}
                    ></Form.Control>
                  </Fragment>
                ) : (
                  ""
                )}
        
                <Form.Label>In Person</Form.Label>
                <Form.Check name="terms" onChange={handleCheck} />
        
                {checked ? (
                  <Fragment>
                    <Form.Label>In Person Price</Form.Label>
                    <Form.Control
                      type="number"
                      id="in_person_price"
                      onChange={handleField}
                    //required
                    ></Form.Control>
                  </Fragment>
                ) : (
                  ""
                )}
        
                <Form.Label>Province</Form.Label>
                <SingleSelector
                  filters={OPTIONS[8]}
                  id="province"
                  onChange={handleSelect}
                  isQuery={true}
                  required
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="provinceSelection"
                  required='true'
                  className='hiddenValidationField'
                ></Form.Control>
                <Form.Label>City</Form.Label>
                <SingleSelector
                  filters={optionTest}
                  id="city"
                  onChange={handleSelect}
                  isQuery={true}
                  isSearchable={true}
                  required
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="citySelection"
                  required='true'
                  className='hiddenValidationField'
                ></Form.Control>
                <Form.Label>Languages</Form.Label>           
                <MultiSelector
                  filters={languagesList}
                  id="languages"
                  onChange={handleSelect}
                  isQuery={true}
                  isSearchable={true}
                  required
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="languagesSelection"
                  required='true'
                  className='hiddenValidationField'
                ></Form.Control>
                <div id="submitContainer">
                <Button
                  type="submit"
                  style={{ marginTop: "20px", marginBottom: "202px" }}
                >
                  SAVE
                </Button>
                </div>
              </Form>
            </div>

            )
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            {userWithData2 ? (
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


        <Modal show={showEdit} size="lg" id="profileModalContainer"
          aria-labelledby="contained-modal-title-vcenter"
          centered onHide={handleCloseEdit}>
          {/* <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <div className="container  border-bottom">
              <h1>{userKey}</h1>
            </div>
            {/* <AddCounselor isUpdate={true} /> */}
            {userWithData2 != null ?    // NEW ENCLOSURE TO CHECK FOR USER DATA
            <div id="addCounselorPage">
              <h1>Counselor Profile Management</h1>
              {/* Change Form.Control id to control id in the form group  */}
              <Form onSubmit={submitForm}>
                <ImageUpload id={"pfp"} center onInput={handleImg} prevImage={`${userWithData2.pfp}`}/>
                <Row>
                  <Col>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      onChange={handleField}
                      required
                      defaultValue={`${userWithData2.name}`}
                    ></Form.Control>
                    <p className="requiredIndicator">* required</p>
                  </Col>
                  <Col>
                    <Form.Label>Gender</Form.Label>
                    <SingleSelector
                      filters={OPTIONS[0]}
                      id="gender"
                      onChange={handleSelect}
                      required
                      isQuery={false}
                      userData={`${userWithData2.gender}`}
                    />
                    <p className="requiredIndicator">* required</p>
                    <Form.Control
                      type="text"
                      id="genderSelection"
                      required='true'
                      defaultValue={`${userWithData2.gender}`}
                      className='hiddenValidationField'
                    ></Form.Control>
                    
                  </Col>
                  <Col>
                    <Form.Label>Pronouns</Form.Label>
                    <SingleSelector
                      filters={OPTIONS[1]}
                      id="pronouns"
                      onChange={handleSelect}
                      isQuery={false}
                      userData={`${userWithData2.pronouns}`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      id="age"
                      onChange={handleField}
                      required
                      defaultValue = {`${userWithData2.age}`}
                    ></Form.Control>
                    <p className="requiredIndicator">* required</p>
                  </Col>
                  <Col>
                    <Form.Label>Credentials</Form.Label>
                    <MultiSelector
                      filters={OPTIONS[4]}
                      id="credentials"
                      onChange={handleSelect}
                      isQuery={false}
                      userData={`${userWithData2.credentials}`}
                    />
                  </Col>
                </Row>
                <Form.Label>Short Introduction</Form.Label>
                <Form.Control
                  as="textarea"
                  id="introduction"
                  onChange={handleField}
                  required
                  defaultValue={`${userWithData2.introduction}`}
                ></Form.Control>
                <p className="requiredIndicator">* required</p>
                <Form.Label>Long Introduction</Form.Label>
                <Form.Control
                  as="textarea"
                  id="descriptionLong"
                  onChange={handleField}
                  defaultValue={`${userWithData2.descriptionLong}`}
                ></Form.Control>
                <Row>
                  {/* Ethnicity not needed right now */}
                  {/* <Col>
                    <Form.Label>ethnicity</Form.Label>
                    <MultiSelector
                      filters={FILTERS[5]}
                      id="ethnicity"
                      onChange={handleChangeArray}
                    />
                  </Col> */}
                  <Col>
                    <Form.Label>Specialization</Form.Label>
                    <MultiSelector
                      filters={OPTIONS[2]}
                      id="specializations"
                      onChange={handleSelect}
                      isQuery={true}
                      required
                      userData={`${userWithData2.specializations}`}
                    />
                    <p className="requiredIndicator">* required</p>
                    <Form.Control
                      type="text"
                      id="specializationsSelection"
                      required='true'
                      defaultValue={`${userWithData2.specializations}`}
                      className='hiddenValidationField'
                    ></Form.Control>
                  </Col>
                </Row>
                <Form.Label>Specialization Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="specializationDesc"
                  onChange={handleField}
                  required
                  defaultValue={`${userWithData2.specializationDesc}`}
                ></Form.Control>
                <p className="requiredIndicator">* required</p>
                <Form.Label>Approach</Form.Label>
                <MultiSelector
                  filters={OPTIONS[3]}
                  id="approach"
                  onChange={handleSelect}
                  isQuery={true}
                  required
                  userData={`${userWithData2.approach}`}
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="approachSelection"
                  required='true'
                  defaultValue={`${userWithData2.approach}`}
                  className='hiddenValidationField'
                ></Form.Control>
                <Form.Label>Approach Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="approachDesc"
                  onChange={handleField}
                  required
                  defaultValue={`${userWithData2.approachDesc}`}
                ></Form.Control>
                <p className="requiredIndicator">* required</p>
        
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  id="price"
                  onChange={handleField}
                  required
                  defaultValue={`${userWithData2.price}`}
                ></Form.Control>
                <p className="requiredIndicator">* required</p>
        
                <Form.Label>Roles</Form.Label>
                <MultiSelector
                  filters={OPTIONS[7]}
                  id="roles"
                  onChange={handleSelect}
                  isQuery={true}
                  required
                  userData={`${userWithData2.roles}`}
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="rolesSelection"
                  required='true'
                  defaultValue={`${userWithData2.roles}`}
                  className='hiddenValidationField'
                ></Form.Control>
        
              {supervisorChecked ? (
                  <Fragment>
                    <Form.Label>Supervision Rate</Form.Label>
                    <Form.Control
                      type="number"
                      id="min_supervision_rate"
                      onChange={handleField}
                      defaultValue={userWithData2.min_supervision_rate ? `${userWithData2.min_supervision_rate}` : null}
                    //required
                    ></Form.Control>
                  </Fragment>
                ) : (
                  ""
                )}
                
                <Form.Label>In Person</Form.Label>
                <Form.Check name="terms" onChange={handleCheck} defaultChecked={userWithData2.in_person}/>
                {/* DOES NOT BRING UP IN PERSON PRICE FIELD WHEN CHECKED, BUT RATHER UNCHECKED */}
        
                {checked ? (
                  <Fragment>
                    <Form.Label>In Person Price</Form.Label>
                    <Form.Control
                      type="number"
                      id="in_person_price"
                      onChange={handleField}
                      defaultValue={userWithData2.in_person_price ? `${userWithData2.in_person_price}` : null}
                    //required
                    ></Form.Control>
                  </Fragment>
                ) : (
                  ""
                )}
        
                <Form.Label>Province</Form.Label>
                <SingleSelector
                  filters={OPTIONS[8]}
                  id="province"
                  onChange={handleSelect}
                  isQuery={true}
                  userData={`${userWithData2.province}`}
                  required
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="provinceSelection"
                  required='true'
                  defaultValue={`${userWithData2.province}`}
                  className='hiddenValidationField'
                ></Form.Control>
                <Form.Label>City</Form.Label>           
                <SingleSelector
                  filters={optionTest.list.length > 0 ? optionTest : optionTest2}
                  id="city"
                  onChange={handleSelect}
                  isQuery={true}
                  isSearchable={true}
                  userData={`${userWithData2.city}`}
                  required
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="citySelection"
                  required='true'
                  defaultValue={`${userWithData2.city}`}
                  className='hiddenValidationField'
                ></Form.Control>
                <Form.Label>Languages</Form.Label>           
                <MultiSelector
                  filters={languagesList}
                  id="languages"
                  onChange={handleSelect}
                  isQuery={true}
                  isSearchable={true}
                  userData={`${userWithData2.languages}`}
                  required
                />
                <p className="requiredIndicator">* required</p>
                <Form.Control
                  type="text"
                  id="languagesSelection"
                  required='true'
                  defaultValue={`${userWithData2.languages}`}
                  className='hiddenValidationField'
                ></Form.Control>
                <div id="submitContainer">
                <Button
                  type="submit"
                  style={{ marginTop: "20px", marginBottom: "202px" }}
                >
                  SAVE
                </Button>
                </div>
              </Form>
            </div>
            : null} 
            {/*NEW ENCLOSURE CHECKING FOR USER DATA */}
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
