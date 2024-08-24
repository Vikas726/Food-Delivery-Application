import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";

function App() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  return (
    <>
    {
      showLogin && <LoginPopup setShowLogin={setShowLogin}/>
    }
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="order" element={<PlaceOrder />}></Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
