import Axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserMovies = () => new Promise((resolve, reject) => {
  Axios.get(`${firebaseUrl}/userMovie.json`)
    .then((results) => {
      const userMovieResults = results.data;
      const userMovies = [];
      Object.keys(userMovieResults).forEach((userMovieId) => {
        userMovieResults[userMovieId].id = userMovieId;
        userMovies.push(userMovieResults[userMovieId]);
      });
      // console.error(userMovies);
      resolve(userMovies);
    })
    .catch(err => reject(err));
});

const addUserMovie = userMovieObject => Axios.post(`${firebaseUrl}/userMovie.json`, userMovieObject);

const deleteUserMovie = movieId => Axios.delete(`${firebaseUrl}/userMovie/${movieId}.json`);

export default { addUserMovie, getUserMovies, deleteUserMovie };
