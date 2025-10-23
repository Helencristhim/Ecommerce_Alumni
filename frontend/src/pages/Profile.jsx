import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', marginBottom: '40px' }}>My Profile</h1>
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
          maxWidth: '600px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Name:</label>
            <p>{user?.name}</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email:</label>
            <p>{user?.email}</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Role:</label>
            <p>{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
