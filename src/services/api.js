const API_KEY = "bfc9e3ed106e2fd51e59475123c7e2e0";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  //async bcoz calling an api is an asynchronous operation and it is gonna take its own time -> await
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
