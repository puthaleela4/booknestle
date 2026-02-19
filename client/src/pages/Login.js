
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userData = await authService.login(email, password);
      
      // Check if role matches
      if (userData.role !== role) {
        setError(`This account is registered as ${userData.role}, not ${role}`);
        authService.logout();
        setLoading(false);
        return;
      }
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (userData.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">BookStore</h1>
        
        <div className="role-tabs">
          <button 
            className={`role-tab ${role === 'user' ? 'active' : ''}`}
            onClick={() => setRole('user')}
          >
            User
          </button>
          <button 
            className={`role-tab ${role === 'seller' ? 'active' : ''}`}
            onClick={() => setRole('seller')}
          >
            Seller
          </button>
          <button 
            className={`role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
        </div>

        <h2 className="login-subtitle">Login to {role} account</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/register">Create Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;