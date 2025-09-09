import React, { useState } from "react";
import "./filter.css";
import filterimg from "../assets/filter.png"

const FilterSection = ({
  onCategoryChange,
  onPriceChange,
  onSortChange,
  onAvailabilityChange,   // ✅ NEW
  onClearFilters,
} = {}) => {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("best");
  const [availability, setAvailability] = useState("all");

  const availabilityLabel =
    availability === "all"
      ? "Availability"
      : availability === "in"
        ? "In stock"
        : "Out of stock";

  const handleCategory = (value) => {
    setCategory(value);
    if (typeof onCategoryChange === "function") onCategoryChange(value);
  };

  const handlePrice = (value) => {
    setPriceRange(value);
    if (typeof onPriceChange === "function") onPriceChange(value);
  };

  const handleSort = (value) => {
    setSortBy(value);
    if (typeof onSortChange === "function") onSortChange(value);
  };

  const handleAvailability = (value) => {
    setAvailability(value);
    if (typeof onAvailabilityChange === "function") onAvailabilityChange(value);
  };

  const handleClear = () => {
    setCategory("all");
    setPriceRange("all");
    setSortBy("best");
    setAvailability("all");
    if (typeof onClearFilters === "function") onClearFilters();
  };

  return (
    <div
      className="container ps-5"
      style={{
        backgroundColor: "#fefaea",
        padding: "20px",
        borderRadius: "10px",
        color: "#6D1D11",
      }}
    >
      <div className="filter-controls">
        <div className="dropdown-wrapper">
          <button className="btn " type="button" data-bs-toggle="dropdown">
            <img src={filterimg} alt="" />
            <span style={{ fontSize: "20px", fontWeight: "normal", paddingLeft: "20px" }}>Filter</span>
          </button>
        </div>

        {/*  Availability Filter */}
        <div className="dropdown-wrapper">
          <button
            className="filter-dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>{availabilityLabel}</span>
            <svg
              className="dropdown-arrow"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={() => handleAvailability("all")}>
                All
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => handleAvailability("in")}>
                In stock
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => handleAvailability("out")}>
                Out of stock
              </button>
            </li>
          </ul>

        </div>

        {/* Category Filter */}
        <div className="dropdown-wrapper">
          <button
            className="filter-dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span>{category === "all" ? "All Products" : category}</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleCategory("all")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleCategory("rudraksha")}
              >
                Rudraksha
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleCategory("stone")}
              >
                Stone 
              </button>
            </li>
          </ul>
        </div>

        {/* Price Filter */}
        <div className="dropdown-wrapper">
          <button
            className="filter-dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span>{priceRange === "all" ? "Price" : priceRange}</span>
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={() => handlePrice("all")}>All</button></li>
            <li><button className="dropdown-item" onClick={() => handlePrice("0-499")}>₹0 - ₹499</button></li>
            <li><button className="dropdown-item" onClick={() => handlePrice("500-999")}>₹500 - ₹999</button></li>
            <li><button className="dropdown-item" onClick={() => handlePrice("1000-1999")}>₹1000 - ₹1999</button></li>
            <li><button className="dropdown-item" onClick={() => handlePrice("2000+")}>₹2000+</button></li>
          </ul>
        </div>

        {/* Sort Filter */}
        <div className="dropdown-wrapper" style={{ marginLeft: "auto" }}>
          <button
            className="btn"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span>
              {sortBy === "best"
                ? " Sort By :Best Selling "
                : sortBy === "price-asc"
                  ? "Price: Low to High"
                  : sortBy === "price-desc"
                    ? "Price: High to Low"
                    : "Newest"}
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><button className="dropdown-item" onClick={() => handleSort("best")}>Best Selling</button></li>
            <li><button className="dropdown-item" onClick={() => handleSort("price-asc")}>Price: Low to High</button></li>
            <li><button className="dropdown-item" onClick={() => handleSort("price-desc")}>Price: High to Low</button></li>
            <li><button className="dropdown-item" onClick={() => handleSort("new")}>Newest</button></li>
          </ul>
        </div>

        {/* Clear Filters */}
        <button
          className="btn btn-sm ms-3" style={{ borderColor: "#FD8B07" }}
          onClick={handleClear}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
