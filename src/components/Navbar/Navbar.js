import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import useStoreSettings from "../../hooks/useStoreSettings";
import { logout } from "../../store/slices/authSlice";
import { categoryAPI } from "../../utils/api";
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ _id: "", name: "ALL" });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const accountRef = useRef(null);
  const categoryRef = useRef(null);
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { storeName, storeDescription, settings } = useStoreSettings();
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.length;
  const navigate = useNavigate();

  const storeSubtitle = storeDescription || "Supplements & Vitamins";
  const brandIcon =
    settings?.brandIcon ||
    (typeof storeName === "string"
      ? storeName
          .replace(/[^a-zA-Z0-9 ]/g, " ")
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0]?.toUpperCase())
          .join("")
      : "HY") ||
    "HY";

  useEffect(() => {
    categoryAPI.getAll()
      .then((res) => setCategories(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    if (isCategoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCategoryOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set("search", searchQuery.trim());
      if (selectedCategory._id) params.set("category", selectedCategory._id);
      navigate(`/products?${params.toString()}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleAccount = () => {
    setIsAccountOpen((prev) => !prev);
  };

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setIsAccountOpen(false);
      }
    };

    if (isAccountOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isAccountOpen]);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-top">
          <div className="navbar-left">
            <Link to="/" className="brand">
              <div className="brand-logo">
                <span className="brand-icon">{brandIcon}</span>
              </div>
              <div className="brand-text">
                <span className="brand-title">{storeName}</span>
                <span className="brand-subtitle">{storeSubtitle}</span>
              </div>
            </Link>
          </div>

          <div className="navbar-center">
            <form onSubmit={handleSearch} className="search-bar">
              <div className="search-category" ref={categoryRef}>
                <button
                  type="button"
                  className="category-button"
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                >
                  <span>{selectedCategory.name}</span>
                  <span className="category-arrow">▾</span>
                </button>
                {isCategoryOpen && (
                  <div className="category-dropdown">
                    <button
                      type="button"
                      className={`category-option${!selectedCategory._id ? " active" : ""}`}
                      onClick={() => { setSelectedCategory({ _id: "", name: "ALL" }); setIsCategoryOpen(false); }}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        type="button"
                        className={`category-option${selectedCategory._id === cat._id ? " active" : ""}`}
                        onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-icon-button">
                <FaSearch />
              </button>
            </form>
          </div>

          <div className="navbar-right">
            <Link to="/cart" className="icon-button cart-button">
              <FaShoppingCart />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>

            <div className="account-wrapper" ref={accountRef}>
              <button
                type="button"
                className="icon-button account-button"
                onClick={toggleAccount}
              >
                <FaUser />
              </button>

              <div
                className={`account-dropdown ${
                  isAccountOpen ? "account-dropdown-open" : ""
                }`}
              >
                {isAuthenticated ? (
                  <div className="account-authenticated">
                    <span className="account-greeting">Hi, {user?.name}</span>
                    <Link to="/profile" className="dropdown-link">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="dropdown-link">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="account-actions">
                    <Link to="/login" className="account-btn primary">
                      Sign in
                    </Link>
                    <Link to="/signup" className="account-btn secondary">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <button className="mobile-menu-button" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div className="navbar-bottom">
          <div className="nav-links">
            <Link to="/products?category=proteins" className="nav-item">
              PROTEINS
            </Link>
            <Link to="/products?category=weight-management" className="nav-item">
              WEIGHT MANAGEMENT
            </Link>
            <Link to="/products?category=pre-post-workout" className="nav-item">
              PRE-POST WORKOUT
            </Link>
            <Link to="/products?category=workout-essentials" className="nav-item">
              WORKOUT ESSENTIALS
            </Link>
            <Link to="/products?category=offer-zone" className="nav-item">
              OFFER ZONE
            </Link>
            <Link to="/blog" className="nav-item">
              BLOG
            </Link>
          </div>
        </div>

        {/* Mobile slide-out menu reusing bottom links */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-header">
            <span className="mobile-brand">{storeName}</span>
            <button className="close-menu" onClick={toggleMenu}>
              <FaTimes />
            </button>
          </div>
          <div className="mobile-search">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-button">
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="mobile-nav-links">
            <Link
              to="/products?category=proteins"
              className="mobile-nav-link"
              onClick={toggleMenu}
            >
              Proteins
            </Link>
            <Link
              to="/products?category=weight-management"
              className="mobile-nav-link"
              onClick={toggleMenu}
            >
              Weight Management
            </Link>
            <Link
              to="/products?category=pre-post-workout"
              className="mobile-nav-link"
              onClick={toggleMenu}
            >
              Pre-Post Workout
            </Link>
            <Link
              to="/products?category=workout-essentials"
              className="mobile-nav-link"
              onClick={toggleMenu}
            >
              Workout Essentials
            </Link>
            <Link
              to="/products?category=offer-zone"
              className="mobile-nav-link"
              onClick={toggleMenu}
            >
              Offer Zone
            </Link>
            <Link to="/blog" className="mobile-nav-link" onClick={toggleMenu}>
              Blog
            </Link>
          </div>
          <div className="mobile-actions">
            <Link to="/cart" className="mobile-cart" onClick={toggleMenu}>
              <FaShoppingCart />
              <span>Cart ({itemCount})</span>
            </Link>
            {isAuthenticated ? (
              <div className="mobile-user">
                <span className="mobile-user-name">Hi, {user?.name}</span>
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
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary mobile-btn"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
