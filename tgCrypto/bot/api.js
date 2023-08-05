const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://localhost:5001/',
});

const getWeatherForecast = async () => {
    const { data } = await instance.get();
    return data.list;
};

module.exports = {
    getWeatherForecast,
};