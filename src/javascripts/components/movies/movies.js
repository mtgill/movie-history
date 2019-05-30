import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const movieCardBuilder = () => {
  movieData.getMoviesByUid()
    .then((movies) => {
      let domString = '';
      movies.forEach((movie) => {
        domString += '<div class="col-sm-12 col-md-6 col-lg-4 card-group">';
        domString += '<div class="card">';
        domString += `<h3 class="card-title">${movie.title}</h3>`;
        domString += `<img src="${movie.imageUrl}" class="img-fluid movie-image" alt="movie photo" />`;
        domString += `<h6 class="card-info">MPAA Rating: ${movie.movieRating}</h6>`;
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('movies', domString);
    })
    .catch(err => console.error('movie not found', err));
};

export default { movieCardBuilder };
