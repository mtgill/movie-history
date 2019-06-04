import firebase from 'firebase/app';
import 'firebase/auth';

import userMoviesData from '../../helpers/data/userMovieData';
import movieData from '../../helpers/data/movieData';
import util from '../../helpers/util';
import ratingsData from '../../helpers/data/ratingsData';
// import movieBuilder from '../movies/movies';

const showWatchlist = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('watchlist').classList.remove('hide');
  document.getElementById('show-watchlist-button').classList.add('hide');
  document.getElementById('show-movies-button').classList.remove('hide');
  document.getElementById('show-form-button').classList.add('hide');
};

const deleteUserMovieEvent = (e) => {
  const movieId = e.target.id.split('.')[1];
  userMoviesData.deleteUserMovie(movieId)
    .then(() => {
      getWatchList(); // eslint-disable-line no-use-before-define
      document.getElementById(`watchlist.${e.target.closest('div').id}`).classList.remove('hide');
      document.getElementById(`rating.${e.target.closest('div').id}`).classList.remove('hide');
    })
    .catch(err => console.error('no deletion', err));
};

const rateWatchlistEvent = (e) => {
  const userMovieId = e.target.id.split('.')[1];
  const userMovie = {
    uid: firebase.auth().currentUser.uid,
    movieId: e.target.closest('div').id,
    isWatched: true,
    rating: 5,
  };
  ratingsData.editByRating(userMovieId, userMovie)
    .then(() => {
      document.getElementById(`${e.target.id}`).classList.add('hide');
      document.getElementById(`rating.${e.target.closest('div').id}`).classList.add('hide');
      getWatchList(); // eslint-disable-line no-use-before-define
    });
};

const watchlistEvents = () => {
  const watchlistDeleteButtons = document.getElementsByClassName('watchlist-delete');
  for (let i = 0; i < watchlistDeleteButtons.length; i += 1) {
    watchlistDeleteButtons[i].addEventListener('click', deleteUserMovieEvent);
  }
  const watchlistRateButtons = document.getElementsByClassName('watchlist-rate');
  for (let i = 0; i < watchlistRateButtons.length; i += 1) {
    watchlistRateButtons[i].addEventListener('click', rateWatchlistEvent);
  }

  document.getElementById('show-watchlist-button').addEventListener('click', showWatchlist);
};

// modify axios call so that it only pull userMovies when isWatched is false
const getWatchList = () => {
  let domString = '';
  domString += '<h2><u>Watchlist</u></h2>';
  userMoviesData.getUserMovies()
    .then((userMovies) => {
      userMovies.forEach((userMovie) => {
        domString += '<div class="container">';
        domString += '<div class="row">';
        if (userMovie.isWatched === false) {
          movieData.getMoviesByUid()
            .then((movies) => {
              const matchingMovies = movies.filter(movie => movie.id === userMovie.movieId);
              matchingMovies.forEach((matchingMovie) => {
                domString += '<div id="movie-card" class=" d-flex col-sm-12 col-md-6 col-lg-3 card-group">';
                domString += '<div class="card movie-card">';
                domString += `<div id="${userMovie.movieId}">`;
                domString += `<h4>${matchingMovie.title}</h4>`;
                domString += `<img src="${matchingMovie.imageUrl}" class="img-fluid movie-image" alt="movie photo" />`;
                domString += `<button id="watchlistRate.${userMovie.id}" class="btn btn-outline-success watchlist-rate">Rate</button>`;
                domString += `<button id="watchlistDelete.${userMovie.id}" class="btn btn-outline-dark watchlist-delete">Remove</button>`;
                domString += '</div>';
                domString += '</div>';
                domString += '</div>';
              });
              domString += '</div>';
              domString += '</div>';
              util.printToDom('watchlist', domString);
              watchlistEvents();
            })
            .catch(err => console.error('watchlist empty', err));
        }
      });
    })
    .catch(err => console.error('watchlist empty', err));
};

export default { getWatchList };
