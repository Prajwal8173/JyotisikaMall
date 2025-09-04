import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";             // ✅ Import Home
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";     // ✅ Import CartPage
import AddressPage from "./components/AddressPage";
<<<<<<< HEAD
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
=======
import AuthPage from "./components/user/login";
>>>>>>> 464df24b135a5c124ac490e38ba5334d76067112

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/home" element={<Home />} />

<<<<<<< HEAD
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
=======
        {/* User authentication */}
        <Route path="/user/login" element={<AuthPage />} />
>>>>>>> 464df24b135a5c124ac490e38ba5334d76067112

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
