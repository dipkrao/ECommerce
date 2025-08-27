import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.length;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">PowerFuel</span>
          <span className="logo-subtitle">Supplements</span>
        </Link>

        <div className="navbar-search">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search supplements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="navbar-menu">
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/products?category=protein" className="nav-link">
            Protein
          </Link>
          <Link to="/products?category=pre-workout" className="nav-link">
            Pre-Workout
          </Link>
          <Link to="/products?category=vitamins" className="nav-link">
            Vitamins
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-button">
                <FaUser />
                <span className="user-name">{user?.name}</span>
              </button>
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          <button className="mobile-menu-button" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="mobile-logo">
            PowerFuel
          </Link>
          <button className="close-menu" onClick={toggleMenu}>
            <FaTimes />
          </button>
        </div>

        <div className="mobile-search">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search supplements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="mobile-nav-links">
          <Link to="/products" className="mobile-nav-link" onClick={toggleMenu}>
            All Products
          </Link>
          <Link
            to="/products?category=protein"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Protein
          </Link>
          <Link
            to="/products?category=pre-workout"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Pre-Workout
          </Link>
          <Link
            to="/products?category=vitamins"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Vitamins
          </Link>
          <Link
            to="/products?category=amino-acids"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Amino Acids
          </Link>
          <Link
            to="/products?category=creatine"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Creatine
          </Link>
        </div>

        <div className="mobile-actions">
          <Link to="/cart" className="mobile-cart" onClick={toggleMenu}>
            <FaShoppingCart />
            <span>Cart ({itemCount})</span>
          </Link>

          {isAuthenticated ? (
            <div className="mobile-user">
              <span className="mobile-user-name">Welcome, {user?.name}</span>
              <Link
                to="/profile"
                className="mobile-nav-link"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="mobile-logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mobile-auth">
              <Link
                to="/login"
                className="btn btn-outline mobile-btn"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary mobile-btn"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
