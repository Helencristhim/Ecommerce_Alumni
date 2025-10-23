import React from 'react';

const Checkout = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Checkout</h1>
        <div className="text-center" style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>💳</div>
          <h2 style={{ marginBottom: '20px' }}>Payment Integration Coming Soon</h2>
          <p style={{ color: 'var(--gray-600)' }}>
            Payment processing with Stripe and Mercado Pago will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
