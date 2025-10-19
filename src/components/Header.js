import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../auth/AuthContext';

function Header() {
  const { isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand / Logo */}
        <div className="brand">
          <Link to="/" className="logo">
            <span className="wrench">🔧</span> AutoFix Pro
          </Link>
        </div>

        {/* Navigation */}
        <nav className="main-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>

          {isAdmin ? (
            <>
              <NavLink to="/admin/bookings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>View Bookings</NavLink>
              <NavLink to="/admin/contacts" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>View Messages</NavLink>
              <NavLink to="/admin/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>View MechanicServices</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/booking" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Book</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
            </>
          )}
        </nav>

        {/* Authentication Actions */}
        <div className="auth-actions">
          {isAuthenticated ? (
            <>
              <button className="btn small orange" onClick={() => navigate(isAdmin ? '/admin/bookings' : '/booking')}>Dashboard</button>
              <button className="btn small outline" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn small orange">Login</Link>
              <Link to="/signup" className="btn small signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
