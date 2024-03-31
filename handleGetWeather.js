'use strict';

const axios = require('axios');
const dotenv = require('dotenv');
const db = require('./db');
dotenv.config();


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

class Forecast {
  constructor(date, temperature, description) {
    this.date = date;
    this.temperature = temperature;
    this.description = description;
  }
}

const handleGetWeather = async (request, response) => {
  // Extract query parameters: lat, lon
  const { lat, lon, } = request.query;

  let weatherResponse = [];

  // check if information is in cache and is less than an hour old.
  if (db[lat + lon + 'weather'] && Date.now() < db[lat + lon + 'weather'].time + 3600000) {
    weatherResponse = db[lat + lon + 'weather'];
  } else {
    weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);

    db[lat + lon + 'weather'] = weatherResponse;
    db[lat + lon + 'weather'].time = Date.now();
  }



  response.send({ weather: new Forecast(weatherResponse.data.data[0].datetime, weatherResponse.data.data[0].app_temp, weatherResponse.data.data[0].weather.description) });
}

module.exports = handleGetWeather;