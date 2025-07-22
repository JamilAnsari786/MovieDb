import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
        );
        setSuggestions(res.data.results.slice(0, 5)); // show top 5
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(delay);
  }, [query]);

  const handleSelectMovie = (movieId) => {
    setQuery("");
    setSuggestions([]);
    navigate(`/movie/${movieId}`);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
      setSuggestions([]);
    }
  };

  return (
    <div className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <h3>MovieDb</h3>
      </div>

      <div className="pages">
        <ul className="page">
          <li onClick={() => navigate("/")}>Popular</li>
          <li onClick={() => navigate("/top-rated")}>Top Rated</li>
          <li onClick={() => navigate("/upcoming")}>Upcoming</li>
        </ul>

        <div className="search">
          <input
            type="text"
            placeholder="Movie Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          {/* 🔽 Suggestions Dropdown */}
          {query.trim() !== "" && (
            <ul className="suggestions">
              {suggestions.length > 0 ? (
                suggestions.map((movie) => (
                  <li
                    key={movie.id}
                    onClick={() => handleSelectMovie(movie.id)}
                    className="suggestion-item"
                  >
                    {movie.title}
                  </li>
                ))
              ) : (
                <li className="suggestion-item no-result">No movies found</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
