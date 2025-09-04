import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import { Button } from "react-bootstrap";

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
    <div className="bg-[#fdf6e3] min-h-screen p-6 flex flex-col lg:flex-row gap-6">
      {/* Cart Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800">
          Cart <span className="text-sm text-gray-500">{cartItems.length} ITEMS</span>
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 py-4 border-b border-gray-200"
            >
              <img
                src={item.details.image}
                alt={item.details.name}
                className="w-28 h-28 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.details.name}
                </h3>
                <p className="text-gray-500">
                  Color: <span className="font-semibold">{item.details.color}</span>
                </p>
                <p className="font-bold mt-1">₹{item.details.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 border rounded"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Discount Banner */}
        <div className="mt-4 bg-yellow-100 border border-yellow-400 rounded-lg p-3 flex items-center gap-2 text-yellow-800">
          <FaTag />
          <p className="text-sm">
            10% Instant Discount with Federal Bank Debit Cards on a min spend of $150. TCA
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Price</span>
            <span>₹{summary.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>₹{summary.discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-orange-500">{summary.shipping}</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Applied</span>
            <span>₹{summary.couponApplied}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>TOTAL</span>
            <span>₹{summary.total.toFixed(2)}</span>
          </div>
          <div className="text-sm mt-2">
            Estimated Delivery by{" "}
            <span className="font-semibold">{summary.deliveryDate}</span>
          </div>
        </div>

        {/* Coupon Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="w-full border rounded-lg p-2 text-sm"
          />
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mt-2">
            <span className="text-green-600 font-medium text-sm">
              JYOTISIKA OFFER - You save ₹1499
            </span>
            <button className="text-blue-500 text-sm">Apply</button>
          </div>
          <button className="text-xs text-blue-500 mt-1">
            View All Offers
          </button>
        </div>

        {/* Checkout Button */}
        <Button className="w-full bg-orange-500 text-white font-semibold text-lg rounded-xl mt-4 py-2">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
