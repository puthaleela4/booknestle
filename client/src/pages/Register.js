
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user', 'seller', or 'admin'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Register attempt:', { name, email, password, role });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">BookStore</h1>
        
        {/* Role Selection Tabs */}
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

        <h2 className="login-subtitle">Create {role} account</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign up
          </button>
        </form>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;