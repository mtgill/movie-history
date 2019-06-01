import userMoviesArray from '../../helpers/data/userMovieData';
import movieData from '../../helpers/data/movieData';
import util from '../../helpers/util';


const getWatchList = () => {
  let domString = '';
  // util.printToDom('watchlist', '');
  domString += '<h2><u>Watchlist</u></h2>';
  userMoviesArray.getUserMovies()
    .then((userMovies) => {
      // console.error('user movies', userMovies);
      userMovies.forEach((userMovie) => {
        if (userMovie.isWatched === true) {
          movieData.getMoviesByUid()
            .then((movies) => {
              const matchingMovies = movies.filter(movie => movie.id === userMovie.movieId);
              matchingMovies.forEach((matchingMovie) => {
                domString += '<div>';
                domString += `<h4>${matchingMovie.title}</h4>`;
                domString += '</div>';
              });
              // console.error('matching movies', matchingMovies);
              util.printToDom('watchlist', domString);
            })
            .catch(err => console.error('watchlist empty', err));
        }
      });
      // util.printToDom('watchlist', domString);
    })
    .catch(err => console.error('watchlist empty', err));
};

export default { getWatchList };
