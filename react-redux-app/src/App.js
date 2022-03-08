import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductListing from "./components/ProductListing/ProductListing";
import Header from "./components/Header/Header";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Home from "./components/Home/Home";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import NotFound from "./components/NotFound/NotFound";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import AdminProductSales from "./components/Admin-ProductSales/AdminProductSales";
import AdminProductDiscount from "./components/Admin-ProductDiscount/AdminProductDiscount";
import Register from "./components/Register/Register";
import ShoppingHistory from "./components/ShoppingHistory/ShoppingHistory";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";

function App() {
  // auth reducer
  // after login
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div className="App">
      {currentUser.role === "Admin" ? (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/adminProductSales" element={<AdminProductSales />} />
            <Route
              path="/adminProductDiscount"
              element={<AdminProductDiscount />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      ) : (
        <span>
          {currentUser.role === "Shopper" ? (
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/products" element={<ProductListing />} />
                <Route
                  path="/product/:productId"
                  element={<ProductDetails />}
                />
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/shopping-history" element={<ShoppingHistory />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          ) : (
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          )}
        </span>
      )}
    </div>
  );
}

export default App;
