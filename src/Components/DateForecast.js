import React from "react";
import { Col, Container } from "reactstrap";
import { FaCloudSun } from "react-icons/fa";
import { IoRainy, IoThunderstorm } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";
import { BsCloudsFill, BsFillCloudFog2Fill } from "react-icons/bs";
import { GiSnowing } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";

export default function DateForecast(props) {
  const { isActive, tempUnit, hourlyWeather, mappedTemp } = props;

  const getDescriptionMode = (weatherDataList, n) => {
    let maxCount = 0;
    let elemenHavingMaxFreq;
    for (let i = 0; i < n; i++) {
      let count = 0;
      for (let j = 0; j < n; j++) {
        if (weatherDataList[i] === weatherDataList[j]) {
          count++;
        }
        if (count > maxCount) {
          maxCount = count;
          elemenHavingMaxFreq = weatherDataList[i];
        }
      }
      return elemenHavingMaxFreq;
    }
  };

  const mappedDescriptions = Object.keys(hourlyWeather).reduce(
    (result, date) => {
      const weatherDataList = hourlyWeather[date];
      const modeDescription = getDescriptionMode(
        weatherDataList,
        weatherDataList.length
      );

      result.push({
        date,
        modeDescription,
      });

      return result;
    },
    []
  );

  return (
    <div>
      {isActive ? (
        <Container>
          <div>
            <Col
              md="9"
              style={{
                backgroundImage: 'url("../images/weather-in-the-drakensberg-at-champagne-castle-hotel.jpg") ',
              }}
              className="dateforecast-col"
            >
              <center>
                <ul className="dateforecast-head-ul">
                  <li>
                    {mappedTemp.map((weatherData) => (
                      <ul className="date-mappedtemp">
                        <li>
                          <Col className="date-style">
                            {
                              new Date(weatherData.date)
                                .toLocaleString()
                                .split(" ")[0]
                            }
                          </Col>
                        </li>
                        <li className="date-mapped-li">
                          <Col className="date-style">
                            {tempUnit === "metric" ? (
                              <p>
                                {weatherData.averageTemperature.toFixed(0)}°C
                              </p>
                            ) : (
                              <p>
                                {weatherData.averageTemperature.toFixed(0)}°F
                              </p>
                            )}
                          </Col>
                        </li>
                      </ul>
                    ))}
                  </li>
                  <li>
                    {mappedDescriptions.map((description) => (
                      <ul className="date-mappeddesc-ul">
                        <li className="date-mappeddesc-li">
                          <Col md="3">
                            {description.modeDescription.weather[0]
                              .description === "broken clouds" ||
                            description.modeDescription.weather[0]
                              .description === "scattered clouds" ||
                            description.modeDescription.weather[0]
                              .description === "few clouds" ? (
                              <FaCloudSun className="date-weather-icons" />
                            ) : description.modeDescription.weather[0]
                                .description === "shower rain" ||
                              description.modeDescription.weather[0]
                                .description === "moderate rain" ||
                              description.modeDescription.weather[0]
                                .description === "light rain" ||
                              description.modeDescription.weather[0]
                                .description === "heavy intensity rain" ? (
                              <IoRainy className="date-weather-icons" />
                            ) : description.modeDescription.weather[0]
                                .description === "overcast clouds" ? (
                              <BsCloudsFill className="date-weather-icons" />
                            ) : description.modeDescription.weather[0]
                                .description === "clear sky" ? (
                              <IoIosSunny
                                className="date-weather-icons"
                                style={{ color: "orange" }}
                              />
                            ) : description.modeDescription.weather[0]
                                .description === "haze" ||
                              description.modeDescription.weather[0]
                                .description ? (
                              <BsFillCloudFog2Fill className="date-weather-icons" />
                            ) : description.modeDescription.weather[0]
                                .description === "light snow" ? (
                              <GiSnowing className="date-weather-icons" />
                            ) : description.modeDescription.weather[0]
                                .description === "thunderstorm" ||
                              description.modeDescription.weather[0]
                                .description ===
                                "thunderstorm with light rain" ? (
                              <IoThunderstorm className="date-weather-icons" />
                            ) : null}
                          </Col>
                        </li>
                        <li>
                          <Col className="date-style">
                            {description.modeDescription.weather[0].description[0].toUpperCase() +
                              description.modeDescription.weather[0].description.substring(
                                1
                              )}
                          </Col>
                        </li>
                        <li>
                          <Col className="date-mappeddesc-li-col">
                            {description.modeDescription.main.humidity}
                            <WiHumidity className="date-weather-icons-humidity" />
                          </Col>
                        </li>
                      </ul>
                    ))}
                  </li>
                </ul>
              </center>
            </Col>
            <br />
          </div>
        </Container>
      ) : null}
    </div>
  );
}
