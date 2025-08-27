import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowRight as FaArrow,
} from "react-icons/fa";
import { bannerAPI } from "../../utils/api";
import "./BannerSlider.css";

const BannerSlider = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Welcome to PowerFuel",
      description: "Premium supplements for your fitness journey",
      image: "https://via.placeholder.com/1200x400?text=PowerFuel+Supplements",
      buttonText: "Shop Now",
      link: "/products",
    },
  ]);

  // Debug effect to log banner changes
  useEffect(() => {
    console.log("Banners state changed:", banners);
  }, [banners]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("BannerSlider mounted, fetching banners...");
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000); // Auto-advance every 5 seconds

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching banners from API...");

      // Use the public endpoint for active banners
      const response = await bannerAPI.getPublic();
      console.log("Banner API response:", response);

      // Get banners from response
      const activeBanners = response.data.data || response.data || [];
      console.log("Active banners:", activeBanners);

      if (activeBanners && activeBanners.length > 0) {
        console.log("Setting banners:", activeBanners);
        setBanners(activeBanners);
        console.log("Banners updated successfully:", activeBanners);
      } else {
        console.log("No banners returned from API, keeping default banners");
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setError(error.message || "Failed to fetch banners");

      // Show error message in console for debugging
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      }

      // Keep the default banners if API fails
      console.log("Keeping default banners due to API error");

      // For testing, let's also try to set some test banners
      console.log("Setting test banners for debugging");
      const testBanners = [
        {
          id: "test1",
          title: "Test Banner 1",
          description: "This is a test banner",
          image: "https://via.placeholder.com/1200x400?text=Test+Banner+1",
          buttonText: "Test Button",
          link: "/test",
        },
      ];
      setBanners(testBanners);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="banner-slider">
        <div className="banner-slide">
          <div className="banner-content">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading banners...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error message for debugging
  if (error) {
    console.log("Displaying error state:", error);
  }

  // Always show banners since we have defaults

  const currentBanner = banners[currentIndex];
  console.log("Current banner:", currentBanner);
  console.log("Current index:", currentIndex);
  console.log("Total banners:", banners.length);

  return (
    <div className="banner-slider">
      <div className="banner-slide">
        <div className="banner-image">
          <img
            src={
              currentBanner.image?.startsWith("http")
                ? currentBanner.image
                : currentBanner.image?.startsWith("/uploads")
                ? `http://localhost:5000${currentBanner.image}`
                : `/images/${currentBanner.image}`
            }
            alt={currentBanner.title}
            onError={(e) => {
              console.error("Image failed to load:", currentBanner.image);
              e.target.src =
                "https://via.placeholder.com/1200x400?text=PowerFuel+Supplements";
            }}
          />
        </div>
        <div className="banner-content">
          <div className="banner-text">
            <h1 className="banner-title">{currentBanner.title}</h1>
            <p className="banner-description">{currentBanner.description}</p>
            {currentBanner.buttonText && (
              <Link
                to={currentBanner.link || "/products"}
                className="btn btn-primary banner-btn"
              >
                {currentBanner.buttonText}
                <FaArrow />
              </Link>
            )}
          </div>
        </div>

        {/* Navigation arrows */}
        {banners.length > 1 && (
          <>
            <button className="banner-nav banner-prev" onClick={prevSlide}>
              <FaArrowLeft />
            </button>
            <button className="banner-nav banner-next" onClick={nextSlide}>
              <FaArrowRight />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {banners.length > 1 && (
          <div className="banner-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`banner-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerSlider;
