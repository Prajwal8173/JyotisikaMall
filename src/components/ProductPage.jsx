import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProductPage.css";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  // 🔹 Helper to build full image path
  const getImageUrl = (img) => {
    if (!img) return "";
    return `https://jyotisika.in/jyotisika_test/uploads/products/${img}`;
  };

  // Fetch Rudraksha products
  useEffect(() => {
    axios
      .get("https://jyotisika.in/jyotisika_test/User_Api_Controller/show_rudraksh")
      .then((res) => {
        if (res.data.status === "success") {
          setProducts(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch top products
    axios
      .get("https://jyotisika.in/jyotisika_test/User_Api_Controller/Get_top_products")
      .then((res) => {
        if (res.data.status === "success") {
          setTopProducts(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching top products:", err));

    // Fetch reviews
    axios
      .get("https://jyotisika.in/jyotisika_test/User_Api_Controller/show_product_feedback_data")
      .then((res) => {
        if (res.data.status === "success") {
          setReviews(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  if (products.length === 0) {
    return <p>Loading product details...</p>;
  }

  const mainProduct = products[0]; // for demo, using the first product

  return (
    <div className="product-page">
      {/* -------- (1) Product Main Section -------- */}
      <div className="product-main">
        <div className="product-images">
          <img
            src={getImageUrl(mainProduct.product_image)}
            alt={mainProduct.product_name}
            className="main-image"
          />
          <div className="thumbnail-row">
            {[mainProduct.product_image].map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                alt="thumb"
                className={`thumb ${selectedImage === i ? "active" : ""}`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{mainProduct.product_name}</h1>
          <p className="desc">{mainProduct.product_description}</p>
          <div className="price-section">
            <span className="discount-price">₹{mainProduct.discount_price}</span>
            <span className="original-price">₹{mainProduct.product_price}</span>
          </div>
          <div className="buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>

      {/* -------- (2) Description Section -------- */}
      <section className="description">
        <h2>Description</h2>
        <p className="tagline">Genuine & Original</p>
        <div className="description-grid">
          <div className="desc-item">100% Made in India</div>
          <div className="desc-item">Return & Exchange</div>
          <div className="desc-item">Small Actions, Big Changes</div>
          <div className="desc-item">Care Guidelines</div>
        </div>
      </section>

      {/* -------- (3) Jyotisika Promise Section -------- */}
      <section className="promise">
        <h2>Jyotisika Promise</h2>
        <div className="promise-list">
          <div className="promise-item">⭐ 100% Authentic Products</div>
          <div className="promise-item">⭐ Certified Rudraksha</div>
          <div className="promise-item">⭐ Handcrafted with Love</div>
          <div className="promise-item">⭐ Trusted by 10,000+ Customers</div>
        </div>
      </section>

      {/* -------- (4) Top Shopseller Section -------- */}
      <section className="related">
        <h2>Top Shopseller</h2>
        <div className="related-list">
          {topProducts.map((r) => (
            <div key={r.product_id} className="related-card">
              <img src={getImageUrl(r.product_image)} alt={r.product_name} />
              <h4>{r.product_name}</h4>
              <p>₹{r.discount_price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* -------- (5) Reviews Section -------- */}
      <section className="reviews">
        <h2>{reviews.length}+ Honest Reviews</h2>
        <div className="review-list">
          {reviews.map((rev) => (
            <div key={rev.product_feedback_id} className="review-card">
              <img src={getImageUrl(rev.user_image)} alt={rev.user_name} />
              <p>"{rev.message}"</p>
              <span>- {rev.user_name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
