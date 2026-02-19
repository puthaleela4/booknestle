
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { orderService } from '../services/orderService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    sellers: 0,
    books: 0,
    orders: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, ordersData] = await Promise.all([
        adminService.getDashboardStats(),
        orderService.getAllOrders()
      ]);
      
      setStats(statsData);
      setRecentOrders(ordersData.slice(0, 5)); // Get last 5 orders
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={fetchDashboardData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">BookStore(Admin)</h1>
      
      <div className="admin-nav">
        <Link to="/admin/dashboard" className="nav-link active">Home</Link>
        <Link to="/admin/users" className="nav-link">Users</Link>
        <Link to="/admin/sellers" className="nav-link">Sellers</Link>
        <Link to="/logout" className="nav-link logout">Logout (admin)</Link>
      </div>

      <h2 className="section-title">Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.users}</span>
            <span className="stat-label">USERS</span>
          </div>
        </div>

        <div className="stat-card vendors">
          <div className="stat-icon">
            <i className="fas fa-store"></i>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.sellers}</span>
            <span className="stat-label">Vendors</span>
          </div>
        </div>

        <div className="stat-card items">
          <div className="stat-icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.books}</span>
            <span className="stat-label">Items</span>
          </div>
        </div>

        <div className="stat-card orders">
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.orders}</span>
            <span className="stat-label">Total Orders</span>
          </div>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order._id}>
                <td>{order._id.slice(-8)}</td>
                <td>{order.user?.name || 'N/A'}</td>
                <td>${order.totalAmount}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;