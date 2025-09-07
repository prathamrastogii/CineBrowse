import React from "react";
import "../css/MovieDialog.css";

function MovieDialog({ isOpen, onClose, movie }) {
  if (!isOpen || !movie) return null;

  const handleOvelayClick = (e) => {
    if(e.target === e.currentTarget){
        onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleOvelayClick}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {/* stops closing the dialog when click inside the box */}

        <button className="dialog-close" onClick={onClose}>
          ❌
        </button>
        
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="dialog-poster"
        />

        <div className="dialog-info">
        <h2>{movie.title}</h2>
        <p>
          <strong>Release Date: </strong>
          {movie.release_date}
        </p>
        <p>
          <strong>Rating: </strong>
          {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
        </p>
        <p>{movie.overview}</p>
      </div>
    </div>
    </div>
  );
}

export default MovieDialog;
