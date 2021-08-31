import React from "react";
import { ABOUT_US_DATA } from "../constants/aboutUsData";

export default function About() {
  return (
    <div className="container">
      <div className="container  border-bottom">
        <h1>About Us</h1>
      </div>

      <br />

      <div className="container">
        <p>{ABOUT_US_DATA}</p>
      </div>
    </div>
  );
}
