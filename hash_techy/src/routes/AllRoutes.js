import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Cart from "../Pages/Cart";
import Products from "../Pages/Products";
import SingleProduct from "../Pages/SingleProduct";

function Allroutes() {
  return (
    <Routes>
     
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SingleProduct />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default Allroutes