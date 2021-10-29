import React, { useContext } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Form, OverlayTrigger, Popover, Button } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
const { useState } = React;

export default function Header({ company }) {
  const [form, setForm] = useState({
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    pfp: "https://picsum.photos/360/240?random=0",
    date: "2021-05-31T12:04:39.572Z",
  });

  const submitTest = (e) => {
    // alert(JSON.stringify(form));
    console.log(form);
    Axios.post("/api/users/usercreate", form);
    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const auth = useContext(AuthContext);
  // const popoverForm = (
  //   <Popover id="popover-basic" style={{ backgroundColor: "var(--offWhite)" }}>
  //     <Popover.Body>
  //       <Form onSubmit={submitTest}>
  //         <Form.Group className="mb-3" controlId="formBasicEmail">
  //           <Form.Label>Email</Form.Label>
  //           <Form.Control type="email" placeholder="Enter email" />
  //         </Form.Group>

  //         <Form.Group className="mb-3" controlId="formBasicPassword">
  //           <Form.Label>Password</Form.Label>
  //           <Form.Control type="password" placeholder="Password" />
  //         </Form.Group>

  //         <Form.Group className="mb-3" controlId="formRegister">
  //           <p style={{ fontWeight: "bold" }}>
  //             New user? &nbsp;
  //             <NavLink to={ROUTES.REGISTERUSER}>
  //               <span
  //                 style={{
  //                   fontWeight: "bold",
  //                   color: "var(--secondary_3)",
  //                   textDecoration: "underline",
  //                 }}
  //                 // Hack to close popover form when register is clicked.
  //                 onClick={() => {
  //                   document.body.click();
  //                 }}
  //               >
  //                 Register here
  //               </span>
  //             </NavLink>
  //           </p>
  //         </Form.Group>

  //         <Form.Group className="mb-3" controlId="formSubmit">
  //           <Button
  //             type="submit"
  //             className="btn primary-button w-100"
  //             style={{ marginLeft: "0px" }}
  //           >
  //             Submit
  //           </Button>
  //         </Form.Group>
  //       </Form>
  //     </Popover.Body>
  //   </Popover>
  // );

  return (
    <header className="header">
      <div className="inner_header">
        <div className="logo_container">
          {/* <Link to={'/'} onClick={() => setShowCounselors(false)}> */}
          <NavLink to={ROUTES.HOME}>
            <img
              id="img-logo"
              src={require("../../assets/images/logo.svg").default}
              // title is for hovering.
              title={company.name}
              alt={company.name}
              style={{ width: "90%" }}
            />
          </NavLink>
        </div>

        <div className="button_container">
          <NavLink to={ROUTES.MAIN}>
            <button type="button" className="btn secondary-button">
              FIND A COUNSELOR
            </button>
          </NavLink>
          {/* <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={popoverForm}
            rootClose
          >
            <button type="button" className="btn primary-button">
              SIGN IN
            </button>
          </OverlayTrigger> */}
          {!auth.isLoggedIn && (
            <NavLink to={ROUTES.LOGIN}>
              <button type="button" className="btn primary-button">
                SIGN IN
              </button>
            </NavLink>
          )}
          {auth.isLoggedIn && (
            <button
              onClick={auth.logout}
              type="button"
              className="btn primary-button"
            >
              LOGOUT
            </button>
          )}
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
          {auth.isLoggedIn && (
            <li>
              <NavLink to={ROUTES.ADMIN}>ADMIN</NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <NavLink to={ROUTES.USERLIST}>USERS</NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
