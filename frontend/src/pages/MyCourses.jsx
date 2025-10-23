import React from 'react';

const MyCourses = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>My Courses</h1>
        <div className="text-center" style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📚</div>
          <h2 style={{ marginBottom: '20px' }}>Your Enrolled Courses</h2>
          <p style={{ color: 'var(--gray-600)' }}>
            Your purchased courses will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
