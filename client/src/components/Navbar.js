
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  // You can get this from auth context
  const userRole = 'admin'; // or 'seller', 'user'
  const userName = 'adm';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">BookNestle</Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/books" className="nav-link">Books</Link>
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
          <Link to="/orders" className="nav-link">My orders</Link>
          {userRole === 'seller' && (
            <>
              <Link to="/seller/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/seller/items" className="nav-link">Myproducts</Link>
              <Link to="/seller/add-book" className="nav-link">Add Books</Link>
              <Link to="/seller/orders" className="nav-link">Orders</Link>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/admin/users" className="nav-link">Users</Link>
              <Link to="/admin/sellers" className="nav-link">Sellers</Link>
            </>
          )}
          <Link to="/logout" className="nav-link logout">
            Logout ({userName})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;