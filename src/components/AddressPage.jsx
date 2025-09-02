import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AddressPage.css';

const BASE_URL = 'https://jyotisika.in/jyotisika_test';

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartSummary, setCartSummary] = useState(null);
  const [product, setProduct] = useState(null);

  // Fetch saved addresses
  const fetchAddresses = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/User_Api_Controller/get_delivery_address`, {
        user_id: 1, // temp static user
      });
      if (res.data.status === 'success') {
        setAddresses(res.data.data);
        setSelectedAddress(res.data.data[0]?.id || null);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  // Fetch random product for order summary (demo)
  const fetchProduct = async () => {
    try {
      const randomId = 22; // Using static product ID
      const res = await axios.post(`${BASE_URL}/User_Api_Controller/get_specific_product`, {
        product_id: randomId,
      });
      if (res.data.status === 'success') {
        setProduct(res.data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Fetch cart summary (demo static values for now)
  const fetchCartSummary = () => {
    setCartSummary({
      price: 2000,
      discount: 200,
      delivery: 'Free',
      total: 1800,
    });
  };

  useEffect(() => {
    fetchAddresses();
    fetchProduct();
    fetchCartSummary();
  }, []);

  return (
    <div className="page-container">
      {/* Left Section - Address */}
      <div className="address-section">
        <div className="address-header">
          Address <span>› Shipping › Payment</span>
        </div>

        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className={`address-card ${selectedAddress === addr.id ? 'active' : ''}`}
              onClick={() => setSelectedAddress(addr.id)}
            >
              <div className="address-left">
                <div className="address-title">
                  <h3>{addr.name}</h3>
                  <span className="address-type">{addr.address_type}</span>
                </div>
                <div className="address-text">
                  {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                </div>
              </div>
              <div className="address-actions">
                <button className="edit">Edit</button>
                <button className="remove">Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No saved addresses found.</p>
        )}

        <div className="add-address-btn">+ Add New Address</div>
      </div>

      {/* Right Section - Summary */}
      <div className="summary-section">
        <h3>Order Summary</h3>

        {product && (
          <div className="product-card">
            <img src={product.product_image} alt={product.product_name} className="product-image" />
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
              <span>Delivery</span>
              <span>{cartSummary.delivery}</span>
            </div>
            <div className="summary-total">
              Total: ₹{cartSummary.total}
            </div>
            <div className="estimated-delivery">
              Estimated delivery: 4–6 days
            </div>
          </>
        )}

        <input
          type="text"
          placeholder="Apply coupon"
          className="coupon-input"
        />
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}
