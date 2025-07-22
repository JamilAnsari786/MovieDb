import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Popular from './pages/popular';
import Toprated from './pages/toprated';
import Upcoming from './pages/upcoming';
import MovieDetailPage from './components/Moviedetailpage/MovieDetailPage';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <Router>
      <Navbar />

      {/* All Routes */}
      <Routes>
        <Route path="/" element={< Popular />} />
        <Route path="/top-rated" element={<Toprated />} />
        <Route path="/upcoming" element={< Upcoming />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
