import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const movieCardBuilder = () => {
  movieData.getMoviesByUid()
    .then((movies) => {
      let domString = '';
      movies.forEach((movie) => {
        domString += '<div id="movie-card" class="col-sm-12 col-md-6 col-lg-3 card-group">';
        domString += '<div class="card movie-card">';
        domString += `<h3 class="card-title">${movie.title}</h3>`;
        domString += `<img src="${movie.imageUrl}" class="img-fluid movie-image" alt="movie photo" />`;
        domString += `<button id="${movie.id}" class="btn btn-info watchlistButton">Add To Watchlist</button>`;
        domString += `<button id="rate-${movie.id}-button" class="btn btn-warning">Rate This Movie</button>`;
        domString += `<h4 class="card-info">MPAA Rating: ${movie.movieRating}</h4>`;
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('movies', domString);
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
    })
    .catch(err => console.error('no new movies', err));
};

const newMovieButton = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('movie-card').classList.add('hide');
  document.getElementById('add-movies-div').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('add-movie-button').addEventListener('click', createMovie);
};

const showAddMovie = () => {
  const domString = '<button id="show-form-button" class="btn btn-danger">Add Movies</button>';
  util.printToDom('movies', domString);
  document.getElementById('show-form-button').addEventListener('click', newMovieButton);
};

export default { movieCardBuilder, showAddMovie };
