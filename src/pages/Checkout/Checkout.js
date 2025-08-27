import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { clearCart } from "../../store/slices/cartSlice";
import { FaLock, FaCreditCard, FaTruck, FaCheck } from "react-icons/fa";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.auth);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    saveInfo: false,
    subscribeNewsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shippingCost = total >= 50 ? 0 : 5.99;
  const finalTotal = total + shippingCost;

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
      }));
    }
  }, [items, user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "cardNumber",
      "cardName",
      "expiryMonth",
      "expiryYear",
      "cvv",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      formData.phone &&
      !/^[\+]?\d[\d\s-]{6,}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (
      formData.cardNumber &&
      formData.cardNumber.replace(/\s/g, "").length < 13
    ) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (formData.cvv && formData.cvv.length < 3) {
      newErrors.cvv = "CVV must be at least 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOrderComplete(true);
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Payment failed:", error);
      setErrors({ submit: "Payment failed. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h1>Order Successful!</h1>
            <p>
              Thank you for your purchase. You will receive a confirmation email
              shortly.
            </p>
            <p>Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-header">
        <div className="container">
          <h1>Checkout</h1>
          <p>Complete your order securely</p>
        </div>
      </div>

      <div className="container">
        <div className="checkout-layout">
          {/* Checkout Form */}
          <main className="checkout-main">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Shipping Information */}
              <div className="form-section">
                <div className="section-header">
                  <FaTruck className="section-icon" />
                  <h2>Shipping Information</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "error" : ""}
                    />
                    {errors.firstName && (
                      <span className="error-text">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "error" : ""}
                    />
                    {errors.lastName && (
                      <span className="error-text">{errors.lastName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && (
                      <span className="error-text">{errors.phone}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? "error" : ""}
                    />
                    {errors.address && (
                      <span className="error-text">{errors.address}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? "error" : ""}
                    />
                    {errors.city && (
                      <span className="error-text">{errors.city}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={errors.state ? "error" : ""}
                    />
                    {errors.state && (
                      <span className="error-text">{errors.state}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={errors.zipCode ? "error" : ""}
                    />
                    {errors.zipCode && (
                      <span className="error-text">{errors.zipCode}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="form-section">
                <div className="section-header">
                  <FaCreditCard className="section-icon" />
                  <h2>Payment Information</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={errors.cardNumber ? "error" : ""}
                    />
                    {errors.cardNumber && (
                      <span className="error-text">{errors.cardNumber}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="cardName">Name on Card *</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={errors.cardName ? "error" : ""}
                    />
                    {errors.cardName && (
                      <span className="error-text">{errors.cardName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="expiryMonth">Expiry Month *</label>
                    <select
                      id="expiryMonth"
                      name="expiryMonth"
                      value={formData.expiryMonth}
                      onChange={handleChange}
                      className={errors.expiryMonth ? "error" : ""}
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <option
                            key={month}
                            value={month.toString().padStart(2, "0")}
                          >
                            {month.toString().padStart(2, "0")}
                          </option>
                        )
                      )}
                    </select>
                    {errors.expiryMonth && (
                      <span className="error-text">{errors.expiryMonth}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="expiryYear">Expiry Year *</label>
                    <select
                      id="expiryYear"
                      name="expiryYear"
                      value={formData.expiryYear}
                      onChange={handleChange}
                      className={errors.expiryYear ? "error" : ""}
                    >
                      <option value="">Year</option>
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() + i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.expiryYear && (
                      <span className="error-text">{errors.expiryYear}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      className={errors.cvv ? "error" : ""}
                    />
                    {errors.cvv && (
                      <span className="error-text">{errors.cvv}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="form-section">
                <div className="form-options">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    Save this information for next time
                  </label>

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    Subscribe to our newsletter for exclusive offers
                  </label>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="error-message">{errors.submit}</div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary checkout-submit"
                disabled={isProcessing}
              >
                <FaLock />
                {isProcessing
                  ? "Processing..."
                  : `Pay $${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </main>

          {/* Order Summary */}
          <aside className="checkout-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                  </span>
                </div>
                <div className="total-row final">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="security-notice">
                <FaLock />
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
