import React from "react";
import { ABOUT_US_DATA1, ABOUT_US_DATA2 } from "../constants/aboutUsData";
import { Container, Row, Col } from "react-bootstrap";
export default function About() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <h1 className="vertical-center">
            <b>
              Phare is a
              <span style={{ color: "var(--secondary_1)" }}> community</span>, a
              <span style={{ color: "var(--secondary_2)" }}> mission</span>, and
              a<span style={{ color: "var(--secondary_3)" }}> revolution</span>.
            </b>
          </h1>
        </Col>

        <Col md={4}>
          <h4 className="horizontal-center">{ABOUT_US_DATA1}</h4>
        </Col>
        <Col md={4}>
          <h4 className="horizontal-center">{ABOUT_US_DATA2}</h4>
        </Col>
      </Row>

    </Container>
  );
}
