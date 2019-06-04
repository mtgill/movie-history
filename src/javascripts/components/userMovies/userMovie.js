import firebase from 'firebase/app';
import 'firebase/auth';

import watchlist from '../watchlist/watchlist';
import userMovieData from '../../helpers/data/userMovieData';

const createUserMovie = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('watchlistButton')) {
    const newUserMovie = {
      uid: firebase.auth().currentUser.uid,
      movieId: e.target.id.split('.')[1],
      isWatched: false,
      rating: 0,
    };
    userMovieData.addUserMovie(newUserMovie)
      .then(() => {
        watchlist.getWatchList();
        document.getElementById(`${e.target.id}`).classList.add('hide');
      })
      .catch(err => console.error('movie not added', err));
  }
};

const userMovieEvent = () => {
  document.getElementById('movies').addEventListener('click', createUserMovie);
};

export default { userMovieEvent };
