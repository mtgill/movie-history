import firebase from 'firebase/app';
import 'firebase/auth';

import watchlist from '../watchlist/watchlist';
import userMovieData from '../../helpers/data/userMovieData';

const createUserMovie = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('watchlistButton')) {
    const newUserMovie = {
      uid: firebase.auth().currentUser.uid,
      movieId: e.target.id,
      isWatched: true,
      rating: 0,
    };
    userMovieData.addUserMovie(newUserMovie);
    watchlist.getWatchList();
  }
};

const watchlistEvent = () => {
  document.getElementById('movies').addEventListener('click', createUserMovie);
};

export default { watchlistEvent };
