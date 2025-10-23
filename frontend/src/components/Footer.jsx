import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--primary-black)',
      color: 'white',
      padding: '3rem 0',
      marginTop: 'auto'
    }}>
      <div className="container text-center">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>
            alumni <span style={{ color: 'white' }}>by better</span>
          </h3>
          <p>Transform your future with English today.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <div>
            <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/courses" style={{ color: 'white', textDecoration: 'none' }}>Browse Courses</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/support" style={{ color: 'white', textDecoration: 'none' }}>Help Center</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/terms" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>Connect</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>Facebook</li>
              <li style={{ marginBottom: '0.5rem' }}>Instagram</li>
              <li style={{ marginBottom: '0.5rem' }}>LinkedIn</li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 215, 0, 0.3)',
          paddingTop: '2rem',
          color: 'var(--gray-400)'
        }}>
          <p>&copy; 2024 Alumni by Better. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
