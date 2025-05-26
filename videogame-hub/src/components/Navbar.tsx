import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Video Game Hub</h1>
      <ul className="navbar-links">
        <li><Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/search" className={pathname === '/search' ? 'active' : ''}>Search</Link></li>
        <li><Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
        <li><Link to="/profile" className={pathname === '/profile' ? 'active' : ''}>Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; 