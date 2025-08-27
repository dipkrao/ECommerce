import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getProfile } from "./store/slices/authSlice";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return <ProtectedRouteInner>{children}</ProtectedRouteInner>;
};

const ProtectedRouteInner = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, loading, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, token, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check for existing user data on app start
    const existingUser = localStorage.getItem("user");
    const existingToken = localStorage.getItem("userToken");

    if (existingUser && existingToken) {
      // User data exists, try to get profile to verify token
      // But don't block the app if it fails - just log the user out silently
      dispatch(getProfile()).catch(() => {
        // If profile fetch fails, clear auth state silently
        // This prevents automatic redirects to login
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
      });
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
