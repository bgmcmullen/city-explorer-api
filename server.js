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
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

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

class Movie {
    constructor(title, overview, vote_average, vote_count, popularity, release_date){
    this.title = title;
    this.overview = overview;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.popularity = popularity;
    this.release_date = release_date;
  }
}

app.get('/weather', async (request, response) => {
      // Extract query parameters: lat, lon, and searchQuery
      const {lat, lon, searchQuery} = request.query;

    const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`)




    response.send({weather: new Forecast(weatherResponse.data.data[0].datetime, weatherResponse.data.data[0].app_temp, weatherResponse.data.data[0].weather.description)});
  })

  app.get('/movies', async (request, response) => {
    // Extract query parameters: lat, lon, and searchQuery
let city;
let forecastArray = [];
    const {lat, lon, searchQuery} = request.query;



  const movieReponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`);

  console.log(movieReponse.data.results);

  let moviesArray = movieReponse.data.results.map(element => new Movie(element.title, element.overview, element.vote_average , element.vote_count, element.popularity, element.release_date));

 

  response.send({
    movies: moviesArray});
})

app.listen(PORT, () => {
  console.log('App is listening!!');
});