import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import { productAPI, categoryAPI } from "../../utils/api";
import "./Products.css";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const productsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search") || "";

    setSelectedCategory(category);
    setSearchQuery(search);
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsResponse, categoriesResponse] = await Promise.all([
        productAPI.getAll({ limit: 100 }),
        categoryAPI.getAll(),
      ]);

      setProducts(productsResponse.data.products || []);
      setCategories(categoriesResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category && product.category._id === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (product.category &&
            product.category.name &&
            product.category.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, searchQuery, sortBy, priceRange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category, search: searchQuery });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ category: selectedCategory, search: searchQuery });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("featured");
    setPriceRange([0, 100]);
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Products</h1>
          <p>Premium supplements for peak performance and optimal health</p>
        </div>
      </div>

      <div className="container">
        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? "active" : ""}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button
                className="close-filters"
                onClick={() => setShowFilters(false)}
              >
                ×
              </button>
            </div>

            {/* Search */}
            <div className="filter-section">
              <h4>Search</h4>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4>Categories</h4>
              <div className="category-filters">
                <label className="category-filter">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={() => handleCategoryChange("all")}
                  />
                  <span className="checkmark"></span>
                  <span className="category-name">All Products</span>
                </label>
                {categories.map((category) => (
                  <label key={category._id} className="category-filter">
                    <input
                      type="radio"
                      name="category"
                      value={category._id}
                      checked={selectedCategory === category._id}
                      onChange={() => handleCategoryChange(category._id)}
                    />
                    <span className="checkmark"></span>
                    <span className="category-name">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-range">
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="price-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="price-input"
                  />
                </div>
                <div className="price-slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="range-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="range-slider"
                  />
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="btn btn-outline reset-filters"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Products Header */}
            <div className="products-header">
              <div className="products-info">
                <h2>
                  {selectedCategory !== "all"
                    ? categories.find((c) => c._id === selectedCategory)?.name
                    : "All Products"}
                </h2>
                <p>{filteredProducts.length} products found</p>
              </div>

              <div className="products-controls">
                <button
                  className="mobile-filters-btn"
                  onClick={() => setShowFilters(true)}
                >
                  <FaFilter />
                  Filters
                </button>

                <div className="sort-controls">
                  <label htmlFor="sort">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={resetFilters} className="btn btn-primary">
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${
                          currentPage === page ? "active" : ""
                        }`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
