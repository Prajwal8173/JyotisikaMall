import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";             // ✅ Import Home
import ProductPage from "./components/ProductPage";
import CartPage from "./components/user/cart/CartPage";     // ✅ Import CartPage
import AuthPage from "./components/user/login";
import AddressPage from './components/AddressPage'
import ShippingPage from './components/user/ShippingPage' ;


function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* User authentication */}
        <Route path="/user/login" element={<AuthPage />} />

        {/* Product page */}
        <Route path="/product" element={<ProductPage />} />

        {/* Cart page (dynamic) */}
        <Route path="/cart" element={<CartPage />} />

        {/* Address page */}
        <Route path="/address" element={<AddressPage />} />
        {/* Shipping page */}
        <Route path="/shipping" element={<ShippingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
