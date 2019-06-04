import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import ratingsData from '../../helpers/data/ratingsData';
import watchlist from '../watchlist/watchlist';
import userMoviesData from '../../helpers/data/userMovieData';
import movieData from '../../helpers/data/movieData';

const showRatedMovies = () => {
  getRatedMovies(); // eslint-disable-line no-use-before-define
  document.getElementById('movies').classList.add('hide');
  document.getElementById('watchlist').classList.add('hide');
  document.getElementById('show-watchlist-button').classList.add('hide');
  document.getElementById('rated-movies').classList.remove('hide');
  document.getElementById('show-form-button').classList.add('hide');
};

const getRatedMovies = () => {
  const { uid } = firebase.auth().currentUser;
  let domString = '';
  domString += '<h2><u>Rated Movies</u></h2>';
  userMoviesData.getUserMovies(uid)
    .then((userMovies) => {
      userMovies.forEach((userMovie) => {
        domString += '<div class="container">';
        domString += '<div class="row">';
        if (userMovie.rating !== 0) {
          movieData.getMoviesByUid()
            .then((movies) => {
              const matchingMovies = movies.filter(movie => movie.id === userMovie.movieId);
              matchingMovies.forEach((matchingMovie) => {
                domString += '<div id="movie-card" class=" d-flex col-sm-12 col-md-6 col-lg-3 card-group">';
                domString += '<div class="card movie-card">';
                domString += `<div id="${userMovie.movieId}">`;
                domString += `<h4>${matchingMovie.title}</h4>`;
                domString += `<img src="${matchingMovie.imageUrl}" class="img-fluid movie-image" alt="movie photo" />`;
                domString += `<h4>Rating: ${userMovie.rating}</h4>`;
                domString += '</div>';
                domString += '</div>';
                domString += '</div>';
              });
              domString += '</div>';
              domString += '</div>';
              util.printToDom('rated-movies', domString);
            })
            .catch(err => console.error('watchlist empty', err));
        }
      });
    })
    .catch(err => console.error('watchlist empty', err));
};


const setRating = (e) => {
  const { uid } = firebase.auth().currentUser;
  // e.preventDefault();
  const targetId = e.target.id.split('.')[1];
  if (e.target.classList.contains('ratingButton')) {
    const newUserMovie = {
      uid: firebase.auth().currentUser.uid,
      movieId: e.target.id.split('.')[1],
      isWatched: true,
      rating: 5,
    };
    userMoviesData.getUserMovies(uid)
      .then((userMovies) => {
        userMovies.forEach((userMovie) => {
          if (userMovie.movieId === targetId) {
            ratingsData.editByRating(userMovie.id, newUserMovie)
              .then(() => {
                document.getElementById(`rating.${targetId}`).classList.add('hide');
                document.getElementById(`watchlist.${targetId}`).classList.add('hide');
                watchlist.getWatchList();
              });
          } else {
            ratingsData.addRating(newUserMovie)
              .then(() => {
                document.getElementById(`rating.${targetId}`).classList.add('hide');
                document.getElementById(`watchlist.${targetId}`).classList.add('hide');
                watchlist.getWatchList();
              });
          }
        });
      });
  }
};

const ratingButtonEvents = () => {
  document.getElementById('movies').addEventListener('click', setRating);
  document.getElementById('rated-movies-button').addEventListener('click', showRatedMovies);
};

export default { ratingButtonEvents };
