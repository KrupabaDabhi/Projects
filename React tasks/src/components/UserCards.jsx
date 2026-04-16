import { useState, useEffect } from 'react';
import SkeletonCard from './Skeleton';

function UserCards() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => { setUsers(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.company.name.toLowerCase().includes(search.toLowerCase()) ||
    u.address.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Users <span className="todo-badge">API</span></h1>
      <p style={{ color: '#888', marginBottom: '16px' }}>Fetched from jsonplaceholder.typicode.com</p>

      {!loading && !error && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by name, company or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-input"
            style={{ width: '300px', marginBottom: 0 }}
          />
        </div>
      )}

      {loading && (
        <div className="card-grid">
          {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}
      {error && <p className="api-status api-error">Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="card-grid">
            {filtered.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-avatar">{user.name.charAt(0)}</div>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-username">@{user.username}</p>
                <div className="user-details">
                  <p><span className="detail-icon">✉</span> {user.email}</p>
                  <p><span className="detail-icon">📞</span> {user.phone}</p>
                  <p><span className="detail-icon">🌐</span> {user.website}</p>
                  <p><span className="detail-icon">🏢</span> {user.company.name}</p>
                  <p><span className="detail-icon">📍</span> {user.address.city}</p>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p className="todo-empty">No users match your search.</p>}
        </>
      )}
    </div>
  );
}

export default UserCards;
