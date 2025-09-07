import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

const getRatingColor = (voteAverage) => {
  if (voteAverage < 5) return "red";
  if (voteAverage >= 5 && voteAverage < 8) return "yellow";
  return "green";
};

const getRatingCategory = (voteAverage) => {
  if (voteAverage < 5) return "Poor";
  if (voteAverage >= 5 && voteAverage < 8) return "Average";
  return "Good";
};

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
    // alert("Liked");
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title} </h3>
        <p>{movie.release_date}</p>

        {movie.vote_average && (
          <div className="rating-indicator">
            {/* color */}
            <span
              className={`rating-dot rating-${getRatingColor(
                movie.vote_average
              )}`}
            ></span>
            {/* actual rating no. */}
            <span>{movie.vote_average.toFixed(1)}</span>
            {/* rating category */}
            <span>({getRatingCategory(movie.vote_average)})</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
