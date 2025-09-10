import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductPage.css"; // ✅ custom CSS for polish

export default function ProductPage() {
  const { id } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [showAllGallery, setShowAllGallery] = useState(false);

  const BASE_URL = "https://jyotisika.in/jyotisika_test";

  const getImageUrl = (img) => {
    if (!img) return null;
    return `${BASE_URL}/uploads/products/${img}`;
  };

  useEffect(() => {
    // ✅ fetch specific product
    const formData = new FormData();
    formData.append("product_id", id);

    axios
      .post(`${BASE_URL}/User_Api_Controller/get_specific_product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.status === "success") {
          // sometimes backend returns array, sometimes object
          setProduct(Array.isArray(res.data.data) ? res.data.data[0] : res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching product:", err));

    // ✅ fetch top products
    axios
      .get(`${BASE_URL}/User_Api_Controller/Get_top_products`)
      .then((res) => {
        if (res.data.status === "success") setTopProducts(res.data.data.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching top products:", err));

    // ✅ fetch reviews
    axios
      .get(`${BASE_URL}/User_Api_Controller/show_product_feedback_data`)
      .then((res) => {
        if (res.data.status === "success") setReviews(res.data.data);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center py-5">Loading product details...</p>;
  }

  const handlePrev = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };
  const handleNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  // images array (can extend later if backend gives multiple images)
  const productImages = [product.product_image];

  return (
    <div className="container py-5 product-page">
      {/* -------- (1) Product Main Section -------- */}
      <div className="row g-5 mb-5">
        {/* Images */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            {getImageUrl(productImages[selectedImage]) && (
              <img
                src={getImageUrl(productImages[selectedImage])}
                alt={product.product_name}
                className="card-img-top img-fluid rounded"
              />
            )}
            <div className="d-flex justify-content-center p-3 gap-2">
              {productImages.map(
                (img, i) =>
                  getImageUrl(img) && (
                    <img
                      key={i}
                      src={getImageUrl(img)}
                      alt="thumb"
                      className={`img-thumbnail ${
                        selectedImage === i ? "border-primary" : ""
                      }`}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedImage(i)}
                    />
                  )
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="col-md-6">
          <h1 className="fw-bold">{product.product_name}</h1>
          <p className="text-muted">{product.product_description}</p>
          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="fs-3 fw-bold text-success">₹{product.discount_price}</span>
            <span className="text-decoration-line-through text-muted">
              ₹{product.product_price}
            </span>
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-primary px-4">Add to Cart</button>
            <button className="btn btn-success px-4">Buy Now</button>
          </div>
        </div>
      </div>

      {/* -------- (2) Description Section -------- */}
      <section className="description">
        <h2>Why Choose Us?</h2>
        <p className="tagline">Genuine, trusted, and made with love</p>

        <div className="description-grid">
          {[
            {
              title: "100% Made in India",
              desc: "Supports fulfilling employment & independence in India.",
              bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Return & Exchange",
              desc: "Simple & easy return/exchange policy for your convenience.",
              bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Small Actions, Big Changes",
              desc: "Every purchase supports artisans & spreads positive energy.",
              bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Care Guidelines",
              desc: "Protect from chemicals, perfumes, and harsh cleaners.",
              bg: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
            },
          ].map((item, i) => (
            <div
              className="desc-item"
              key={i}
              style={{ backgroundImage: `url(${item.bg})` }}
            >
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------- (3) Jyotisika Promise Section -------- */}
      <section className="text-center py-5 bg-light rounded mb-5">
        <p className="fw-bold text-uppercase text-muted">
          {reviews.length}+ Reviews have switched to{" "}
          <span className="text-primary">Jyotisika</span>
        </p>
        <h2 className="fw-bold mb-3">Jyotisika Promise</h2>
        <p className="text-muted mb-3">
          Hear from the actors who have elevated their confidence & health.
        </p>
        <div className="text-warning fs-4 mb-4">⭐⭐⭐⭐⭐ 1000+ Reviews</div>

        {reviews.length > 0 && (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <button className="btn btn-outline-secondary btn-sm" onClick={handlePrev}>
              ⬅
            </button>
            <div className="card shadow-sm border-0 p-3" style={{ width: "320px" }}>
              {getImageUrl(reviews[currentReview].user_image) && (
                <img
                  src={getImageUrl(reviews[currentReview].user_image)}
                  alt={reviews[currentReview].user_name}
                  className="rounded-circle mx-auto mb-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              )}
              <h5 className="fw-bold">
                ⭐ {reviews[currentReview].title || "Customer Review"}
              </h5>
              <p className="fst-italic">"{reviews[currentReview].message}"</p>
              <span className="fw-semibold">- {reviews[currentReview].user_name}</span>
            </div>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleNext}>
              ➡
            </button>
          </div>
        )}
      </section>

      {/* -------- (4) Top Shopseller Section -------- */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4">Top Shopseller</h2>
        <div className="row g-4">
          {topProducts.map(
            (r) =>
              getImageUrl(r.product_image) && (
                <div className="col-md-3 col-sm-6" key={r.product_id}>
                  <div className="card shadow-sm border-0 h-100">
                    <img
                      src={getImageUrl(r.product_image)}
                      alt={r.product_name}
                      className="card-img-top rounded-top"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{r.product_name}</h5>
                      <p className="fw-bold text-success">₹{r.discount_price}</p>
                      <button className="btn btn-outline-primary btn-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      {/* -------- (5) Abstract Gallery Section -------- */}
      <section className="gallery py-5 bg-light rounded mb-5">
        <h2 className="fw-bold text-center mb-3">150+ Happy Customers</h2>
        <p className="text-muted text-center">
          Real photos shared by happy customers
        </p>

        <div className="mosaic-gallery mt-4">
          {[
            {
              id: 1,
              img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
              user: "John D.",
              text: "Love the quality!",
            },
            {
              id: 2,
              img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
              user: "Neha P.",
              text: "Looks amazing on me.",
            },
            {
              id: 3,
              img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
              user: "Arjun K.",
              text: "Perfect fit and finish.",
            },
            {
              id: 4,
              img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
              user: "Meera S.",
              text: "Great packaging & delivery.",
            },
            {
              id: 5,
              img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
              user: "Samir R.",
              text: "Worth every penny.",
            },
            {
              id: 6,
              img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&q=80",
              user: "Amit K.",
              text: "Amazing craftsmanship.",
            },
            {
              id: 7,
              img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
              user: "Priya S.",
              text: "Absolutely loved it!",
            },
            {
              id: 8,
              img: "https://images.unsplash.com/photo-1520975918318-3f76a1f4f5d4?auto=format&fit=crop&w=800&q=80",
              user: "Karan V.",
              text: "Superb experience!",
            },
            {
              id: 9,
              img: "https://images.unsplash.com/photo-1516728778615-2d590ea185a6?auto=format&fit=crop&w=800&q=80",
              user: "Anjali M.",
              text: "Highly recommended.",
            },
          ]
            .slice(0, showAllGallery ? 9 : 6)
            .map((g, i) => (
              <div key={g.id} className={`mosaic-item item-${i + 1}`}>
                <img src={g.img} alt={g.user} />
                <div className="overlay">
                  <p>"{g.text}"</p>
                  <span>- {g.user}</span>
                </div>
              </div>
            ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary px-4"
            onClick={() => setShowAllGallery(!showAllGallery)}
          >
            {showAllGallery ? "View Less" : "View More"}
          </button>
        </div>
      </section>
    </div>
  );
}
