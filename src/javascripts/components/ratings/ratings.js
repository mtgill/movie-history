import firebase from 'firebase/app';
import 'firebase/auth';

import ratingsData from '../../helpers/data/ratingsData';

const setRating = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('ratingButton')) {
    const newUserMovie = {
      uid: firebase.auth().currentUser.uid,
      movieId: e.target.id,
      isWatched: true,
      rating: 5,
    };
    ratingsData.addRating(newUserMovie);
  }
};

const ratingButtonEvents = () => {
  document.getElementById('movies').addEventListener('click', setRating);
};

export default { ratingButtonEvents };
