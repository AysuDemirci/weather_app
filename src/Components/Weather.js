import React from "react";
import { Col, Container, Row } from "reactstrap";
import { FaCloudSun, FaCompass } from "react-icons/fa";
import { IoRainy, IoThunderstorm } from "react-icons/io5";
import { IoIosSunny, IoIosCloudy } from "react-icons/io";
import { BsCloudsFill, BsFillCloudFog2Fill } from "react-icons/bs";
import { GiSnowing, GiSunrise, GiSunset } from "react-icons/gi";
import { MdCompress, MdVisibility } from "react-icons/md";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import LineChart from "./LineChart";

export default function Weather(props) {
  const { weatherInfo, isActive, tempUnit, hourlyWeather, mappedTemp } = props;

  const date = new Date().toLocaleDateString();
  function getWindDirection(degrees) {
    if (degrees >= 337.5 || degrees < 22.5) {
      return "N";
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return "NE";
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return "E";
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return "SE";
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return "S";
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return "SW";
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return "W";
    } else if (degrees >= 292.5 && degrees < 337.5) {
      return "NW";
    }
  }

  console.log(weatherInfo);
  return (
    <div>
      <Container>
        <br />
        <br />

        <div className="weather-div">
          {isActive ? (
            <div>
              <Row>
                <Col
                  md="9"
                  className="weather-col"
                  style={{
                    color:
                      weatherInfo.weather[0].main === "Haze" ||
                      weatherInfo.weather[0].main === "Snow" ||
                      weatherInfo.weather[0].main === "Fog" ||
                      weatherInfo.weather[0].description === "overcast clouds"
                        ? "black"
                        : "white",
                    borderColor:
                      weatherInfo.weather[0].main === "Haze" ||
                      weatherInfo.weather[0].main === "Snow" ||
                      weatherInfo.weather[0].description ===
                        "overcast clouds" ||
                      weatherInfo.weather[0].main === "Fog"
                        ? "black"
                        : "white",

                    backgroundImage:
                      weatherInfo.weather[0].description === "broken clouds" ||
                      weatherInfo.weather[0].description ===
                        "scattered clouds" ||
                      weatherInfo.weather[0].description === "few clouds"
                        ? 'url("../images/scatteredClouds.jpg") '
                        : weatherInfo.weather[0].main === "Rain"
                        ? 'url("../images/rainyDay.jpg") '
                        : weatherInfo.weather[0].main === "Haze" ||
                          weatherInfo.weather[0].main === "Fog"
                        ? 'url("../images/foggyDay.jpg") '
                        : weatherInfo.weather[0].main === "Clear"
                        ? 'url("../images/clearSky.jpg") '
                        : weatherInfo.weather[0].main === "Snow"
                        ? 'url("../images/snowyDay.jpg") '
                        : weatherInfo.weather[0].description ===
                          "overcast clouds"
                        ? 'url("../images/clouds.jpg") '
                        : weatherInfo.weather[0].main === "Thunderstorm"
                        ? 'url("../images/thunderstorm.jpg") '
                        : null,
                  }}
                >
                  <Row>
                    <Col md="6" style={{ padding: "15px 0px 0px 40px" }}>
                      <p className="weather-col-p">
                        {weatherInfo.name},{weatherInfo.sys.country}
                      </p>
                    </Col>
                    <Col
                      md="6"
                      className="weather-date-col"
                      style={{
                        marginTop: "20px",
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      <p className="weather-date-p">{date}</p>
                    </Col>
                  </Row>

                  <Col style={{ padding: "10px 20px 0px 30px" }}>
                    <Row>
                      <Col md="1">
                        <div>
                          {weatherInfo.weather[0].description ===
                            "broken clouds" ||
                          weatherInfo.weather[0].description ===
                            "scattered clouds" ||
                          weatherInfo.weather[0].description ===
                            "few clouds" ? (
                            <FaCloudSun className="weather-icons" />
                          ) : weatherInfo.weather[0].description ===
                              "shower rain" ||
                            weatherInfo.weather[0].description ===
                              "moderate rain" ||
                            weatherInfo.weather[0].description ===
                              "light rain" ||
                            weatherInfo.weather[0].description ===
                              "heavy intensity rain" ? (
                            <IoRainy className="weather-icons" />
                          ) : weatherInfo.weather[0].description ===
                            "overcast clouds" ? (
                            <BsCloudsFill className="weather-icons" />
                          ) : weatherInfo.weather[0].description ===
                            "clear sky" ? (
                            <IoIosSunny
                              className="weather-icons"
                              style={{ color: "orange" }}
                            />
                          ) : weatherInfo.weather[0].description === "haze" ||
                            weatherInfo.weather[0].description === "fog" ? (
                            <BsFillCloudFog2Fill className="weather-icons" />
                          ) : weatherInfo.weather[0].description ===
                            "light snow" ? (
                            <GiSnowing className="weather-icons" />
                          ) : weatherInfo.weather[0].description ===
                              "thunderstorm" ||
                            weatherInfo.weather[0].description ===
                              "thunderstorm with light rain" ? (
                            <IoThunderstorm className="weather-icons" />
                          ) : null}
                        </div>
                      </Col>

                      <Col md="4">
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
                      </Col>

                      <Col md="7">
                        <div>
                          <ul className="weather-temp-ul">
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
                            <li>
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
                      </Col>

                      <div
                        className="weather-realfeel-div"
                        style={{ marginTop: "-25px" }}
                      >
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
                      <div className="weather-desc">
                        {weatherInfo.weather[0].description[0].toUpperCase() +
                          weatherInfo.weather[0].description.substring(1)}
                      </div>
                    </Row>
                  </Col>
                  <br />
                  <br />

                  <Row>
                    <Col className="weather-desc-col">
                      <Row>
                        <Col md="4" className="weather-bottom-col">
                          <table className="weather-table">
                            <tbody>
                              <tr className="weather-tr">
                                <td>
                                  <MdCompress className="weather-description-icons" />{" "}
                                  Pressure
                                </td>
                                <td>{weatherInfo.main.pressure}</td>
                              </tr>
                              <tr className="weather-tr">
                                <td>
                                  <WiHumidity className="weather-description-icons" />{" "}
                                  Humidty
                                </td>
                                <td>{weatherInfo.main.humidity}%</td>
                              </tr>
                              <tr>
                                <td>
                                  <IoIosCloudy className="weather-description-icons" />{" "}
                                  Cloud Cover
                                </td>
                                <td>{weatherInfo.clouds.all}%</td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                        <Col md="6" className="weather-bottom-col">
                          <table className="weather-table">
                            <tbody>
                              <tr className="weather-tr">
                                <td>
                                  <GiSunrise className="weather-description-icons" />{" "}
                                  Sunrise
                                </td>
                                <td>
                                  {new Date(
                                    (weatherInfo.sys.sunrise +
                                      weatherInfo.timezone) *
                                      1000
                                  ).toLocaleTimeString("en-US", {
                                    timeZone: "GMT",
                                  })}
                                </td>
                                <td>
                                  <GiSunset className="weather-description-icons" />{" "}
                                  Sunset
                                </td>
                                <td>
                                  {new Date(
                                    (weatherInfo.sys.sunset +
                                      weatherInfo.timezone) *
                                      1000
                                  ).toLocaleTimeString("en-US", {
                                    timeZone: "GMT",
                                  })}
                                </td>
                              </tr>
                              <tr className="weather-tr">
                                <td>
                                  <MdVisibility className="weather-description-icons" />{" "}
                                  Visibility
                                </td>
                                <td>{weatherInfo.visibility}</td>
                              </tr>
                              <tr className="weather-tr">
                                <td>
                                  <FaCompass className="weather-description-icons" />{" "}
                                  Wind Degree
                                </td>
                                <td>
                                  <td>
                                    {getWindDirection(weatherInfo.wind.deg)}
                                  </td>
                                  
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <WiStrongWind className="weather-description-icons" />
                                  Wind Speed
                                </td>
                                <td>
                                  {tempUnit === "metric" ? (
                                    <td>{weatherInfo.wind.speed}km/s</td>
                                  ) : (
                                    <td>{weatherInfo.wind.speed}mp/s</td>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <br />
                        </Col>

                        <Col style={{ marginTop: "30px" }}>
                          <LineChart
                            isActive={isActive}
                            hourlyWeather={hourlyWeather}
                            mappedTemp={mappedTemp}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <br />
                  </Row>
                </Col>
              </Row>
              <br />
            </div>
          ) : null}
        </div>
        <br />
      </Container>
    </div>
  );
}
