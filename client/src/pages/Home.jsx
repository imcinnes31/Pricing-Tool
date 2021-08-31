import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{width:'560px', height:'340px'}}>
          <img src={require("../assets/images/hero.jpg").default} />
        </div>

        <div className="col">
          <h1 className="vertical-center">
            <b>
              Affordable Mental Health for{" "}
              <span style={{ color: "var(--secondary_1)" }}>Everyone.</span>
            </b>
          </h1>
        </div>
      </div>

      <div
        className="container"
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <h3 className="horizontal-center">
          <b>
            We believe that mental health care service should be available for
            everyone. Let us find the{" "}
            <span style={{ color: "var(--secondary_1)" }}>right</span> counselor
            for you!
          </b>
        </h3>
      </div>

      <div className="container">
        <Link to={ROUTES.MAIN}>
          <button className="btn primary-button horizontal-center px-3 py-2">
            Let's go!
          </button>
        </Link>
      </div>
    </div>
  );
}
