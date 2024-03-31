'use strict';
const axios = require('axios');

// import database
const db = require('./db.js');

const dotenv = require('dotenv');
// import express from 'express';
const express = require('express'); // built in function for code running in the Node runtime.
const cors = require('cors');

// import weather from file
const weather = require('./data/weather.json');

const handleGetWeather = require('./handleGetWeather');

const handleGetMovies = require('./handleGetMovies');

dotenv.config();
const PORT = process.env.PORT;

const app = express(); // create our express app, now we are ready to define some functionality.
app.use(cors()); // activates cross-origin-resource-sharing. allow other origins (besides localhost to make request to this code).

app.get('/', (request, response) => {
response.send('Hello World!');
})


app.get('/weather', handleGetWeather);

app.get('/movies', handleGetMovies);

app.listen(PORT, () => {
  console.log('App is listening!!');
});