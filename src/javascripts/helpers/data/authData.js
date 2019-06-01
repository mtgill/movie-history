import firebase from 'firebase/app';
import 'firebase/auth';

import movies from '../../components/movies/movies';
import userMovies from '../../components/userMovies/userMovie';
import watchlist from '../../components/watchlist/watchlist';


const authDiv = document.getElementById('auth');
const movieDiv = document.getElementById('movies');
const movieNavbar = document.getElementById('navbar-button-movie-history');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const addMovieDiv = document.getElementById('add-movies-div');

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
      userMovies.watchlistEvent();
      watchlist.getWatchList();
    } else {
      authDiv.classList.remove('hide');
      movieDiv.classList.add('hide');
      movieNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      addMovieDiv.classList.add('hide');
      // document.getElementById('movie-card').classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
