import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {

  var slideImages = [
    "quote-WeArePhare", "hero", "quote-Awesome", "couple", "quote-Mentors", "student", "quote-Appointment", "face"
  ]

  return (
    <div id="homeContainer" className="container pb-5">
      <div className="row">
        <div className="col" id="slideShowColumn">
          {/* <img src={require("../assets/images/hero.jpg").default} /> */}
          <div class="carousel slide" data-bs-ride="carousel" id="slideShow">
            <div class="carousel-inner">
              {slideImages.map(eachFile=>{ 
                return(
                  <div  className={eachFile==="quote-WeArePhare"?"carousel-item active":"carousel-item "} key={`${eachFile}img`}>
                    <img className={eachFile.startsWith("quote-") ? "carouselQuotePic d-block mx-auto" : "carouselPic d-block mx-auto"} 
                    width={eachFile.startsWith("quote-") ? "100%" : "auto"}
                    height="100%"
                    margin="auto"
                    src={require(`../assets/images/${eachFile}.jpg`).default}
                    // className="d-block mx-auto" 
                    // style={eachFile.startsWith("quote-") ? { height: "auto", width: "auto" } : { maxHeight: "100%", width: "auto" }}
                    alt="..."/>
                  </div>
                );
              })}
            </div>
          </div>
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
        className="container" id="missionStatement"
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <h3>
          <b>
            We believe that mental health care service should be available for
            everyone. Let us find the{" "}
            <span style={{ color: "var(--secondary_1)" }}>right</span> counselor
            for you!
          </b>
        </h3>
      </div>

      <div className="container" id="letsGoButton">
        <Link to={ROUTES.MAIN}>
          <button className="btn btn-lg primary-button px-3 py-2">
            Let's go!
          </button>
        </Link>
      </div>
    </div>
  );
}
