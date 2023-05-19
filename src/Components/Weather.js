import React from "react";
import { Col, Container, Row } from "reactstrap";
import { FaCloudSun } from "react-icons/fa";

export default function Weather(props) {
  const { weatherInfo, isActive, tempUnit } = props;

  const date = new Date().toLocaleDateString();
  return (
    <div>
      <Container>
        <br />
        <br />
        <div className="weather-div">
          <Row>
            <Col md="9" className="weather-col">
              {isActive ? (
                <div>
                  <Row>
                    <Col style={{ padding: "10px 0px 0px 30px" }}>
                      <p style={{ fontSize: "35px" }}>
                        {weatherInfo.name},{weatherInfo.sys.country}
                      </p>
                    </Col>
                    <Col style={{ marginTop: "20px", marginLeft: "65%" }}>
                      <p style={{ fontSize: "20px", fontWeight: "600" }}>
                        {date}
                      </p>
                    </Col>
                  </Row>

                  <Col style={{ padding: "10px 0px 0px 20px" }}>
                    <Row>
                      <ul
                        style={{
                          display: "flex",
                          listStyle: "none",
                          gap: "20px",
                        }}
                      >
                        <li>
                          <div>
                            {weatherInfo.weather[0].description ===
                            "broken clouds" ? (
                              <p>{<FaCloudSun className="weather-icons" />}</p>
                            ) : null}
                          </div>
                        </li>
                        <li>
                          <div>
                            {tempUnit === "metric" ? (
                              <p className="temp-style">
                                {weatherInfo.main.temp.toFixed(0)}°C
                              </p>
                            ) : (
                              <p className="temp-style">
                                {weatherInfo.main.temp.toFixed(0)}°F
                              </p>
                            )}
                          </div>
                        </li>
                        <li style={{ marginLeft: "65%" }}>
                          <div>
                            <ul
                              style={{
                                listStyle: "none",
                                display: "flex",
                                gap: "20%",
                              }}
                            >
                              <li>
                                <p>
                                  Day
                                  {tempUnit === "metric" ? (
                                    <p className="weather-day-night">
                                      {weatherInfo.main.temp_max.toFixed(0)}°C
                                    </p>
                                  ) : (
                                    <p className="weather-day-night">
                                      {weatherInfo.main.temp_max.toFixed(0)}°F
                                    </p>
                                  )}
                                </p>
                              </li>
                              <li style={{ marginTop: "0px" }}>
                                <p>
                                  Night
                                  {tempUnit === "metric" ? (
                                    <p className="weather-day-night">
                                      {weatherInfo.main.temp_min.toFixed(0)}°C
                                    </p>
                                  ) : (
                                    <p className="weather-day-night">
                                      {weatherInfo.main.temp_min.toFixed(0)}°F
                                    </p>
                                  )}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>

                      <div style={{ marginTop: "-25px" }}>
                        Real Feel
                        {tempUnit === "metric" ? (
                          <p className="weather-day-night">
                            {weatherInfo.main.feels_like.toFixed(0)}°C
                          </p>
                        ) : (
                          <p className="weather-day-night">
                            {weatherInfo.main.feels_like.toFixed(0)}°F
                          </p>
                        )}
                      </div>
                      <div style={{ fontSize: "22px" }}>
                        {weatherInfo.weather[0].description[0].toUpperCase() +
                          weatherInfo.weather[0].description.substring(1)}
                      </div>
                    </Row>
                  </Col>

                  <br />
                </div>
              ) : null}
            </Col>
          </Row>
          <br />
        </div>
      </Container>
    </div>
  );
}
