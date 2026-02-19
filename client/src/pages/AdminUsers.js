
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../services/adminService';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  const handleViewUser = (userId) => {
    // Navigate to user details page or show modal
    alert(`Viewing details for user: ${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(userId);
        // Refresh user list
        fetchUsers();
      } catch (error) {
        alert('Failed to delete user: ' + error.message);
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      fetchUsers(); // Refresh list
    } catch (error) {
      alert('Failed to update role: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={fetchUsers}>Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <h1 className="page-title">BookStore(Admin)</h1>
      
      <div className="admin-nav">
        <Link to="/admin/dashboard" className="nav-link">Home</Link>
        <Link to="/admin/users" className="nav-link active">Users</Link>
        <Link to="/admin/sellers" className="nav-link">Sellers</Link>
        <Link to="/logout" className="nav-link logout">Logout (admin)</Link>
      </div>

      <h2 className="section-title">Users</h2>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td className="user-id-cell">{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="role-select"
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => handleViewUser(user._id)}
                  >
                    View
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;