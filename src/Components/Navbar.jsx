import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext.jsx';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Check authentication status on component mount
  // Removed isLoggedIn logic, now using user from context

  // Function to handle logout
  const handleLogout = async () => {
    await authApi.logout();
    setUser(null);
    navigate('/');
  };

  // Function to handle sign up/login redirect
  const handleAuthRedirect = () => {
    navigate('/signup');
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Logo Section */}
        <Link to="/" className="nav-brand">
          <span className="material-symbols-outlined logo">all_match</span>
          <div className="brand-text">
            <h3>Certify</h3>
            <h5>Academic Validation</h5>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          <li className="nav-item">
            <Link to="/verifi-page" className="nav-link">
              <span className="material-symbols-outlined">verified</span>
              Verify Certificate
            </Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link to="/insertrecord" className="nav-link">
                Insert Record
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              <span className="material-symbols-outlined">info</span>
              About
            </Link>
          </li>
          
          {/* Show additional menu items when logged in */}
          {user && (
            <>
             
              
            </>
          )}
        </ul>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Search */}
          <div className={`search-container ${isSearchOpen ? 'search-active' : ''}`}>
            <input
              type="search"
              placeholder="Quick Search..."
              className="search-input"
            />
            <button
              className="search-toggle"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          {/* Conditional Authentication Button */}
          {!user ? (
            <button
              className="submit-btn"
              onClick={handleAuthRedirect}
            >
              <span className="material-symbols-outlined">upload</span>
              <span className="submit-text">SignUp / LogIn</span>
              <span className="submit-text-short">Submit</span>
            </button>
          ) : (
            <div className="user-menu">
              <div className="user-info">
                <span className="material-symbols-outlined user-avatar">account_circle</span>
                <span className="user-name">{user.username}</span>
              </div>
              <button className="submit-btn" onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span>
                <span className="submit-text">Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`hamburger ${isMenuOpen ? 'hamburger-active' : ''}`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}
    </nav>
  );
}