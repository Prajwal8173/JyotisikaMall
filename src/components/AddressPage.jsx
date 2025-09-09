import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddressPage.css";

const BASE_URL = "https://jyotisika.in/jyotisika_test";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartSummary, setCartSummary] = useState(null);
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    user_fullname: "",
    user_address: "",
    user_city: "",
    user_state: "",
    user_pincode: "",
    user_phonenumber: "",
    user_email: "",
    session_id: "demo-session-1", // 🔹 Replace with actual session
  });

  const navigate = useNavigate();

  // Fetch saved addresses
  const fetchAddresses = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/User_Api_Controller/get_delivery_address`,
        { session_id: "demo-session-1" }
      );
      if (res.data.status === "success") {
        setAddresses(res.data.data);
        setSelectedAddress(res.data.data[0]?.user_info_id || null);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Add new address
  const saveAddress = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/User_Api_Controller/save_delivery_address`,
        newAddress
      );
      if (res.data.status === "success") {
        alert("Address added successfully");
        setShowForm(false);
        fetchAddresses();
      } else {
        alert("Failed to add address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  // Remove address (dummy: replace with delete API if available)
  const removeAddress = async (id) => {
    alert(`Remove API not provided yet. Removing ID: ${id}`);
    // Example: await axios.post(`${BASE_URL}/User_Api_Controller/delete_delivery_address`, { id });
    fetchAddresses();
  };

  // Fetch product for order summary
  const fetchProduct = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/User_Api_Controller/get_specific_product`,
        { product_id: 22 }
      );
      if (res.data.status === "success") {
        setProduct(res.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Fetch cart summary (static demo)
  const fetchCartSummary = () => {
    setCartSummary({
      price: 2000,
      discount: 200,
      delivery: "Free",
      total: 1800,
    });
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      alert("Please select an address before proceeding.");
      return;
    }
    navigate("/shipping", { state: { selectedAddress, cartSummary, product } });
  };

  useEffect(() => {
    fetchAddresses();
    fetchProduct();
    fetchCartSummary();
  }, []);

  return (
    <div className="page-container">
      {/* -------- Left Section - Addresses -------- */}
      <div className="address-section">
        <div className="address-header">
          <span className="active">Address</span> › <span>Shipping</span> ›{" "}
          <span>Payment</span>
        </div>

        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div
              key={addr.user_info_id}
              className={`address-card ${
                selectedAddress === addr.user_info_id ? "active" : ""
              }`}
            >
              <input
                type="radio"
                checked={selectedAddress === addr.user_info_id}
                onChange={() => setSelectedAddress(addr.user_info_id)}
              />
              <div className="address-details">
                <div className="address-title">
                  <h3>{addr.user_name}</h3>
                  <span className="badge">Home</span>
                </div>
                <p className="address-text">
                  {addr.user_address}, {addr.user_city}, {addr.user_state} -{" "}
                  {addr.user_pincode}
                </p>
                <p>
                  <strong>Contact -</strong> {addr.user_phonenumber}
                </p>
              </div>
              <div className="address-actions">
                <button className="edit">Edit</button>
                <span>|</span>
                <button className="remove" onClick={() => removeAddress(addr.user_info_id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No saved addresses found.</p>
        )}

        <button className="add-address-btn" onClick={() => setShowForm(!showForm)}>
          + Add New Address
        </button>

        {/* Add Address Form */}
        {showForm && (
          <div className="address-form">
            <input
              type="text"
              placeholder="Full Name"
              value={newAddress.user_fullname}
              onChange={(e) => setNewAddress({ ...newAddress, user_fullname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={newAddress.user_address}
              onChange={(e) => setNewAddress({ ...newAddress, user_address: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.user_city}
              onChange={(e) => setNewAddress({ ...newAddress, user_city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.user_state}
              onChange={(e) => setNewAddress({ ...newAddress, user_state: e.target.value })}
            />
            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.user_pincode}
              onChange={(e) => setNewAddress({ ...newAddress, user_pincode: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newAddress.user_phonenumber}
              onChange={(e) => setNewAddress({ ...newAddress, user_phonenumber: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newAddress.user_email}
              onChange={(e) => setNewAddress({ ...newAddress, user_email: e.target.value })}
            />
            <button onClick={saveAddress}>Save Address</button>
          </div>
        )}
      </div>

      {/* -------- Right Section - Order Summary -------- */}
      <div className="summary-section">
        <h3>Order Summary</h3>

        {product && (
          <div className="product-card">
            <img
              src={`https://jyotisika.in/jyotisika_test/uploads/products/${product.product_image}`}
              alt={product.product_name}
              className="product-image"
            />
            <div className="product-info">
              <h4>{product.product_name}</h4>
              <p>₹{product.product_price}</p>
            </div>
          </div>
        )}

        {cartSummary && (
          <>
            <div className="summary-row">
              <span>Price</span>
              <span>₹{cartSummary.price}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>-₹{cartSummary.discount}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">{cartSummary.delivery}</span>
            </div>
            <div className="summary-row">
              <span>Coupon Applied</span>
              <span>₹0.00</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>TOTAL</span>
              <span>₹{cartSummary.total}</span>
            </div>
            <div className="estimated-delivery">
              Estimated Delivery by <strong>01 Feb, 2023</strong>
            </div>
          </>
        )}

        {/* Coupon Section */}
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" className="coupon-input" />
          <div className="coupon-offer">
            <span>JYOTISIKA OFFER - You save ₹1499</span>
            <button>Apply</button>
          </div>
          <button className="view-offers">View All Offers</button>
        </div>

        {/* Checkout Button */}
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}
