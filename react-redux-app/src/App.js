import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductListing from './components/ProductListing/ProductListing';
import Header from './components/Header/Header';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Home from './components/Home/Home';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import NotFound from './components/NotFound/NotFound';
import Checkout from './components/Checkout/Checkout';
import Login from "./components/Login/Login";
import AdminProductSales from "./components/Admin-ProductSales/AdminProductSales";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminProductSales" element={<AdminProductSales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
