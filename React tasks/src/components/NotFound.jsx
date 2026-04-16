import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page not-found">
      <p className="not-found-code">404</p>
      <h2>Page Not Found</h2>
      <p style={{ color: '#888', marginBottom: '24px' }}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>Go Home</Link>
    </div>
  );
}

export default NotFound;
