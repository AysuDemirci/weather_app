import React, { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import { Col, Container, Row } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import DateForecast from "./Components/DateForecast";
import { getWeatherData, getForecastData } from "./Api";

export default function App() {
  const [city, setCity] = useState("Ankara");
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

  const mappedTemp = Object.keys(hourlyWeather).map((date) => {
    const weatherDataList = hourlyWeather[date];

    const totalTemperature = weatherDataList.reduce(
      (sum, weatherData) => sum + weatherData.main.temp,
      0
    );
    const averageTemperature = totalTemperature / weatherDataList.length;
    return { date, averageTemperature };
  });

  const handleClick = async () => {
    try {
      const weatherData = await getWeatherData(city, tempUnit);
      setWeatherInfo(weatherData);
      const forecastData = await getForecastData(city, tempUnit);
      const groupedData = groupHourlyWeatherByDay(forecastData.list);
      setHourlyWeather(groupedData);
      setIsActive(true);
    } catch (error) {
      console.log("Hata Sebebi:", error);
    }
  };

  useEffect(() => {
    handleClick();
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
            hourlyWeather={hourlyWeather}
            mappedTemp={mappedTemp}
          />

          <DateForecast
            isActive={isActive}
            tempUnit={tempUnit}
            hourlyWeather={hourlyWeather}
            mappedTemp={mappedTemp}
          />
        </Container>
      </Row>
    </div>
  );
}
