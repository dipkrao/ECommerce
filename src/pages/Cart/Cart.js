import React from "react";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaArrowLeft,
  FaShoppingBag,
  FaCreditCard,
} from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateQuantity, removeFromCart, clearCart } from "../../store/slices/cartSlice";
import "./Cart.css";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const itemCount = items.length;
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingBag />
            </div>
            <h2>Your cart is empty</h2>
            <p>
              Looks like you haven't added any supplements to your cart yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <div className="container">
          <h1>Shopping Cart</h1>
          <p>{itemCount} items in your cart</p>
        </div>
      </div>

      <div className="container">
        <div className="cart-layout">
          {/* Cart Items */}
          <main className="cart-main">
            <div className="cart-header">
              <h2>Cart Items</h2>
              <button onClick={handleClearCart} className="clear-cart-btn">
                <FaTrash />
                Clear Cart
              </button>
            </div>

            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-category">
                      {item.category
                        ? item.category
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                        : "General"}
                    </div>
                  </div>

                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        min="1"
                        className="quantity-input"
                      />
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-price">
                    <span className="price">${item.price}</span>
                    <span className="subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <Link
                to="/products"
                className="btn btn-outline continue-shopping"
              >
                <FaArrowLeft />
                Continue Shopping
              </Link>
            </div>
          </main>

          {/* Cart Summary */}
          <aside className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{total >= 50 ? "Free" : "$5.99"}</span>
              </div>

              {total < 50 && (
                <div className="free-shipping-notice">
                  <p>Add ${(50 - total).toFixed(2)} more for free shipping!</p>
                </div>
              )}

              <div className="summary-row total">
                <span>Total</span>
                <span>${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}</span>
              </div>

              <div className="summary-actions">
                {isAuthenticated ? (
                  <Link to="/checkout" className="btn btn-primary checkout-btn">
                    <FaCreditCard />
                    Proceed to Checkout
                  </Link>
                ) : (
                  <div className="login-required">
                    <p>Please log in to checkout</p>
                    <Link to="/login" className="btn btn-primary">
                      Login
                    </Link>
                  </div>
                )}
              </div>

              <div className="payment-methods">
                <h4>We Accept</h4>
                <div className="payment-icons">
                  <span className="payment-icon">💳</span>
                  <span className="payment-icon">🏦</span>
                  <span className="payment-icon">📱</span>
                </div>
              </div>

              <div className="security-notice">
                <p>🔒 Secure checkout with SSL encryption</p>
                <p>🚚 Free shipping on orders over $50</p>
                <p>↩️ 30-day return policy</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
