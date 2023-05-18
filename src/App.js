import React from "react";
import Weather from "./Components/Weather";
import { Container, Row } from "reactstrap";

export default function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Row>
        <nav className="app-nav">
          <h3>Weather App</h3>
        </nav>
      </Row>
      <Row>
        <Container>
          <Weather />
        </Container>
      </Row>
    </div>
  );
}
