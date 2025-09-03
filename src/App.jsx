import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import AddressPage from "./components/AddressPage";
import ProductPage from "./components/ProductPage";
import AuthPage from "./components/user/login";

function App() {
  return (
    <Router>
      <Routes>
        {/*Home page*/}

        <Route path="/home" element={<>
        < Home/>
        
       
        </>} />

        {/* user route */}
        <Route path="/user/login" element={<AuthPage />} />
        {/* Product page route */}
        <Route path="/product" element={<ProductPage />} />
        {/* Cart page route */}
        <Route path="/cart/:id" element={<CartPage />} />

        {/* Address page route */}
        <Route path="/address" element={<AddressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
