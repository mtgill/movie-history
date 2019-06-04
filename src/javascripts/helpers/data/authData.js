/* eslint-disable max-len */
import firebase from 'firebase/app';
import 'firebase/auth';

import movies from '../../components/movies/movies';
import userMovies from '../../components/userMovies/userMovie';
import watchlist from '../../components/watchlist/watchlist';
import ratings from '../../components/ratings/ratings';
import userMovieData from './userMovieData';


const authDiv = document.getElementById('auth');
const movieDiv = document.getElementById('movies');
const movieNavbar = document.getElementById('navbar-button-movie-history');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const addMovieDiv = document.getElementById('add-movies-div');

const checkButtonStatus = () => {
  const watchlistButtons = document.getElementsByClassName('watchlistButton');
  userMovieData.getUserMovies()
    .then((userMoviesArray) => {
      for (let i = 0; i < watchlistButtons.length; i += 1) {
        const buttonsToDisable = userMoviesArray.filter(userMovie => userMovie.movieId === watchlistButtons[i].id.split('.')[1]);
        buttonsToDisable.forEach((buttonToDisable) => {
          const buttonId = buttonToDisable.movieId;
          document.getElementById(`watchlist.${buttonId}`).classList.add('hide');
        });
      }
    });

  const ratingButtons = document.getElementsByClassName('ratingButton');
  userMovieData.getUserMovies()
    .then((userMoviesArray) => {
      for (let j = 0; j < ratingButtons.length; j += 1) {
        const buttonsToDisable = userMoviesArray.filter(userMovie => userMovie.movieId === ratingButtons[j].id.split('.')[1]);
        buttonsToDisable.forEach((buttonToDisable) => {
          const buttonId = buttonToDisable.movieId;
          document.getElementById(`rating.${buttonId}`).classList.add('hide');
        });
      }
    });
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      movieDiv.classList.remove('hide');
      movieNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      addMovieDiv.classList.remove('hide');
      movies.movieCardBuilder();
      movies.showAddMovie();
      watchlist.getWatchList();
      userMovies.userMovieEvent();
      ratings.ratingButtonEvents();
      checkButtonStatus();
    } else {
      authDiv.classList.remove('hide');
      movieDiv.classList.add('hide');
      movieNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      addMovieDiv.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
