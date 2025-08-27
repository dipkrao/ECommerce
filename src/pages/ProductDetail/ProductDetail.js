import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { getProductById, getProductsByCategory } from '../../data/products';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      const related = getProductsByCategory(foundProduct.category)
        .filter(p => p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="loading">Loading product...</div>
        </div>
      </div>
    );
  }

  const cartQuantity = items.find(item => item.id === product.id)?.quantity || 0;

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`}>
            {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Product Main */}
        <div className="product-main">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              <button
                className={`thumbnail ${selectedImage === 0 ? 'active' : ''}`}
                onClick={() => setSelectedImage(0)}
              >
                <img src={product.image} alt={product.name} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-meta">
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(product.rating) ? 'star filled' : 'star'} 
                      />
                    ))}
                  </div>
                  <span className="rating-text">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="product-sku">SKU: {product.id}</div>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice}</span>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-specs">
              <div className="spec-item">
                <strong>Weight:</strong> {product.weight}
              </div>
              <div className="spec-item">
                <strong>Servings:</strong> {product.servings}
              </div>
              <div className="spec-item">
                <strong>Category:</strong> {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <FaShoppingCart />
                  {cartQuantity > 0 ? `Update Cart (${cartQuantity})` : 'Add to Cart'}
                </button>
                
                <button 
                  className={`btn btn-outline wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={toggleWishlist}
                >
                  <FaHeart />
                  {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                
                <button 
                  className="btn btn-outline share-btn"
                  onClick={handleShare}
                >
                  <FaShare />
                  Share
                </button>
              </div>
            </div>

            <div className="product-benefits">
              <div className="benefit-item">
                <FaTruck className="benefit-icon" />
                <div className="benefit-text">
                  <strong>Free Shipping</strong>
                  <span>On orders over $50</span>
                </div>
              </div>
              
              <div className="benefit-item">
                <FaShieldAlt className="benefit-icon" />
                <div className="benefit-text">
                  <strong>Quality Guaranteed</strong>
                  <span>Third-party tested</span>
                </div>
              </div>
              
              <div className="benefit-item">
                <FaUndo className="benefit-icon" />
                <div className="benefit-text">
                  <strong>30-Day Returns</strong>
                  <span>Hassle-free returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
            <button
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <p>
                  This premium supplement is designed to help athletes, gym enthusiasts, and sports people 
                  achieve their fitness goals. Made with high-quality ingredients and scientifically 
                  formulated for optimal results.
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="tab-panel">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <h4>Additional Benefits</h4>
                <ul>
                  <li>Third-party tested for purity and quality</li>
                  <li>No artificial colors or flavors</li>
                  <li>Gluten-free and suitable for most dietary restrictions</li>
                  <li>Made in FDA-registered facilities</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="overall-rating">
                    <div className="rating-number">{product.rating}</div>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(product.rating) ? 'star filled' : 'star'} 
                        />
                      ))}
                    </div>
                    <div className="total-reviews">Based on {product.reviews} reviews</div>
                  </div>
                </div>
                <div className="reviews-list">
                  <p>Reviews will be displayed here. This is a demo product.</p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-panel">
                <h3>Shipping Information</h3>
                <div className="shipping-info">
                  <h4>Shipping Options</h4>
                  <ul>
                    <li><strong>Free Shipping:</strong> On orders over $50 (3-5 business days)</li>
                    <li><strong>Standard Shipping:</strong> $5.99 (5-7 business days)</li>
                    <li><strong>Express Shipping:</strong> $12.99 (2-3 business days)</li>
                  </ul>
                  
                  <h4>Return Policy</h4>
                  <p>
                    We offer a 30-day return policy for all products. If you're not completely 
                    satisfied with your purchase, you can return it for a full refund or exchange.
                  </p>
                  
                  <h4>International Shipping</h4>
                  <p>
                    We ship to most countries worldwide. International shipping rates and delivery 
                    times vary by location.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
