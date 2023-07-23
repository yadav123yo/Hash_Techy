import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Cart from "../Pages/Cart";
import Products from "../Pages/Products";
import NavBar from "../components/Navbar";
import PrivateRoute from "./private";
import Order from "../Pages/Order";

function Allroutes() {
  return (
    <Routes>
     
      <Route path="/" element={<> <NavBar/> <Login /> </>} />
      <Route path="/signup" element={<> <NavBar/>  <Signup /> </>}/>
      <Route path="/products" element={ <> <NavBar/> <PrivateRoute> <Products /> </PrivateRoute> </>} />

      <Route path="/cart" element={<> <NavBar/> <PrivateRoute> <Cart /></PrivateRoute> </>} />
      <Route path="/order" element={<> <NavBar/> <PrivateRoute> <Order /></PrivateRoute> </>} />

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default Allroutes