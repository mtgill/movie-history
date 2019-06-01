import firebase from 'firebase/app';
import 'firebase/auth';

// import util from '../../helpers/util';
import userMovieData from '../../helpers/data/userMovieData';
import movieData from '../../helpers/data/movieData';

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
    movieData.getMoviesByUid()
      .then((movies) => {
        const matchingMovie = movies.filter(movie => movie.id === newUserMovie.movieId);
        console.error(matchingMovie[0].title);
      })
      .catch(err => console.error('no new movies', err));
  }
};

const watchlistEvent = () => {
  document.getElementById('movies').addEventListener('click', createUserMovie);
};

export default { watchlistEvent };
