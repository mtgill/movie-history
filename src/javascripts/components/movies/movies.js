import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const deleteMovieEvent = (e) => {
  const movieId = e.target.id.split('.')[1];
  movieData.deleteMovie(movieId)
    .then(() => movieCardBuilder()) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const showMoviesDiv = () => {
  document.getElementById('movies').classList.remove('hide');
  document.getElementById('watchlist').classList.add('hide');
  document.getElementById('show-watchlist-button').classList.remove('hide');
  document.getElementById('show-movies-button').classList.add('hide');
  document.getElementById('show-form-button').classList.remove('hide');
};

const movieEvents = () => {
  const deleteButtons = document.getElementsByClassName('deleteButton');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteMovieEvent);
  }
  document.getElementById('show-movies-button').addEventListener('click', showMoviesDiv);
};

const movieCardBuilder = () => {
  movieData.getMoviesByUid()
    .then((movies) => {
      let domString = '';
      domString += '<div class="container">';
      domString += '<div class="row">';
      movies.forEach((movie) => {
        domString += '<div id="movie-card" class=" d-flex col-sm-12 col-md-6 col-lg-3 card-group">';
        domString += '<div class="card movie-card">';
        domString += `<h3 class="card-title">${movie.title}</h3>`;
        domString += `<img src="${movie.imageUrl}" class="img-fluid movie-image" alt="movie photo" />`;
        domString += `<button id="watchlist.${movie.id}" class="btn btn-info watchlistButton">Add To Watchlist</button>`;
        domString += `<button id="rating.${movie.id}" class="btn btn-warning ratingButton">Rate This Movie</button>`;
        domString += `<button id="delete.${movie.id}" class="btn btn-danger deleteButton">Delete</button>`;
        domString += `<h4 class="card-info">MPAA Rating: ${movie.movieRating}</h4>`;
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
      domString += '</div>';
      util.printToDom('movies', domString);
      movieEvents();
    })
    .catch(err => console.error('movie not found', err));
};

const createMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    title: document.getElementById('new-movie-title').value,
    movieRating: document.getElementById('new-mpaa-rating').value,
    imageUrl: document.getElementById('new-movie-image').value,
  };
  movieData.addNewMovie(newMovie)
    .then(() => {
      document.getElementById('new-movie-title').value = '';
      document.getElementById('new-mpaa-rating').value = '';
      document.getElementById('new-movie-image').value = '';
      document.getElementById('new-movie').classList.add('hide');
      document.getElementById('movies').classList.remove('hide');
      document.getElementById('add-movies-div').classList.remove('hide');
      movieCardBuilder();
    })
    .catch(err => console.error('no new movies', err));
};

const newMovieButton = () => {
  // document.getElementById('movie-card').classList.add('hide');
  document.getElementById('add-movies-div').classList.add('hide');
  document.getElementById('movies').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('add-movie-button').addEventListener('click', createMovie);
};

const showAddMovie = () => {
  const domString = '<button id="show-form-button" class="btn btn-danger">Add Movies</button>';
  util.printToDom('movies', domString);
  document.getElementById('show-form-button').addEventListener('click', newMovieButton);
};

export default { movieCardBuilder, showAddMovie, movieEvents };
