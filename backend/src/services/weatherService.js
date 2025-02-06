const axios = require('axios');
const { WEATHER_API_KEY } = process.env;

exports.getWeatherData = async (location) => {
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(weatherAPIUrl);
    return response.data;
};