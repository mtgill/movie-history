import firebase from 'firebase/app';
import 'firebase/auth';

import ratingsData from '../../helpers/data/ratingsData';
import watchlist from '../watchlist/watchlist';
import userMoviesData from '../../helpers/data/userMovieData';

const setRating = (e) => {
  e.preventDefault();
  const targetId = e.target.id.split('.')[1];
  if (e.target.classList.contains('ratingButton')) {
    const newUserMovie = {
      uid: firebase.auth().currentUser.uid,
      movieId: e.target.id.split('.')[1],
      isWatched: true,
      rating: 5,
    };
    userMoviesData.getUserMovies()
      .then((userMovies) => {
        userMovies.forEach((userMovie) => {
          if (userMovie.movieId === targetId) {
            ratingsData.editByRating(userMovie.id, newUserMovie)
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
};

export default { ratingButtonEvents };
