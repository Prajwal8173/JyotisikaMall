import React, { useEffect, useState } from "react";
import "../styles/CartPage.css";
import { useNavigate } from "react-router-dom";


const BASE_URL = "https://jyotisika.in/jyotisika_test/User_Api_Controller";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    price: 0,
    discount: 40,
    shipping: "Free",
    couponApplied: 0,
    total: 0,
    deliveryDate: "01 Feb, 2023",
  });

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/address");
  };

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const userId = 7; // replace with real user id

  // Helper: safe map for product details (robust to different API field names)
  const mapProductDetails = (pd = {}) => {
    const image =
      pd.product_image ||
      pd.product_images?.[0] ||
      pd.image ||
      pd.product_img ||
      pd.product_picture ||
      "";
    const name = pd.product_name || pd.name || "Product";
    const price = parseFloat(pd.product_price || pd.price || pd.product_price_inr || 0);
    const color = pd.product_color || pd.color || "";
    const id = pd.product_id || pd.id || "";
    return { id, name, price: isNaN(price) ? 0 : price, color, image };
  };

 
  useEffect(() => {
    async function loadCart() {
      setLoading(true);
      try {
        const cartResp = await fetch(`${BASE_URL}/GetCartData?user_id=${userId}`);
        const cartJson = await cartResp.json();

        if (cartJson.status !== "success" || !Array.isArray(cartJson.data)) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        // For now: fetch product details for each cart item
        const items = await Promise.all(
          cartJson.data.map(async (ci) => {
            // ci likely contains cart_id (id), product_id, quantity
            const cartId = ci.id || ci.cart_id || ci.cartid || ci.cartId || ci.cart_id;
            const productId = ci.product_id || ci.productId || ci.productId;
            const qty = Number(ci.quantity || ci.qty || 1);

            // call get_specific_product
            try {
              const detRes = await fetch(
                `${BASE_URL}/get_specific_product?product_id=${productId}`
              );
              const detJson = await detRes.json();
              // detJson.data might be array or object
              const raw = Array.isArray(detJson.data) ? detJson.data[0] : detJson.data || {};
              const details = mapProductDetails(raw);

              // ensure image is a full URL — if API returns relative path, adjust here
              // (if images are relative like "uploads/..", prepend base domain)
              let img = details.image || "";
              if (img && !img.startsWith("http")) {
                // try to form absolute URL — adjust domain as needed
                img = img.startsWith("/") ? `https://jyotisika.in${img}` : `https://jyotisika.in/${img}`;
              }
              details.image = img || "https://via.placeholder.com/300?text=Product";

              return {
                cartId,
                productId,
                quantity: qty,
                details,
              };
            } catch (err) {
              // fallback if product fetch fails
              return {
                cartId,
                productId,
                quantity: qty,
                details: {
                  id: productId,
                  name: "Product",
                  price: 0,
                  color: "",
                  image: "https://via.placeholder.com/300?text=Product",
                },
              };
            }
          })
        );

        setCartItems(items);
        calculateSummary(items, summary.couponApplied);
      } catch (err) {
        console.error("Cart load error:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recalculate summary
  const calculateSummary = (items, couponApplied = summary.couponApplied) => {
    // Sum price item by item (price * qty)
    const price = items.reduce((acc, it) => {
      const p = Number(it.details?.price || 0);
      const q = Number(it.quantity || 1);
      return acc + p * q;
    }, 0);

    const discount = summary.discount || 0;
    let total = price - discount - (couponApplied || 0);
    if (total < 0) total = 0;

    setSummary((s) => ({ ...s, price, discount, couponApplied, total }));
  };

  // Update quantity (calls API)
  const updateQuantity = async (cartId, newQty) => {
    if (newQty < 1) return;
    try {
      await fetch(`${BASE_URL}/updateQuantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: cartId, quantity: newQty }),
      });
      const updated = cartItems.map((it) =>
        (it.cartId === cartId || it.cart_id === cartId) ? { ...it, quantity: newQty } : it
      );
      setCartItems(updated);
      calculateSummary(updated, summary.couponApplied);
    } catch (err) {
      console.error("updateQuantity error", err);
    }
  };

  // Remove item from cart
  const removeItem = async (cartId) => {
    try {
      await fetch(`${BASE_URL}/deleteproductfromcart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: cartId }),
      });
      const updated = cartItems.filter((it) => !(it.cartId === cartId || it.cart_id === cartId));
      setCartItems(updated);
      calculateSummary(updated, summary.couponApplied);
    } catch (err) {
      console.error("removeItem error", err);
    }
  };

  // Apply a coupon (simple local demo: JYOTISIKA gives ₹1499 off)
  const applyCoupon = (e) => {
    e.preventDefault();
    const code = (couponCode || "").trim().toUpperCase();
    if (!code) {
      setCouponMessage("Enter coupon code");
      return;
    }
    if (code === "JYOTISIKA") {
      const couponValue = 1499;
      setCouponMessage(`Coupon applied: You saved ₹${couponValue}`);
      calculateSummary(cartItems, couponValue);
      setCouponCode(code);
    } else {
      setCouponMessage("Invalid or expired coupon");
      // remove any previous coupon
      calculateSummary(cartItems, 0);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Left: Items */}
        <div className="cart-left">
          <div className="cart-header">
            <h1 className="title">Cart</h1>
            <div className="items-count">{cartItems.length} ITEMS</div>
          </div>

          {loading ? (
            <div className="empty-note">Loading cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="empty-note">Your cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.cartId || item.productId}>
                <img
                  src={item.details.image}
                  alt={item.details.name}
                  className="product-image"
                />
                <div className="item-body">
                  <div className="item-top">
                    <div>
                      <div className="product-name">{item.details.name}</div>
                      <div className="product-color">
                        Color: <span className="color-value">{item.details.color || "Default"}</span>
                      </div>
                    </div>
                    <div className="price-block">₹{Number(item.details.price).toFixed(2)}</div>
                  </div>

                  <div className="item-controls">
                    <div className="qty-box">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.cartId, Number(item.quantity) - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <div className="qty-value">{item.quantity}</div>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.cartId, Number(item.quantity) + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-link"
                      onClick={() => removeItem(item.cartId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          <hr className="divider" />

          <div className="discount-banner">
            <div className="percent">%</div>
            <div className="discount-text">
              10% Instant Discount with Federal Bank Debit Cards on a min spend of $150. TCA
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <aside className="cart-right">
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Price</span>
              <span>₹{(summary.price || 0).toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <span>₹{(summary.discount || 0).toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="shipping">{summary.shipping}</span>
            </div>

            <div className="summary-row">
              <span>Coupon Applied</span>
              <span>₹{(summary.couponApplied || 0).toFixed(2)}</span>
            </div>

            <div className="summary-hr" />

            <div className="summary-total-row">
              <span>TOTAL</span>
              <span className="total-value">₹{(summary.total || 0).toFixed(2)}</span>
            </div>

            <div className="estimated">
              Estimated Delivery by <strong>{summary.deliveryDate}</strong>
            </div>

            {/* Coupon input box (styled like screenshot) */}
            <form className="coupon-box" onSubmit={applyCoupon}>
              <input
                className="coupon-input"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponMessage("");
                }}
              />
              <button className="coupon-tag" type="submit" title="Apply">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M21 10v4a3 3 0 0 1-3 3h-2l-3 3-3-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            {couponMessage && <div className="coupon-message">{couponMessage}</div>}

            {/* Offers card */}
            <div className="offer-card" role="region" aria-label="offers">
              <div className="offer-left">
                <div className="offer-tag">JYOTISIKAOFFER</div>
                <div className="offer-text">You save ₹1499</div>
              </div>
              <button
                className="offer-apply"
                onClick={() => {
                  setCouponCode("JYOTISIKA");
                  setCouponMessage("Coupon applied: You saved ₹1499");
                  calculateSummary(cartItems, 1499);
                }}
              >
                Apply
              </button>
            </div>

            <button className="view-offers">View All Offers ›</button>

             <button className="checkout-btn" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
