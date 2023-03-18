import axios from "axios";

const API_key = "c704f6fc7c1f4dcc436973235c0e428c";
export const fetchDataWeather = async (query) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_key}&lang=vi`
  );
  return data;
};
