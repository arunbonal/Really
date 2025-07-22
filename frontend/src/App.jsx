import React from "react";
import BarcodeScanner from "./pages/BarcodeScanner";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FoodProduct from "./pages/Food/FoodProduct";
import BeautyProduct from "./pages/Beauty/BeautyProduct";
import Navbar from "./components/Navbar";
import MedsScanner from "./pages/Meds/MedsScanner";
import MedsProduct from "./pages/Meds/MedsProduct";
import Food from "./pages/Food/Food";
import Beauty from "./pages/Beauty/Beauty";
import Meds from "./pages/Meds/Meds";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { ApiDataProvider } from "./contexts/ApiContext";

const App = () => {
  return (
    <ApiDataProvider>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/product/beauty" element={<Beauty />} />
          <Route path="/product/beauty/scan" element={<ProtectedRoute><BarcodeScanner /></ProtectedRoute>} />
          <Route path="/product/beauty/:barcodeNumber" element={<ProtectedRoute><BeautyProduct /></ProtectedRoute>} />

          <Route path="/product/food" element={<Food />} />
          <Route path="/product/food/scan" element={<ProtectedRoute><BarcodeScanner /></ProtectedRoute>} />
          <Route path="/product/food/:barcodeNumber" element={<ProtectedRoute><FoodProduct /></ProtectedRoute>} />

          <Route path="/product/meds" element={<Meds />} />
          <Route path="/product/meds/scan" element={<ProtectedRoute><MedsScanner /></ProtectedRoute>} />
          <Route path="/product/meds/:medsName" element={<ProtectedRoute><MedsProduct /></ProtectedRoute>} />
        </Routes>
      </div>
    </ApiDataProvider>
  );
};

export default App;
