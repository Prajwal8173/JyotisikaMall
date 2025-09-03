import React, { useState } from "react";
import "./filter.css";

const FilterSection = ({
  onAvailabilityChange,
  onPriceChange,
  onSortChange,
} = {}) => {
  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("best");

  const availabilityLabel = availability === "all"
    ? "Availability"
    : availability === "in"
      ? "In stock"
      : "Out of stock";

  const priceLabel = priceRange === "all"
    ? "Price"
    : priceRange === "0-499"
      ? "₹0 - ₹499"
      : priceRange === "500-999"
        ? "₹500 - ₹999"
        : priceRange === "1000-1999"
          ? "₹1000 - ₹1999"
          : "₹2000+";

  const handleAvailability = (value) => {
    setAvailability(value);
    if (typeof onAvailabilityChange === "function") onAvailabilityChange(value);
  };

  const handlePrice = (value) => {
    setPriceRange(value);
    if (typeof onPriceChange === "function") onPriceChange(value);
  };

  const handleSort = (value) => {
    setSortBy(value);
    if (typeof onSortChange === "function") onSortChange(value);
  };

  return (
    <div className="filter-container ps-5">
      <div className="filter-controls">
        <div className="filter-icon-section">
          <div className="">
           <i class="bi bi-filter-square"></i>
          </div>
          <span className="filter-title">Filter</span>
        </div>

        <div className="dropdown-wrapper">
          <button
            className="filter-dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>{availabilityLabel}</span>
            <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={() => handleAvailability("all")}>All</button></li>
            <li><button className="dropdown-item" onClick={() => handleAvailability("in")}>In stock</button></li>
            <li><button className="dropdown-item" onClick={() => handleAvailability("out")}>Out of stock</button></li>
          </ul>
        </div>

        <div className="dropdown-wrapper">
          <button
            className="filter-dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>{priceLabel}</span>
            <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={() => handlePrice("all")}>All</button></li>
            <li><button className="dropdown-item" onClick={() => handlePrice("0-499")}>₹0 - ₹499</button></li>
            <li><button className="dropdown-item" onClick={() => handlePrice("500-999")}>₹500 - ₹999</button></li>
            <li><button className="dropdown-item" onClick={() => handlePrice("1000-1999")}>₹1000 - ₹1999</button></li>
            <li><button className="dropdown-item" onClick={() => handlePrice("2000+")}>₹2000+</button></li>
          </ul>
        </div>

        <div className="dropdown-wrapper" style={{ marginLeft: "auto" }}>
          <button
            className="sort-dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>Sort by: {sortBy === "best" ? "Best selling" : sortBy === "price-asc" ? "Price: Low to High" : sortBy === "price-desc" ? "Price: High to Low" : "Newest"}</span>
            <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><button className="dropdown-item" onClick={() => handleSort("best")}>Best selling</button></li>
            <li><button className="dropdown-item" onClick={() => handleSort("price-asc")}>Price: Low to High</button></li>
            <li><button className="dropdown-item" onClick={() => handleSort("price-desc")}>Price: High to Low</button></li>
            <li><button className="dropdown-item" onClick={() => handleSort("new")}>Newest</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;