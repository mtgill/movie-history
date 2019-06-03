import Axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addRating = userMovieObject => Axios.post(`${firebaseUrl}/userMovie.json`, userMovieObject);

export default { addRating };
