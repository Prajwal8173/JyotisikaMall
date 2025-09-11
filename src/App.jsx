import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "./components/Home";             // ✅ Import Home
import ProductPage from "./components/ProductPage";
  // ✅ Import CartPage
import AddressPage from "./components/AddressPage";
import Home from "./components/Home";
import HeroBanner from "./components/HeroBanner";
import ShopSection from "./components/ShopSection";
import Shoppage from "./components/Shoppage.jsx";
import ShopSection2 from "./components/Shopsection2";

import FilterSection from "./components/FilterSection";
import Rudraksha from "./components/Rudraksha";
import Footer from "./components/FooterFeatures";
import Myaccount from "./components/Myaccount.jsx";
import BraceletsPage from "./components/BraceletsPage.jsx";
import PendantsPage from "./components/PendantsPage.jsx";
import StonesPage from "./components/StonesPage.jsx";

import CheckSession from "./components/CheckSession.jsx";

import AccountForm from "./components/AccountForm.jsx";
import AuthPage from "./components/user/login";

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

<Route path="/checkSession" element={<> <CheckSession />
            
        </>} />

        {/* second  shopping page */}
        <Route path="/shop" element={<>
          <Shoppage/>
        < ShopSection2 />
        < Footer/>
        </>} />
        {/* User authentication */}
        <Route path="/user/login" element={<AuthPage />} />

        {/* Product page */}
        <Route path="/product" element={<ProductPage />} />

        {/* Cart page (dynamic id) */}

        {/* Address page */}
        <Route path="/address" element={<AddressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
