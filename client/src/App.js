import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import ShoppingCart from "./Components/SC/ShoppingCart";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Demo from "./Components/Demo/Demo";
import LoginForm from "./Components/Signup/LoginForm";
import { useDispatch, useSelector } from "react-redux";

const mockUserData = [
  {
    username: "Rohith",
    email: "r@g.com",
    password: "RB",
    cart: [],
  },
];

const App = () => {
  const dispatcher = useDispatch();

  const navigate = useNavigate();

  const signInHandler = (details) => {
    for (let i of mockUserData) {
      if (i.email === details.email && i.password === details.password) {
        dispatcher({ type: "login", value: i });
        console.log("Logged in");
        navigate("/");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/cart" element={<ShoppingCart />} exact />
        <Route
          path="/signin"
          element={<LoginForm onSignin={signInHandler} />}
          exact
        />
        <Route path="/add-product/:id" element={<Demo />} exact />
      </Routes>
    </div>
  );
};

export default App;
