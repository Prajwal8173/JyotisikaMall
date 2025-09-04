import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import AddressPage from "./components/AddressPage";
import Home from "./components/Home";
import Herobanner from "./components/Herobanner";
import ShopSection from "./components/ShopSection";
import FilterSection from "./components/FilterSection";
import Rudraksha from "./components/Rudraksha";
import Footer from "./components/FooterFeatures";
import Myaccount from "./components/Myaccount.jsx";
import BraceletsPage from "./components/BraceletsPage.jsx";
import PendantsPage from "./components/PendantsPage.jsx";
import StonesPage from "./components/StonesPage.jsx";


import AccountForm from "./components/AccountForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/*Home page*/}

        <Route path="/home" element={<>
        < Home/>
        < Herobanner/>
        < ShopSection/>
        </>} />
          <Route path="/bracelets" element={<BraceletsPage />} />
        <Route path="/pendants" element={<PendantsPage />} />
        <Route path="/stones" element={<StonesPage />} />

        {/* My account page*/}
        <Route path="/myaccount" element={<> <Home/> <Myaccount />
            
        </>} />

        

        {/* second  shopping page */}
        <Route path="/shop" element={<>
        < Home/>
        < Herobanner/>
        < FilterSection/>
        < Rudraksha/>
        < Footer/>

        </>} />

        {/* Cart page route */}
        <Route path="/" element={<ProductPage />} />

        {/* Address page route */}
        <Route path="/address" element={<AddressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
