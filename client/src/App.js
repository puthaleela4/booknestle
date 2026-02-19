import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Public Pages
import Home from './pages/Home';
import Books from './pages/Books';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminSellers from './pages/AdminSellers';

// Seller Pages - Commented out
// import SellerDashboard from './pages/SellerDashboard';
// import SellerItems from './pages/SellerItems';
// import AddBook from './pages/AddBook';
// import SellerOrders from './pages/SellerOrders';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/sellers" element={<AdminSellers />} /> {/* Fixed: removed extra > */}

          {/* Seller Routes - Commented out */}
          {/* <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/items" element={<SellerItems />} />
          <Route path="/seller/add-book" element={<AddBook />} />
          <Route path="/seller/orders" element={<SellerOrders />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;