import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_NEWS_KEY;

const CATEGORIES = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];

function NewsApp() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(() => localStorage.getItem('newsCategory') || 'general');
  const [query, setQuery] = useState('');

  const fetchNews = async (cat, q) => {
    setLoading(true);
    setError(null);
    setArticles([]);
    try {
      const url = q
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=12&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&pageSize=12&apiKey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setArticles(data.articles.filter((a) => a.title && a.title !== '[Removed]'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category, '');
  }, [category]);

  const handleSearch = () => {
    if (query.trim()) fetchNews(category, query);
  };

  const timeAgo = (dateStr) => {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="page">
      <h1>News App</h1>

      {/* Search */}
      <div className="weather-search" style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="text-input"
          style={{ marginBottom: 0, width: '260px' }}
        />
        <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>Search</button>
        {query && (
          <button className="btn btn-danger" onClick={() => { setQuery(''); fetchNews(category, ''); }}>Clear</button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="news-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`news-tab ${category === cat && !query ? 'news-tab-active' : ''}`}
            onClick={() => { setQuery(''); setCategory(cat); localStorage.setItem('newsCategory', cat); }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="api-status">Loading news...</p>}
      {error && <p className="api-status api-error">{error}</p>}

      {/* News Grid */}
      <div className="news-grid">
        {articles.map((article, i) => (
          <a key={i} href={article.url} target="_blank" rel="noreferrer" className="news-card">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="news-img" />
            )}
            <div className="news-body">
              <span className="news-source">{article.source.name}</span>
              <p className="news-title">{article.title}</p>
              {article.description && (
                <p className="news-desc">{article.description}</p>
              )}
              <span className="news-time">{article.publishedAt ? timeAgo(article.publishedAt) : ''}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default NewsApp;
