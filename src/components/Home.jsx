import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();


  return (
    <header className="home-header">
      {/* 🔸 Top Bar */}
      <div className="top-bar d-flex align-items-center justify-content-between px-4">
        <div className="flex-grow-1 d-flex justify-content-center">
          <h6 className="m-0 fw-semibold top-bar-text tube-text">
            Checkout Our Exciting New Launches 🚀
          </h6>
        </div>
        <div className="d-flex justify-content-end gap-3 social-icons">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-youtube"></i>
          <i className="bi bi-linkedin"></i>
          <i className="bi bi-envelope-fill"></i>
        </div>
      </div>

      {/* 🔸 Main Navigation Row */}
      <div className="nav-row row align-items-center py-3 px-4">
        {/* Logo */}
        <div className="col-6 col-md-2 d-flex justify-content-center justify-content-md-start">
          <img
            src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/bxn4s0bj_expires_30_days.png"
            className="brand-logo"
            alt="Logo"
          />
        </div>

        {/* Navigation Links */}
        <div className="col-md-8 d-none d-md-flex justify-content-center nav-links">
          {[
            "Products",
            "Shop by purpose",
            "Siddh collection",
            "Sawan Sale",
            "Astro Stone",
            "Festival",
          ].map((item, index) => (
            <span key={index} className="nav-item">
              {item}
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/2eksad0c_expires_30_days.png"
                alt="Arrow"
                className="arrow-icon"
              />
            </span>
          ))}
        </div>

        {/* Action Icons */}
        <div className="col-6 col-md-2 d-flex justify-content-center justify-content-md-end gap-3 action-icons">
          {/* Search */}
          <img
            src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/usti218l_expires_30_days.png"
            className="icon-img"
            alt="Search"
            onClick={() => setShowSearch(!showSearch)}
            style={{ cursor: "pointer" }}
          />

          {/* Profile */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
            className="icon-img"
            alt="Profile"
            onClick={() => navigate("/user/login")}
            style={{ cursor: "pointer" }}
          />

          {/* Cart */}
          <img
            src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/206cicc1_expires_30_days.png"
            className="icon-img"
            alt="Cart"
            onClick={() => navigate("/cart/1")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {/* 🔍 Expanding Search Box */}
      <div className={`search-box-wrapper ${showSearch ? "open" : ""}`}>
        <input
          type="text"
          placeholder="Search products..."
          className="form-control search-input"
        />
        <button
          className="btn-close-search"
          onClick={() => setShowSearch(false)}
        >
          ✕
        </button>
      </div>
    </header>
  );
};

export default Home;
