import userMoviesData from '../../helpers/data/userMovieData';
import movieData from '../../helpers/data/movieData';
import util from '../../helpers/util';

const deleteUserMovieEvent = (e) => {
  const movieId = e.target.id;
  userMoviesData.deleteUserMovie(movieId)
    .then(() => getWatchList()) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const watchlistEvents = () => {
  const watchlistDeleteButtons = document.getElementsByClassName('watchlist-delete');
  for (let i = 0; i < watchlistDeleteButtons.length; i += 1) {
    watchlistDeleteButtons[i].addEventListener('click', deleteUserMovieEvent);
  }
};

// modify axios call so that it only pull userMovies when isWatched is false
const getWatchList = () => {
  let domString = '';
  domString += '<h2><u>Watchlist</u></h2>';
  userMoviesData.getUserMovies()
    .then((userMovies) => {
      userMovies.forEach((userMovie) => {
        if (userMovie.isWatched === false) {
          movieData.getMoviesByUid()
            .then((movies) => {
              const matchingMovies = movies.filter(movie => movie.id === userMovie.movieId);
              matchingMovies.forEach((matchingMovie) => {
                domString += '<div>';
                domString += `<h4>${matchingMovie.title}</h4>`;
                domString += `<button id="${userMovie.id}" class="btn btn-outline-success watchlist-rate">Rate</button>`;
                domString += `<button id="${userMovie.id}" class="btn btn-outline-dark watchlist-delete">Remove</button>`;
                domString += '</div>';
              });
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
