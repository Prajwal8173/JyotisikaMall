import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "./components/Home";             // ✅ Import Home
import ProductPage from "./components/ProductPage";
import CartPage from "./components/user/cart/CartPage.jsx";     // ✅ Import CartPage
import Home from "./components/Home";
import HeroBanner from "./components/HeroBanner";
import ShopSection from "./components/ShopSection";

import FilterSection from "./components/FilterSection";
import Rudraksha from "./components/Rudraksha";
import Footer from "./components/FooterFeatures";
import Myaccount from "./components/Myaccount.jsx";
import BraceletsPage from "./components/BraceletsPage.jsx";
import PendantsPage from "./components/PendantsPage.jsx";
import StonesPage from "./components/StonesPage.jsx";


import AccountForm from "./components/AccountForm.jsx";
import AuthPage from "./components/user/login";
import AddressPage from './components/AddressPage'
import ShippingPage from './components/user/ShippingPage' ;


function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* To resolve conflicts commented by sakshi patil*/}

        <Route path="/home" element={<>
        < Home/>
        < HeroBanner/>
        < ShopSection/>
        </>} />
          {/* <Route path="/bracelets" element={<BraceletsPage />} />
        <Route path="/pendants" element={<PendantsPage />} />
        <Route path="/stones" element={<StonesPage />} /> */}

        {/* My account page*/}
        <Route path="/myaccount" element={<> <Myaccount />
            
        </>} />

        {/* second  shopping page */}
        <Route path="/shop" element={<>
        < Home/>
        < Heroanner/>
       
        < ShopSection />
        < Footer/>

        </>} />
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
