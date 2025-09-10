import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 🔹 Import navigation hook
import "../../../styles/CartPage.css";

const BASE_URL = "https://jyotisika.in/jyotisika_test/User_Api_Controller";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    price: 0,
    discount: 0,
    shipping: "Free",
    couponApplied: 0,
    total: 0,
    deliveryDate: "01 Feb, 2023",
  });

  const userId = 1; // Static for now, replace with dynamic user
  const navigate = useNavigate(); // 🔹 initialize navigation

  // Fetch cart items and get product details
  useEffect(() => {
    fetch(`${BASE_URL}/GetCartData?user_id=${userId}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status === "success") {
          const productsWithDetails = await Promise.all(
            data.data.map(async (item) => {
              const detailRes = await fetch(
                `${BASE_URL}/get_specific_product?product_id=${item.product_id}`
              ).then((res) => res.json());

              const productDetails = detailRes.data[0];

              return {
                ...item,
                details: {
                  id: productDetails.product_id,
                  name: productDetails.product_name,
                  price: parseFloat(productDetails.product_price),
                  color: productDetails.product_color || "Default",
                  image: productDetails.product_image, // actual image URL
                },
              };
            })
          );
          setCartItems(productsWithDetails);
          calculateSummary(productsWithDetails);
        }
      })
      .catch((err) => console.error("Cart fetch error:", err));
  }, []);

  // Calculate totals
  const calculateSummary = (items) => {
    const price = items.reduce(
      (sum, item) => sum + item.details.price * item.quantity,
      0
    );
    const discount = 40;
    const total = price - discount;
    setSummary((prev) => ({ ...prev, price, discount, total }));
  };

  // Update quantity API
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    fetch(`${BASE_URL}/updateQuantity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart_id: id, quantity: qty }),
    })
      .then(() => {
        const updated = cartItems.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        );
        setCartItems(updated);
        calculateSummary(updated);
      })
      .catch((err) => console.error("Update quantity error:", err));
  };

  // Remove product API
  const removeItem = (id) => {
    fetch(`${BASE_URL}/deleteproductfromcart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart_id: id }),
    })
      .then(() => {
        const updated = cartItems.filter((item) => item.id !== id);
        setCartItems(updated);
        calculateSummary(updated);
      })
      .catch((err) => console.error("Remove item error:", err));
  };

  return (
    <div className="cart-container">
      {/* Cart Section */}
      <div className="cart-items">
        <h2>
          Cart <span>{cartItems.length} ITEMS</span>
        </h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.details.image} alt={item.details.name} />
              <div className="cart-item-details">
                <h3>{item.details.name}</h3>
                <p>
                  Color: <span>{item.details.color}</span>
                </p>
                <p className="price">₹{item.details.price}</p>

                {/* Quantity Controls */}
                <div className="qty-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Discount Banner */}
        <div className="discount-banner">
          <FaTag />
          <p>
            10% Instant Discount with Federal Bank Debit Cards on a min spend of
            $150. TCA
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Price</span>
          <span>₹{summary.price.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Discount</span>
          <span>₹{summary.discount}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>{summary.shipping}</span>
        </div>
        <div className="summary-row">
          <span>Coupon Applied</span>
          <span>₹{summary.couponApplied}</span>
        </div>
        <div className="total-row">
          <span>TOTAL</span>
          <span>₹{summary.total.toFixed(2)}</span>
        </div>
        <div className="delivery-date">
          Estimated Delivery by <strong>{summary.deliveryDate}</strong>
        </div>

        {/* Coupon Input */}
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" />
          <div className="coupon-offer">
            <span>JYOTISIKA OFFER - You save ₹1499</span>
            <button>Apply</button>
          </div>
          <button className="view-offers">View All Offers</button>
        </div>

        {/* Checkout Button */}
        <button
          className="checkout-btn"
          onClick={() => navigate("/address")} // 🔹 Navigate to Address page
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
