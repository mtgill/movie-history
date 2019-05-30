import firebase from 'firebase/app';
import 'firebase/auth';

import movies from '../../components/movies/movies';


const authDiv = document.getElementById('auth');
const movieDiv = document.getElementById('movies');
const movieNavbar = document.getElementById('navbar-button-movie-history');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.error(user.uid);
      authDiv.classList.add('hide');
      movieDiv.classList.remove('hide');
      movieNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      movies.movieCardBuilder();
    } else {
      authDiv.classList.remove('hide');
      movieDiv.classList.add('hide');
      movieNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
