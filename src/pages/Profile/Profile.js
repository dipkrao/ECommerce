import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout, updateProfile } from "../../store/slices/authSlice";
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaBox,
  FaHeart,
  FaCog,
} from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
  });

  // Sync form data with user data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
      // Error handling is done in the auth slice
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.zipCode || "",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 89.97,
      items: [
        { name: "Whey Protein Isolate", quantity: 1, price: 49.99 },
        { name: "Pre-Workout Energy Blend", quantity: 1, price: 34.99 },
        { name: "BCAA Recovery Formula", quantity: 1, price: 29.99 },
      ],
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 44.99,
      items: [{ name: "Casein Protein", quantity: 1, price: 44.99 }],
    },
  ];

  const wishlist = [
    {
      id: 1,
      name: "Creatine Monohydrate",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Omega-3 Fish Oil",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="profile-page">
      <div className="page-header">
        <div className="container">
          <h1>My Account</h1>
          <p>Manage your profile and view your orders</p>
        </div>
      </div>

      <div className="container">
        <div className="profile-layout">
          {/* Sidebar Navigation */}
          <aside className="profile-sidebar">
            <div className="sidebar-nav">
              <button
                className={`nav-item ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <FaUser />
                Profile
              </button>
              <button
                className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <FaBox />
                Order History
              </button>
              <button
                className={`nav-item ${
                  activeTab === "wishlist" ? "active" : ""
                }`}
                onClick={() => setActiveTab("wishlist")}
              >
                <FaHeart />
                Wishlist
              </button>
              <button
                className={`nav-item ${
                  activeTab === "settings" ? "active" : ""
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <FaCog />
                Settings
              </button>
            </div>

            <div className="sidebar-actions">
              <button
                onClick={handleLogout}
                className="btn btn-outline logout-btn"
              >
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="profile-content">
                <div className="content-header">
                  <h2>Profile Information</h2>
                  {!isEditing && (
                    <button
                      className="btn btn-outline edit-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      <FaEdit />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label htmlFor="address">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button onClick={handleSave} className="btn btn-primary">
                        <FaSave />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-outline"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="orders-content">
                <div className="content-header">
                  <h2>Order History</h2>
                </div>

                <div className="orders-list">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3>Order {order.id}</h3>
                          <p className="order-date">Placed on {order.date}</p>
                        </div>
                        <div className="order-status">
                          <span
                            className={`status-badge ${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                          <span className="order-total">₹{order.total}</span>
                        </div>
                      </div>

                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">
                              x{item.quantity}
                            </span>
                            <span className="item-price">₹{item.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="order-actions">
                        <button className="btn btn-outline">
                          View Details
                        </button>
                        <button className="btn btn-outline">Track Order</button>
                        <button className="btn btn-outline">Reorder</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="wishlist-content">
                <div className="content-header">
                  <h2>My Wishlist</h2>
                </div>

                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                    <div key={item.id} className="wishlist-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-info">
                        <h3 className="item-name">{item.name}</h3>
                        <span className="item-price">₹{item.price}</span>
                      </div>
                      <div className="item-actions">
                        <button className="btn btn-primary">Add to Cart</button>
                        <button className="btn btn-outline">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="settings-content">
                <div className="content-header">
                  <h2>Account Settings</h2>
                </div>

                <div className="settings-sections">
                  <div className="setting-section">
                    <h3>Password</h3>
                    <p>Change your account password</p>
                    <button className="btn btn-outline">Change Password</button>
                  </div>

                  <div className="setting-section">
                    <h3>Email Preferences</h3>
                    <p>Manage your email notifications</p>
                    <div className="setting-options">
                      <label className="checkbox-container">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Order updates and tracking
                      </label>
                      <label className="checkbox-container">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Promotional offers
                      </label>
                      <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Newsletter
                      </label>
                    </div>
                  </div>

                  <div className="setting-section">
                    <h3>Privacy</h3>
                    <p>Manage your privacy settings</p>
                    <button className="btn btn-outline">
                      Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
