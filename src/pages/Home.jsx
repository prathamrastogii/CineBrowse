import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
import SortBar from "../components/SortBar";
import MovieDialog from "../components/MovieDialog";
import MovieSlider from "../components/MovieSlider";

// const getDecade = (date) =>
//           Math.floor(new Date(date).getFullYear() / 10) * 10;

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedMovie(null);
    setIsDialogOpen(false);
  };

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      console.log(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []); // it re-runs whenever the data inside the []array changes

  const handleSearch = async (e) => {
    e.preventDefault(); //prevents the default behaviour of resetting the search bar
    if (!searchQuery.trim()) {
      //makes sure that if input is empty then return
      loadPopularMovies();
      return;
    }
    if (loading) return; // return when already searching

    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("failed to search movies...");
    } finally {
      setLoading(false);
    }

    // setSearchQuery("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, 1000); // 500 ms delay

    return () => clearTimeout(timer); // clears timeout after typing done
  }, [searchQuery]);

  useEffect(() => {
    const performSearch = async () => {
      if (!debounceQuery.trim()) {
        loadPopularMovies();
        return;
      }

      setLoading(true);
      try {
        const searchResults = await searchMovies(debounceQuery);
        setMovies(searchResults);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("failed to search movies");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debounceQuery]);

  // sorting logic
  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortOption) {
      case "popularity":
        return b.popularity - a.popularity;
      case "vote":
        return b.vote_count - a.vote_count;
      case "year-desc":
        return new Date(b.release_date) - new Date(a.release_date);
      case "year-asc":
        return new Date(a.release_date) - new Date(b.release_date);
      case "rating":
        return b.vote_average - a.vote_average;
      default:
        return 0;
    }
  });

  // const categorizeMoviesByRating = (movies) => {
  //   return {
  //     good: movies.filter((movie) => movie.vote_average >= 8),
  //     average: movies.filter(
  //       (movie) => movie.vote_average >= 5 && movie.vote_average < 8
  //     ),
  //     poor: movies.filter((movie) => movie.vote_average < 5),
  //   };
  // };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <SortBar sortOption={sortOption} onSortChange={setSortOption}></SortBar>

      {error && <div className="error-message">{error};</div>}

      {!loading && !searchQuery && (
        <div className="recommendations-section">
          <MovieSlider
            title="Top Recommendations ⭐️"
            movies={
              sortedMovies
                .filter((movie) => movie.vote_average > 0)
                .sort((a, b) => b.vote_average - a.vote_average)
                .slice(0, 15) // show top 15 rated movies
            }
          />
        </div>
      )}

      {loading ? (
        <div className="loading">loading...</div>
      ) : (
        <div className="movies-grid">
          {sortedMovies.map(
            (
              movie //filters movies according to the search text and rerenders the whole UI
            ) => (
              <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                <MovieCard movie={movie} key={movie.id} />
              </div>
            )
          )}
        </div>
      )}

      {isDialogOpen && selectedMovie && (
        <MovieDialog
          movie={selectedMovie}
          onClose={closeDialog}
          isOpen={isDialogOpen}
        />
      )}
    </div>
  );
}

export default Home;
