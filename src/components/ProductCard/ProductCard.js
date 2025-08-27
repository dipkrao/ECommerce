import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaEye, FaHeart } from 'react-icons/fa';
import { useAppSelector } from '../../store/hooks';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { items } = useAppSelector(state => state.cart);

  const cartQuantity = items.find(item => item._id === product._id)?.quantity || 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={product.images && product.images[0] ? product.images[0] : "https://via.placeholder.com/400x400?text=No+Image"} alt={product.name} />
          
          {/* Product Overlay */}
          <div className="product-overlay">
            <div className="overlay-actions">
              <button 
                className="overlay-btn add-to-cart-btn"
                onClick={handleAddToCart}
                title="Add to Cart"
              >
                <FaShoppingCart />
              </button>
              
              <button 
                className="overlay-btn quick-view-btn"
                onClick={handleQuickView}
                title="Quick View"
              >
                <FaEye />
              </button>
              
              <button 
                className={`overlay-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={toggleWishlist}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <FaHeart />
              </button>
            </div>
          </div>

          {/* Category Badge */}
          <div className="category-badge">
            {product.category && product.category.name ? product.category.name : 'Uncategorized'}
          </div>

          {/* Stock Status */}
          {product.stock <= 0 && (
            <div className="out-of-stock">
              Out of Stock
            </div>
          )}

          {/* Cart Quantity Badge */}
          {cartQuantity > 0 && (
            <div className="cart-quantity-badge">
              {cartQuantity} in cart
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-header">
            <h3 className="product-name">
              <Link to={`/products/${product._id}`}>
                {product.name}
              </Link>
            </h3>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(product.averageRating || 0) ? 'star filled' : 'star'} 
                  />
                ))}
              </div>
              <span className="rating-text">({product.totalReviews || 0})</span>
            </div>
          </div>

          <div className="product-details">
            <p className="product-description">
              {product.description.length > 100 
                ? `${product.description.substring(0, 100)}...` 
                : product.description
              }
            </p>
            
            <div className="product-specs">
              <span className="spec-item">
                <strong>Stock:</strong> {product.stock} units
              </span>
              <span className="spec-item">
                <strong>SKU:</strong> {product.sku}
              </span>
            </div>
          </div>

          <div className="product-footer">
            <div className="product-price">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice}</span>
              )}
            </div>

            <div className="product-actions">
              <button 
                className="btn btn-primary add-to-cart"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <FaShoppingCart />
                {cartQuantity > 0 ? `Update (${cartQuantity})` : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="quick-view-modal" onClick={closeQuickView}>
          <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeQuickView}>
              ×
            </button>
            
            <div className="quick-view-grid">
              <div className="quick-view-image">
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="quick-view-details">
                <h2>{product.name}</h2>
                
                <div className="quick-view-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(product.rating) ? 'star filled' : 'star'} 
                      />
                    ))}
                  </div>
                  <span className="rating-text">({product.reviews} reviews)</span>
                </div>
                
                <p className="quick-view-description">{product.description}</p>
                
                <div className="quick-view-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="quick-view-specs">
                  <div className="spec">
                    <strong>Weight:</strong> {product.weight}
                  </div>
                  <div className="spec">
                    <strong>Servings:</strong> {product.servings}
                  </div>
                  <div className="spec">
                    <strong>Category:</strong> {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>
                
                <div className="quick-view-price">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                </div>
                
                <div className="quick-view-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                  
                  <Link to={`/products/${product.id}`} className="btn btn-outline">
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
