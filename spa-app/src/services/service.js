import axios from "axios";

export const getFavorites = () => {
  const userId = localStorage.getItem("userId");
  return axios
    .get(`http://localhost:3001/user_cities?userId=${userId}`)
    .then(resp => resp.data);
};

export const getCity = id => {
  return axios
    .get(`http://localhost:3001/cities?id=${id}`)
    .then(resp => resp.data[0]);
};

export const getWeather = id => {
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${id}&APPID=2e94360d5dc4108fd55d9900df3287fb`
    )
    .then(resp => {
      let cityWeather = resp.data;
      cityWeather.list.length = 12;
      return cityWeather;
    });
};
