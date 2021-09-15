import React from "react";
import { ABOUT_US_DATA1, ABOUT_US_DATA2 } from "../constants/aboutUsData";
import { Container, Row, Col } from "react-bootstrap";
export default function About() {
  return (
    <Container>
      <Row className="row-spacing">
        <h1 className="text-center display-3">Our Story</h1>
      </Row>
      <Row className="row-spacing">
        <Col className="col-4">
          <h1 className="vertical-center">
            <b>
              Phare is a
              <span style={{ color: "var(--secondary_1)" }}> community</span>, a
              <span style={{ color: "var(--secondary_2)" }}> mission</span>, and
              a<span style={{ color: "var(--secondary_3)" }}> revolution</span>.
            </b>
          </h1>
        </Col>

        <Col className="col-4">
          <h4 className="horizontal-center">{ABOUT_US_DATA1}</h4>
        </Col>
        <Col className="col-4">
          <h4 className="horizontal-center">{ABOUT_US_DATA2}</h4>
        </Col>
      </Row>
      <Row className="row-spacing">
        <h1 className="text-center display-3">Our Values</h1>
      </Row>
      <Row className="row-spacing">
        <Col className="col-6">
          <h2 className="text-center">
            <b><span style={{ color: "var(--secondary_1)" }}>Sustainability</span></b>
          </h2>
          <h4 className="horizontal-center">
            We believe in creating something that’s great for today and every
            day after.
          </h4>
        </Col>
        <Col className="col-6">
          <h2 className="text-center">
            <b><span style={{ color: "var(--secondary_1)" }}>Fairness</span></b>
          </h2>
          <h4 className="horizontal-center">
            Be reasonable, be honest, and be inclusive.{" "}
          </h4>
        </Col>
      </Row>
      <Row className="row-spacing">
        <Col className="col-6">
          <h2 className="text-center">
            <b><span style={{ color: "var(--secondary_1)" }}>Generosity</span></b>
          </h2>
          <h4 className="horizontal-center">
            Take care of yourself and take care of each other.
          </h4>
        </Col>
        <Col className="col-6">
          <h2 className="text-center">
            <b><span style={{ color: "var(--secondary_1)" }}>Equality</span></b>
          </h2>
          <h4 className="horizontal-center">
            Whatever walk of life you come from, we're here for you. Our
            priority is to always make space for everyone
          </h4>
        </Col>
      </Row>
    </Container>
  );
}
