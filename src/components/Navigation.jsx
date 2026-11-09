import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getUserSavedArticles } = useArticles();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navClass = path => `nav-link ${location.pathname === path ? 'active' : ''}`;
  return <nav><div className="nav-container">
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <h1 className="nav-brand">NewsReader</h1>
      <div className="nav-links">
        <Link to="/" className={navClass('/')}>Home</Link>
        <Link to="/search" className={navClass('/search')}>Search</Link>
        {isAuthenticated() && <Link to="/saved" className={navClass('/saved')}>
          Saved Articles ({getUserSavedArticles().length})</Link>}
        {isAdmin() && <Link to="/admin" className={navClass('/admin')}>Admin</Link>}
      </div>
    </div>
    <div className="nav-user">{isAuthenticated() ? <>
      <span>{user.username} ({user.role}) </span>
      <button className="btn" onClick={() => { logout(); navigate('/'); }}>Logout</button>
    </> : <Link to="/login" className="nav-link">Login</Link>}</div>
  </div></nav>;
}
