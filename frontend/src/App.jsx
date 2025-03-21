import React from "react";
import BarcodeScanner from "./pages/BarcodeScanner";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FoodProduct from "./pages/Food/FoodProduct";
import Navbar from "./components/Navbar";
import MedsScanner from "./pages/Meds/MedsScanner";
import MedsProduct from "./pages/Meds/MedsProduct";
import Food from "./pages/Food/Food";
import Beauty from "./pages/Beauty/Beauty";
import Meds from "./pages/Meds/Meds";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/beauty" element={<Beauty />} />
        <Route path="/product/beauty/scan" element={<BarcodeScanner />} />

        <Route path="/product/food" element={<Food />} />
        <Route path="/product/food/scan" element={<BarcodeScanner />} />
        <Route path="/product/food/:barcodeNumber" element={<FoodProduct />} />

        <Route path="/product/meds" element={<Meds />} />
        <Route path="/product/meds/scan" element={<MedsScanner />} />
        <Route path="/product/meds/:medsName" element={<MedsProduct />} />
      </Routes>
    </div>
  );
};

export default App;
