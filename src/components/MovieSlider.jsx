import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import "../css/MovieSlider.css";

const MovieSlider = ({ title, movies, colorClass }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      // scrollBy -> function for scrolling
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="movie-slider">
      <div className="slider-header">
        <div className={`slider-indicator ${colorClass}`}></div>
        <h2 className="slider-title">{title}</h2>
      </div>

      <div className="slider-container">
        <button className="scroll-btn scroll-left" onClick={scrollLeft}>
          ←
        </button>

        {/* track sliding */}
        <div className="slider-track" ref={sliderRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="slider-item">
              <MovieCard movie={movie}/>
            </div>
          ))}
        </div>

        <button className="scroll-btn scroll-right" onClick={scrollRight}>
          →
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
