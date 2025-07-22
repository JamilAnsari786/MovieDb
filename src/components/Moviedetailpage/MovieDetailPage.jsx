import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './moviedetailpage.css';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchDetails = async () => {
      const movieRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(movieRes.data);

      const castRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      setCast(castRes.data.cast.slice(0, 10)); // Show top 10 cast
    };

    fetchDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-container">
      {/* Movie Header Section */}
      <div className="movie-detail-banner">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Runtime:</strong> {movie.runtime} min</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* Cast Section */}
      <h3 className="cast-heading">Cast</h3>
      <div className="cast-grid">
        {cast.map((actor) => (
          <div key={actor.id} className="cast-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "https://via.placeholder.com/150x200?text=No+Image"
              }
              alt={actor.name}
            />
            <p className="actor-name">{actor.name}</p>
            <p className="actor-character">
              <strong>Character:</strong> {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;
