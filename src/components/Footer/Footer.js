import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useStoreSettings from "../../hooks/useStoreSettings";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {
    storeName,
    storeDescription,
    address,
    contactPhone,
    contactEmail,
  } = useStoreSettings();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <h3 className="footer-logo">{storeName}</h3>
            <p className="footer-tagline">{storeDescription}</p>
          </div>
          <p className="footer-description">
            We provide high-quality supplements to help athletes, gym enthusiasts, and sports people achieve their fitness goals. 
            Our products are scientifically formulated and third-party tested for quality and safety.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=protein">Protein</Link></li>
            <li><Link to="/products?category=pre-workout">Pre-Workout</Link></li>
            <li><Link to="/products?category=vitamins">Vitamins</Link></li>
            <li><Link to="/products?category=creatine">Creatine</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Customer Service</h4>
          <ul className="footer-links">
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>

            {/* <li><Link to="/careers">Careers</Link></li> */}
            {/* <li><Link to="/press">Press</Link></li> */}
            {/* <li><Link to="/partners">Partnerships</Link></li> */}
            {/* <li><Link to="/sustainability">Sustainability</Link></li> */}
            {/* <li><Link to="/blog">Blog</Link></li> */}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <div className="footer-contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>{address}</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>{contactPhone}</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>{contactEmail}</span>
            </div>
          </div>
          
          <div className="newsletter">
            <h5>Newsletter</h5>
            <p>Stay updated with the latest products and fitness tips</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-bottom-left">
            <p>&copy; {currentYear} {storeName}. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
