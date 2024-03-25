'use strict';

const dotenv = require('dotenv');
// import express from 'express';
const express = require('express'); // built in function for code running in the Node runtime.
const cors = require('cors');

// import weather from file
const weather = require('./data/weather.json');

dotenv.config();
const PORT = process.env.PORT;

const app = express(); // create our express app, now we are ready to define some functionality.
app.use(cors()); // activates cross-origin-resource-sharing. allow other origins (besides localhost to make request to this code).

app.get('/', (request, response) => {
response.send("Hello world!")
})

class Forecast {
  constructor(date, description){
    this.date = date;
    this.description = description;
  }
}

app.get('/weather', (request, response) => {
      // Extract query parameters: lat, lon, and searchQuery
  let city;
  let forecastArray = [];
      const {lat, lon, searchQuery} = request.query;
  if(searchQuery)
    city = weather.find((element) => element.city_name === searchQuery);
  if(lat)
    city = weather.find((element) => element.lat === lat);
  if(lon)
    city = weather.find((element) => element.lon === lon);

    forecastArray= city.data.map((element) => {
      return new Forecast(element.datetime, element.weather.description);
    }) 

  if(city === undefined){
    throw new Error('Invalid City');
  }

    response.send(forecastArray);
  })

app.listen(PORT, () => {
  console.log('App is listening!!');
});