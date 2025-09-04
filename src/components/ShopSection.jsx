import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ShopSection = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); 
  useEffect(() => {
   
    axios
      .get("https://jyotisika.in/jyotisika_test/User_Api_Controller/getproduct")
      .then((response) => {
        if (response.data.status === "success" && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // ✅ Add to cart handler
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.product_name} added to cart!`);
  };

  return (
    <div className="mt-5 text-center container">
      <h1>Shop Our Best Seller</h1>
      <div className="row mt-5">
        {products.map((product) => (
          <div key={product.product_id} className="col-md-3 col-lg-3 mb-3">
            <div className="card product-card border-0 text-center h-100">
              <div className="position-relative">
                {/* Product image */}
                <img
                  src={`https://jyotisika.in/jyotisika_test/uploads/products/${product.product_image}`}
                  className="card-img-top product-image"
                  alt={product.product_name}
                />

                {/* Discount (if exists) */}
                {product.discount_price && (
                  <span className="discount-badge">
                    ₹{product.product_price - product.discount_price} OFF
                  </span>
                )}
              </div>

              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.product_name}</h6>

                <p className="small text-muted">
                  {product.product_description?.substring(0, 50)}...
                </p>

                {/* Price Section */}
                <div className="price-section mt-auto">
                  <span className="current-price">₹{product.discount_price}</span>
                  {product.product_price !== product.discount_price && (
                    <del className="original-price">₹{product.product_price}</del>
                  )}
                </div>

                {/*  Add to Cart button */}
                <button 
                  className="btn mt-2" style={{backgroundColor:"#f0c14b", borderColor:"#a88734 #9c7e31 #846a29"}}
                  onClick={() => handleAddToCart(product)}
                >  Add to Cart
                </button>

               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopSection;
