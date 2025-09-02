import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./components/ProductPage";
import AddressPage from "./components/AddressPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Cart page route */}
        <Route path="/" element={<CartPage />} />

        {/* Address page route */}
        <Route path="/address" element={<AddressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
