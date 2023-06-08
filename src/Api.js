import axios from "axios";

const API_KEY = `a14e7ab880c601d7c8d6ecea90cf71f5`;
const BASE_URL = `https://api.openweathermap.org/data/2.5`;

const getWeatherData = async (city, tempUnit) => {
  const url = `${BASE_URL}/weather?&appid=${API_KEY}&q=${city}&units=${tempUnit}`;
  const response = await axios.get(url);
  return response.data;
};

const getForecastData = async (city, tempUnit) => {
  const url = `${BASE_URL}/forecast?&appid=${API_KEY}&q=${city}&units=${tempUnit}`;
  const response = await axios.get(url);
  return response.data;
};

export { getWeatherData, getForecastData };
