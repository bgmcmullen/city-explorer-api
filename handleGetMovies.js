'use strict';

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

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

const handleGetMovies = async (request, response) => {
  // Extract query parameters: lat, lon, and searchQuery
  const {searchQuery} = request.query;



const movieReponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`);


let moviesArray = movieReponse.data.results.map(element => new Movie(element.title, element.overview, element.vote_average , element.vote_count, element.popularity, element.release_date));

response.send({
  movies: moviesArray});
}

module.exports = handleGetMovies;