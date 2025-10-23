import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <nav style={{
      background: 'linear-gradient(135deg, var(--primary-black) 0%, var(--gray-800) 100%)',
      color: 'white',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          <span style={{ color: 'var(--primary-gold)' }}>alumni</span>
          {' '}
          <span style={{ color: 'white' }}>by better</span>
        </Link>

        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '2rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          margin: 0
        }}>
          <li>
            <Link to="/courses" style={{
              color: 'white',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}>
              Courses
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/my-courses" style={{ color: 'white', textDecoration: 'none' }}>
                  My Courses
                </Link>
              </li>
              <li>
                <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                  {user?.name || 'Profile'}
                </Link>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <Link to="/admin" style={{ color: 'var(--primary-gold)', textDecoration: 'none' }}>
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button onClick={logout} style={{
                  background: 'transparent',
                  border: '2px solid var(--primary-gold)',
                  color: 'var(--primary-gold)',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  cursor: 'pointer'
                }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                  Register
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/cart" style={{
              background: 'var(--primary-gold)',
              color: 'var(--primary-black)',
              padding: '8px 20px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Cart ({getTotalItems()})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
