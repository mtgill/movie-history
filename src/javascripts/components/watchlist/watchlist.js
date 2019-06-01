import userMoviesArray from '../../helpers/data/userMovieData';
import movieData from '../../helpers/data/movieData';
import util from '../../helpers/util';

// modify axios call so that it only pull userMovies when isWatched is false
const getWatchList = () => {
  let domString = '';
  domString += '<h2><u>Watchlist</u></h2>';
  userMoviesArray.getUserMovies()
    .then((userMovies) => {
      userMovies.forEach((userMovie) => {
        if (userMovie.isWatched === false) {
          movieData.getMoviesByUid()
            .then((movies) => {
              const matchingMovies = movies.filter(movie => movie.id === userMovie.movieId);
              matchingMovies.forEach((matchingMovie) => {
                domString += '<div>';
                domString += `<h4>${matchingMovie.title}</h4>`;
                domString += '</div>';
              });
              util.printToDom('watchlist', domString);
            })
            .catch(err => console.error('watchlist empty', err));
        }
      });
    })
    .catch(err => console.error('watchlist empty', err));
};

export default { getWatchList };
