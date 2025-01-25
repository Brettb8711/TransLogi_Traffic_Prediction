const axios = require('axios');
const { WEATHER_API_KEY } = process.env;

exports.getWeatherData = async (location) => {
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/forecast.json?key=${API_key}&q=${location}`;
    const response = await axios.get(weatherAPIUrl);
    return response.data;
};