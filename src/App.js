import React, { useState } from "react";
import Weather from "./Components/Weather";
import { Col, Container, Row } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [tempUnit, setTempUnit] = useState("metric");
  const [selected, setSelected] = useState();
  function handleUnitsChange(value) {
    setTempUnit(value);
    handleClick();
  }

  function handleChange(e) {
    setCity(e.target.value);
  }

  function changeSelected(units) {
    setSelected(units);
  }

  const handleClick = async () => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=a14e7ab880c601d7c8d6ecea90cf71f5`;

    await axios
      .get(baseUrl, { params: { q: city, units: tempUnit } })
      .then(async (data) => {
        setWeatherInfo(data.data);
      })
      .catch((err) => console.log("hata sebebi: ", err));
    setIsActive(true);
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <Row>
        <nav className="app-nav">
          <Container>
            <Col md="11" style={{ float: "none", margin: "auto" }}>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                }}
              >
                <li>
                  <h3 style={{ marginTop: "5px" }}>Weather App</h3>
                </li>
                <li style={{ marginLeft: "47%" }}>
                  <ul
                    style={{ listStyle: "none", display: "flex", gap: "45px" }}
                  >
                    <li>
                      <div className="form">
                        <input
                          value={city}
                          className="app-weather-input"
                          type="text"
                          placeholder="Enter City Name"
                          onChange={handleChange}
                        />
                      </div>
                    </li>
                    <li>
                      <div>
                        <button
                          disabled={!city}
                          onClick={handleClick}
                          className="weather-city-btn"
                        >
                          <FaSearch style={{ marginTop: "-3px" }} />
                        </button>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div style={{ marginTop: "8px" }}>
                    <ul className="weather-units-ul">
                      <li>
                        <button
                          style={{
                            color: selected === "metric" ? "black" : "white",
                          }}
                          disabled={!city}
                          className="weather-units"
                          value="metric"
                          onClick={() => {
                            handleUnitsChange("metric");
                            changeSelected("metric");
                          }}
                        >
                          °C
                        </button>
                      </li>
                      <li style={{ marginTop: "4px" }}>
                        <strong>|</strong>
                      </li>
                      <li>
                        <button
                          disabled={!city}
                          style={{
                            color: selected === "imperial" ? "black" : "white",
                          }}
                          className="weather-units"
                          value="imperial"
                          onClick={() => {
                            handleUnitsChange("imperial");
                            changeSelected("imperial");
                          }}
                        >
                          °F
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </Col>
          </Container>
        </nav>
      </Row>
      <Row>
        <Container>
          <Weather
            weatherInfo={weatherInfo}
            isActive={isActive}
            tempUnit={tempUnit}
            city={city}
            handleUnitsChange={handleUnitsChange}
          />
        </Container>
      </Row>
    </div>
  );
}
