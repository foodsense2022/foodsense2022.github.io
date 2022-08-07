//import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Reset from './pages/reset.js';
import MyAccount from './pages/myaccount.js';
import RestaurantPage from './pages/restaurantPage.js';
import Restaurant from './pages/restaurant.js';
import NearMe from './pages/nearme.js';
import Recommend from './pages/recommend.js';
import Test from './test.js';
import Slideshow from './components/Slideshow.js';

function App() {

  useEffect(() => {
    document.title = "FoodSense"
  }, [])

  return (
    <BrowserRouter>
        <Routing />
    </BrowserRouter>
  );
}

function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/reset" element={<Reset />} />
      <Route exact path="/myaccount" element={<MyAccount />} />
      <Route exact path="/restaurant" element={<Restaurant />} />
      <Route exact path="/restaurant/:restaurantId" element={<RestaurantPage />} />
      <Route exact path="/nearme" element={<NearMe />} />
      <Route exact path="/recommend" element={<Recommend />} />
      <Route exact path="/Test" element={<Slideshow />} />
    </Routes>
  );
}


export default App;
