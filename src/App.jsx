import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import AddressPage from "./components/AddressPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Cart page route */}
        <Route path="/" element={<ProductPage />} />

        {/* Address page route */}
        <Route path="/address" element={<AddressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
