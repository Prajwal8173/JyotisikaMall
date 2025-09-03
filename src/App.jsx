import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";             // ✅ Import Home
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";     // ✅ Import CartPage
import AddressPage from "./components/AddressPage";
import AuthPage from "./components/user/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/home" element={<Home />} />

        {/* User authentication */}
        <Route path="/user/login" element={<AuthPage />} />

        {/* Product page */}
        <Route path="/product" element={<ProductPage />} />

        {/* Cart page (dynamic id) */}
        <Route path="/cart/:id" element={<CartPage />} />

        {/* Address page */}
        <Route path="/address" element={<AddressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
