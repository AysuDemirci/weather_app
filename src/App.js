import React, { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import { Col, Container, Row } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import DateForecast from "./Components/DateForecast";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [tempUnit, setTempUnit] = useState("metric");
  const [selected, setSelected] = useState();
  const [hourlyWeather, setHourlyWeather] = useState({});

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

  function groupHourlyWeatherByDay(hourlyWeather) {
    const groupedData = {};
    hourlyWeather.forEach((weatherData) => {
      const date = weatherData.dt_txt.split(" ")[0];

      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(weatherData);
    });
    return groupedData;
  }

  const handleClick = async () => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=a14e7ab880c601d7c8d6ecea90cf71f5`;
    const baseUrlForecats = `https://api.openweathermap.org/data/2.5/forecast?&appid=a14e7ab880c601d7c8d6ecea90cf71f5`;

    await axios
      .get(baseUrl, { params: { q: city, units: tempUnit } })
      .then(async (data) => {
        setWeatherInfo(data.data);
      })
      .catch((err) => console.log("hata sebebi: ", err));
    await axios
      .get(baseUrlForecats, { params: { q: city, units: tempUnit } })
      .then(async (data) => {
        const groupedData = groupHourlyWeatherByDay(data.data.list);

        setHourlyWeather(groupedData);
      })
      .catch((err) => console.log("hata sebebi: ", err));

    setIsActive(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=a14e7ab880c601d7c8d6ecea90cf71f5`;

        const response = await axios.get(baseUrl, {
          params: { q: city, units: tempUnit },
        });
        setWeatherInfo(response.data);
      } catch (error) {
        console.log("hata sebebi: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app-div">
      <Row>
        <nav className="app-nav">
          <Container>
            <Col md="11" className="app-col">
              <ul className="app-ul">
                <li>
                  <h3 className="header-style">Weather App</h3>
                </li>
                <li className="app-li">
                  <ul className="app-li-ul">
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
                          onClick={() => {
                            handleClick();
                          }}
                          className="weather-city-btn"
                        >
                          <FaSearch className="app-search-icon" />
                        </button>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="app-unit-div">
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
                      <li className="app-unit-li">
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
          <DateForecast
            isActive={isActive}
            tempUnit={tempUnit}
            city={city}
            handleUnitsChange={handleUnitsChange}
            hourlyWeather={hourlyWeather}
          />
        </Container>
      </Row>
    </div>
  );
}
