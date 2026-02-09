import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaMedal,
} from "react-icons/fa";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartSlice";
import { productAPI, categoryAPI } from "../../utils/api";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import "./Home.css";

const Home = () => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsResponse, categoriesResponse] = await Promise.all([
        productAPI.getAll({ limit: 12 }),
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

  const featuredProducts = products.slice(0, 4);
  const mainCategories = categories.slice(0, 6);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  if (loading) {
    return (
      <div className="home">
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
    <div className="home">
      {/* Dynamic Banner Section */}
      <BannerSlider />

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaTruck />
              </div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over ₹50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Quality Guaranteed</h3>
              <p>Third-party tested for purity</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaHeadset />
              </div>
              <h3>24/7 Support</h3>
              <p>Expert support when you need it</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaMedal />
              </div>
              <h3>Premium Quality</h3>
              <p>Only the finest ingredients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Our most popular supplements for peak performance
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img
                    src={
                      product.images && product.images[0]
                        ? product.images[0]
                        : "https://via.placeholder.com/400x400?text=No+Image"
                    }
                    alt={product.name}
                  />
                  <div className="product-overlay">
                    <button
                      className="btn btn-primary add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(product.averageRating || 0)
                              ? "star filled"
                              : "star"
                          }
                        />
                      ))}
                    </div>
                    <span className="rating-text">
                      ({product.totalReviews || 0})
                    </span>
                  </div>
                  <p className="product-price">₹{product.price}</p>
                  <Link
                    to={`/products/${product._id}`}
                    className="view-details"
                  >
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products" className="btn btn-outline view-all-btn">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Find the perfect supplements for your fitness goals
            </p>
          </div>

          <div className="categories-grid">
            {mainCategories.map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className="category-card"
              >
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-count">View products</p>
                  <span className="category-arrow">
                    <FaArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Performance?</h2>
            <p>
              Join thousands of athletes who trust HY Nutrition for their
              supplement needs
            </p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary">
                Start Shopping
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real results from real athletes</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "HY Nutrition's whey protein has been a game-changer for my
                  muscle recovery. I've seen incredible gains in just 3 months!"
                </p>
                <div className="testimonial-author">
                  <strong>Mike Johnson</strong>
                  <span>Professional Bodybuilder</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The pre-workout gives me the energy I need for intense
                  training sessions. My performance has improved significantly."
                </p>
                <div className="testimonial-author">
                  <strong>Sarah Williams</strong>
                  <span>CrossFit Athlete</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Quality supplements that actually work. I've tried many
                  brands, but HY Nutrition delivers consistent results."
                </p>
                <div className="testimonial-author">
                  <strong>David Chen</strong>
                  <span>Fitness Trainer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Test Section - Temporary for debugging */}
      {/* <section className="auth-test-section">
        <div className="container">
          <AuthTest />
        </div>
      </section> */}
    </div>
  );
};

export default Home;
