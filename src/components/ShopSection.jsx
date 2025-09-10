import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FilterSection from "./FilterSection";

const ShopSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("best");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    let apiUrl =
      "https://jyotisika.in/jyotisika_test/User_Api_Controller/getproduct";

    if (categoryFilter === "rudraksha") {
      apiUrl =
        "https://jyotisika.in/jyotisika_test/User_Api_Controller/show_rudraksh";
    } else if (categoryFilter === "stone") {
      apiUrl =
        "https://jyotisika.in/jyotisika_test/User_Api_Controller/show_energy_stones";
    }

    axios
      .get(apiUrl)
      .then((response) => {
        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data)
        ) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [categoryFilter]);

  // Apply filters
  useEffect(() => {
    let updated = [...products];

    if (priceFilter !== "all") {
      updated = updated.filter((p) => {
        const price = parseFloat(p.discount_price);
        if (priceFilter === "0-499") return price >= 0 && price <= 499;
        if (priceFilter === "500-999") return price >= 500 && price <= 999;
        if (priceFilter === "1000-1999") return price >= 1000 && price <= 1999;
        if (priceFilter === "2000+") return price >= 2000;
        return true;
      });
    }

    if (availabilityFilter !== "all") {
      updated = updated.filter((p) => {
        const stock = parseInt(p.stock || p.quantity || 0);
        if (availabilityFilter === "in") return stock > 0;
        if (availabilityFilter === "out") return stock === 0;
        return true;
      });
    }

    if (sortBy === "price-asc") {
      updated.sort((a, b) => a.discount_price - b.discount_price);
    } else if (sortBy === "price-desc") {
      updated.sort((a, b) => b.discount_price - a.discount_price);
    } else if (sortBy === "new") {
      updated.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredProducts(updated);
  }, [priceFilter, availabilityFilter, sortBy, products]);

  const handleAddToCart = (product) => {
    navigate(`/cart/${product.product_id}`, { state: { product } });
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.product_id}`);
  };

  return (
    <div
      className="pt-5"
      style={{
        backgroundColor: "#fefaea",
        borderRadius: "12px",
        color: "#6D1D11",
      }}
    >
      <div className="container">
        {/* ✅ Filter Section */}
        <FilterSection
          category={categoryFilter}
          onCategoryChange={setCategoryFilter}
          onPriceChange={setPriceFilter}
          onSortChange={setSortBy}
          onAvailabilityChange={setAvailabilityFilter}
          onClearFilters={() => {
            setCategoryFilter("all");
            setPriceFilter("all");
            setSortBy("best");
            setAvailabilityFilter("all");
          }}
        />

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ letterSpacing: "1px" }}>
            ✨ Shop Our Best Sellers ✨
          </h1>
          <p className="text-muted small">
            Discover handpicked items curated specially for you
          </p>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.product_id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              >
                <div
                  className="card h-100 border-0 shadow-sm w-100"
                  style={{
                    backgroundColor: "rgb(254, 250, 234)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-6px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  {/* Image */}
                  <div
                    className="position-relative"
                    style={{
                      aspectRatio: "303/406",
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: "8px 8px 0 0",
                    }}
                  >
                    <img
                      src={`https://jyotisika.in/jyotisika_test/uploads/products/${product.product_image}`}
                      className="card-img-top"
                      alt={product.product_name}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "0.4s ease",
                      }}
                    />
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column text-center text-md-start">
                    <h6 className="fw-semibold text-truncate mb-2">
                      {product.product_name}
                    </h6>
                    <p className="small text-muted mb-3 d-none d-md-block">
                      {product.product_description?.substring(0, 60)}...
                    </p>

                    {/* Price */}
                    <div className="mb-3">
                      <span className="fw-bold fs-6">
                        ₹{product.discount_price}
                      </span>
                      {product.product_price !== product.discount_price && (
                        <del className="ms-2 text-muted small">
                          ₹{product.product_price}
                        </del>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto d-flex flex-column flex-sm-row justify-content-center gap-2">
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#E17100",
                          color: "#fff",
                          borderRadius: "20px",
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        🛒 Add
                      </button>
                      <button
                        className="btn btn-sm border"
                        style={{
                          borderColor: "#E17100",
                          color: "#E17100",
                          borderRadius: "20px",
                        }}
                        onClick={() => handleViewProduct(product)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>

        {/* View More */}
        <div className="text-center mt-5">
          <Link
            to="/shop"
            className="btn border border-2 border-dark px-4 py-2"
            style={{
              backgroundColor: "#E17100",
              color: "#fff",
              borderRadius: "30px",
              fontWeight: "500",
            }}
          >
            View More Products →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopSection;
