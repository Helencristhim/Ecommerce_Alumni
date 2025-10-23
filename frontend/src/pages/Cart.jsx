import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', marginBottom: '40px' }}>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center" style={{ padding: '60px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
            <h2 style={{ marginBottom: '20px' }}>Your cart is empty</h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: '30px' }}>
              Start adding courses to your cart!
            </p>
            <Link to="/courses" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Browse Courses
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            <div>
              {cartItems.map(course => (
                <div key={course._id} style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  gap: '20px'
                }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '10px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '10px' }}>{course.title}</h3>
                    <p style={{ color: 'var(--gray-600)', fontSize: '14px', marginBottom: '10px' }}>
                      {course.shortDescription}
                    </p>
                    <div>
                      {course.discount > 0 ? (
                        <>
                          <span style={{
                            textDecoration: 'line-through',
                            color: 'var(--gray-400)',
                            marginRight: '10px'
                          }}>
                            ${course.price}
                          </span>
                          <span style={{
                            color: 'var(--bright-red)',
                            fontSize: '20px',
                            fontWeight: 'bold'
                          }}>
                            ${course.discountedPrice}
                          </span>
                        </>
                      ) : (
                        <span style={{
                          color: 'var(--primary-black)',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}>
                          ${course.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(course._id)}
                    className="btn btn-danger"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              height: 'fit-content',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--gray-200)'
              }}>
                <span>Items ({cartItems.length})</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '30px',
                paddingTop: '10px'
              }}>
                <span>Total:</span>
                <span style={{ color: 'var(--accent-red)' }}>${getTotalPrice().toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/courses"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '20px',
                  color: 'var(--primary-gold)',
                  textDecoration: 'none'
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
