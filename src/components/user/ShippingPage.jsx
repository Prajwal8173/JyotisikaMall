import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get data passed from AddressPage
  const { selectedAddress, cartSummary, product } = location.state || {};

  const [shippingMethod, setShippingMethod] = useState("free");

  const shippingOptions = [
    {
      id: "free",
      label: "Free",
      description: "Regular Shipment",
      date: "01 Feb, 2023",
      price: 0,
    },
    {
      id: "priority",
      label: "$8.50",
      description: "Priority Shipping",
      date: "28 Jan, 2023",
      price: 8.5,
    },
    {
      id: "schedule",
      label: "Schedule",
      description: "Choose a date that works for you.",
      date: "Select Date",
      price: 0,
    },
  ];

  const handleProceedCheckout = () => {
    navigate("/payment", {
      state: { selectedAddress, cartSummary, product, shippingMethod },
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 flex justify-center items-start p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* Left Section - Shipment Method */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Shipment Method</h2>
          <div className="space-y-4">
            {shippingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition ${
                  shippingMethod === option.id
                    ? "border-black bg-gray-50"
                    : "border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === option.id}
                    onChange={() => setShippingMethod(option.id)}
                  />
                  <div>
                    <p className="font-medium">
                      {option.label}{" "}
                      <span className="text-gray-600">{option.description}</span>
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 font-medium">{option.date}</p>
              </label>
            ))}
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          {/* Product Card (from AddressPage) */}
          {product && (
            <div className="flex items-center mb-4">
              <img
                src={`https://jyotisika.in/jyotisika_test/uploads/products/${product.product_image}`}
                alt={product.product_name}
                className="w-16 h-16 object-cover rounded-lg border"
              />
              <div className="ml-3">
                <h4 className="text-sm font-semibold">{product.product_name}</h4>
                <p className="text-sm text-gray-600">₹{product.product_price}</p>
              </div>
            </div>
          )}

          {/* Cart Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price</span>
              <span>₹{cartSummary?.price || 891}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{cartSummary?.discount || 40}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-orange-500">
                {shippingMethod === "priority" ? "₹700 (₹8.50)" : "Free"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Coupon Applied</span>
              <span>₹0.00</span>
            </div>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-semibold">
            <span>TOTAL</span>
            <span>₹{cartSummary?.total || 861}</span>
          </div>

          <p className="text-sm mt-2">
            Estimated Delivery by{" "}
            <span className="font-semibold">
              {shippingMethod === "priority" ? "28 Jan, 2023" : "01 Feb, 2023"}
            </span>
          </p>

          {/* Coupon Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>

          {/* Coupon Suggestion */}
          <div className="mt-3 border rounded-xl p-3 flex justify-between items-center bg-gray-50">
            <span className="text-xs text-gray-600">
              JYOTISIKAOFFFER <span className="text-green-600">You save ₹1499</span>
            </span>
            <button className="text-green-600 font-semibold">Apply</button>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceedCheckout}
            className="w-full mt-5 bg-orange-500 text-white font-semibold py-3 rounded-xl"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
