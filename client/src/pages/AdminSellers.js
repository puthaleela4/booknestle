
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminSellers.css';

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSellers([
        {
          id: 1,
          sNo: 1,
          userId: "6556da3154802a40600f8409",
          name: "alif",
          email: "alif@gmail.com",
          business: "Alif Books",
          products: 45,
          sales: 234,
          status: "verified",
          joined: "2024-01-10"
        },
        {
          id: 2,
          sNo: 2,
          userId: "6556c432b451e85620ae8d06",
          name: "syed",
          email: "syed@gmail.com",
          business: "Syed Book Store",
          products: 78,
          sales: 567,
          status: "verified",
          joined: "2024-01-15"
        },
        {
          id: 3,
          sNo: 3,
          userId: "a7b8c9d0e1f2a3b4c5d6e7f8",
          name: "rahul",
          email: "rahul@gmail.com",
          business: "Rahul Publications",
          products: 23,
          sales: 89,
          status: "pending",
          joined: "2024-02-01"
        },
        {
          id: 4,
          sNo: 4,
          userId: "g9h0i1j2k3l4m5n6o7p8q9r0",
          name: "priya",
          email: "priya@gmail.com",
          business: "Priya Book Corner",
          products: 56,
          sales: 345,
          status: "verified",
          joined: "2024-01-05"
        },
        {
          id: 5,
          sNo: 5,
          userId: "s1t2u3v4w5x6y7z8a9b0c1d2",
          name: "anand",
          email: "anand@gmail.com",
          business: "Anand Books",
          products: 12,
          sales: 45,
          status: "suspended",
          joined: "2023-12-20"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewSeller = (userId) => {
    alert(`Viewing details for seller: ${userId}`);
    // In real app, navigate to seller details page
  };

  const handleVerifySeller = (sellerId) => {
    setSellers(sellers.map(seller => 
      seller.userId === sellerId 
        ? {...seller, status: 'verified'} 
        : seller
    ));
  };

  const handleSuspendSeller = (sellerId) => {
    setSellers(sellers.map(seller => 
      seller.userId === sellerId 
        ? {...seller, status: 'suspended'} 
        : seller
    ));
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading sellers...</p>
      </div>
    );
  }

  return (
    <div className="admin-sellers">
      <h1 className="page-title">BookStore(Admin)</h1>
      
      {/* Navigation Tabs */}
      <div className="admin-nav">
        <Link to="/admin/dashboard" className="nav-link">Home</Link>
        <Link to="/admin/users" className="nav-link">Users</Link>
        <Link to="/admin/sellers" className="nav-link active">Sellers</Link>
        <Link to="/logout" className="nav-link logout">Logout (syed)</Link>
      </div>

      <h2 className="section-title">Vendors</h2>

      {/* Sellers Table */}
      <div className="sellers-table-container">
        <table className="sellers-table">
          <thead>
            <tr>
              <th>s/mo</th>
              <th>UserId</th>
              <th>User name</th>
              <th>Email</th>
              <th>Business</th>
              <th>Products</th>
              <th>Sales</th>
              <th>Status</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.sNo}</td>
                <td className="user-id-cell">{seller.userId}</td>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.business}</td>
                <td>{seller.products}</td>
                <td>{seller.sales}</td>
                <td>
                  <span className={`status-badge ${seller.status}`}>
                    {seller.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => handleViewSeller(seller.userId)}
                  >
                    view
                  </button>
                  {seller.status === 'pending' && (
                    <button 
                      className="verify-btn"
                      onClick={() => handleVerifySeller(seller.userId)}
                    >
                      ✓
                    </button>
                  )}
                  {seller.status === 'verified' && (
                    <button 
                      className="suspend-btn"
                      onClick={() => handleSuspendSeller(seller.userId)}
                    >
                      ⚠
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSellers;