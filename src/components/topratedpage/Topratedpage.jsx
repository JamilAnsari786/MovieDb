import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Topratedpage.css"; // Reusing the same CSS

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
    const fetchTopRated = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTopRated();
  }, []);

  return (
    <div className="popular-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-rating">Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedPage;
