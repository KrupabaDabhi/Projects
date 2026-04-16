import { useState } from 'react';

const API_KEY = import.meta.env.VITE_OMDB_KEY;

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [lastQuery, setLastQuery] = useState('');

  const searchMovies = async (p = 1, q = query) => {
    if (!q.trim()) return;
    setLoading(true); setError(null); setMovies([]); setSelected(null);
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(q)}&page=${p}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Response === 'False') throw new Error(data.Error);
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
      setPage(p); setLastQuery(q);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const fetchDetail = async (imdbID) => {
    setDetailLoading(true); setSelected(null);
    try {
      const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      setSelected(await res.json());
    } catch { } finally { setDetailLoading(false); }
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="page">
      <h1>Movie Search</h1>
      <div className="weather-search">
        <input type="text" placeholder="Search movies..." value={query}
          onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchMovies(1)}
          className="text-input" style={{ marginBottom: 0, width: '260px' }} />
        <button className="btn btn-primary" onClick={() => searchMovies(1)} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="api-status api-error">{error}</p>}

      {(selected || detailLoading) && (
        <div className="movie-modal-overlay" onClick={() => setSelected(null)}>
          <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
            {detailLoading ? <p className="api-status">Loading...</p> : selected && (
              <>
                <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
                <div className="modal-content">
                  <img src={selected.Poster !== 'N/A' ? selected.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'} alt={selected.Title} className="modal-poster" />
                  <div className="modal-info">
                    <h2>{selected.Title} <span className="movie-year">({selected.Year})</span></h2>
                    <p><strong>Genre:</strong> {selected.Genre}</p>
                    <p><strong>Director:</strong> {selected.Director}</p>
                    <p><strong>Actors:</strong> {selected.Actors}</p>
                    <p><strong>Rating:</strong> ⭐ {selected.imdbRating} / 10</p>
                    <p><strong>Runtime:</strong> {selected.Runtime}</p>
                    <p><strong>Language:</strong> {selected.Language}</p>
                    <p className="modal-plot">{selected.Plot}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card" onClick={() => fetchDetail(movie.imdbID)}>
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'} alt={movie.Title} className="movie-poster" />
            <div className="movie-info">
              <p className="movie-title">{movie.Title}</p>
              <p className="movie-year">{movie.Year}</p>
              <span className="movie-type">{movie.Type}</span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="btn btn-primary" onClick={() => searchMovies(page - 1, lastQuery)} disabled={page === 1}>← Prev</button>
          <span className="page-info">Page {page} of {totalPages} ({totalResults} results)</span>
          <button className="btn btn-primary" onClick={() => searchMovies(page + 1, lastQuery)} disabled={page === totalPages}>Next →</button>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
