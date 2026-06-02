import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { bannerAPI } from "../../utils/api";
import "./BannerSlider.css";

const BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/api$/, "");

const getImageSrc = (image) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return `${BASE_URL}${image}`;
  return `${BASE_URL}/${image}`;
};

const FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='400' viewBox='0 0 1200 400'%3E%3Crect width='1200' height='400' fill='%231e3a5f'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='36' fill='%23ffffff'%3EHY Nutrition Supplements%3C/text%3E%3C/svg%3E";

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    bannerAPI
      .getPublic()
      .then((res) => {
        const data = res.data?.data || res.data || [];
        if (Array.isArray(data) && data.length > 0) setBanners(data);
      })
      .catch((err) => { console.error("Banner fetch failed:", err?.response?.data || err.message); });
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <div className="banner-slider">
        <div className="banner-slide">
          <div className="banner-image">
            <img src={FALLBACK} alt="HY Nutrition" />
          </div>
        </div>
      </div>
    );
  }

  const currentBanner = banners[currentIndex];
  const imageSrc = getImageSrc(currentBanner.image) || FALLBACK;

  return (
    <div className="banner-slider">
      <div className="banner-slide">
        <div className="banner-image">
          <img
            src={imageSrc}
            alt={currentBanner.title || "Banner"}
            onError={(e) => {
              e.target.src = FALLBACK;
            }}
          />
        </div>
        <div className="banner-content">
          <div className="banner-text" />
        </div>

        {banners.length > 1 && (
          <>
            <button
              className="banner-nav banner-prev"
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev - 1 + banners.length) % banners.length,
                )
              }
            >
              <FaArrowLeft />
            </button>
            <button
              className="banner-nav banner-next"
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % banners.length)
              }
            >
              <FaArrowRight />
            </button>
            <div className="banner-dots">
              {banners.map((_, i) => (
                <button
                  key={i}
                  className={`banner-dot${i === currentIndex ? " active" : ""}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BannerSlider;
