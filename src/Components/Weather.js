import React, { useState } from "react";
import axios from "axios";
import { Col, Container, Input } from "reactstrap";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isActive, setIsActive] = useState(false);

  function handleChange(e) {
    setCity(e.target.value);
  }

  const handleClick = async () => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=a14e7ab880c601d7c8d6ecea90cf71f5&units=metric`;

    await axios
      .get(baseUrl, { params: { q: city } })
      .then(async (data) => {
        setWeatherInfo(data.data);
      })
      .catch((err) => console.log("hata sebebi: ", err));
    setIsActive(true);
  };

  return (
    <div>
      <Container>
        <br />
        <div>
          <div className="form">
            <center>
              <Col md="5">
                <Input
                  value={city}
                  className="weather-input"
                  type="text"
                  placeholder="Enter City Name"
                  onChange={handleChange}
                />
                <div>
                  <button onClick={handleClick}>Get Data of City</button>
                </div>
              </Col>
            </center>
          </div>

          {isActive ? (
            <div>
              <br />
              <center>
                <p style={{ fontSize: "40px" }}>
                  {weatherInfo.name},{weatherInfo.sys.country}
                </p>
                <p>Temperature : {weatherInfo.main.temp.toFixed(0)}°C</p>
                <p>
                  Felt Temperature : {weatherInfo.main.feels_like.toFixed(0)}°C
                </p>
                <p>
                  Weather Condition :
                  {weatherInfo.weather[0].description[0].toUpperCase() +
                    weatherInfo.weather[0].description.substring(1)}
                </p>
              </center>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
