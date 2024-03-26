'use strict';
const axios = require('axios');

const dotenv = require('dotenv');
// import express from 'express';
const express = require('express'); // built in function for code running in the Node runtime.
const cors = require('cors');

// import weather from file
const weather = require('./data/weather.json');

dotenv.config();
const PORT = process.env.PORT;
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;

const app = express(); // create our express app, now we are ready to define some functionality.
app.use(cors()); // activates cross-origin-resource-sharing. allow other origins (besides localhost to make request to this code).

app.get('/', (request, response) => {
response.send("Hello world!")
})

class Forecast {
  constructor(date, temperature, description){
    this.date = date;
    this.temperature = temperature;
    this.description = description;
  }
}

app.get('/weather', async (request, response) => {
      // Extract query parameters: lat, lon, and searchQuery
  let city;
  let forecastArray = [];
      const {lat, lon, searchQuery} = request.query;
  // if(lat)
  //   city = weather.find((element) => element.lat === lat);
  // if(lon)
  //   city = weather.find((element) => element.lon=== lon);
  // if(searchQuery)
  //   city = weather.find((element) => element.city_name === searchQuery);
    const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`)

    console.log(weatherResponse.data.data[0].datetime, weatherResponse.data.data[0].weather, weatherResponse.data.data[0].app_temp);


  // if(city === undefined){
  //   throw new Error('Invalid City');
  // }

    response.send(new Forecast(weatherResponse.data.data[0].datetime, weatherResponse.data.data[0].app_temp, weatherResponse.data.data[0].weather.description));
  })

app.listen(PORT, () => {
  console.log('App is listening!!');
});