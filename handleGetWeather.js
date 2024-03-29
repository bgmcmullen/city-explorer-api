'use strict';

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


const WEATHER_API_KEY=process.env.WEATHER_API_KEY;

class Forecast {
  constructor(date, temperature, description){
    this.date = date;
    this.temperature = temperature;
    this.description = description;
  }
}

const handleGetWeather = async (request, response) => {
  // Extract query parameters: lat, lon, and searchQuery
  const {lat, lon, searchQuery} = request.query;

const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`)


response.send({weather: new Forecast(weatherResponse.data.data[0].datetime, weatherResponse.data.data[0].app_temp, weatherResponse.data.data[0].weather.description)});
}

module.exports = handleGetWeather;