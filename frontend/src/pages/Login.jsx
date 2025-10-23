import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px', textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ color: 'var(--gray-600)', marginBottom: '30px', textAlign: 'center' }}>
          Login to access your courses
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '20px' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--gray-600)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-gold)' }}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
