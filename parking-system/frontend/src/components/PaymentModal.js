import React, { useState } from 'react';
import './PaymentModal.css';

function PaymentModal({ booking, onClose, onComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>💳 Payment</h2>

        <div className="payment-summary">
          <h3>Booking Summary</h3>
          <div className="summary-item">
            <span>Vehicle Number:</span>
            <strong>{booking.vehicleNumber}</strong>
          </div>
          <div className="summary-item">
            <span>Duration:</span>
            <strong>
              {new Date(booking.startTime).toLocaleString()}
              <br />to<br />
              {new Date(booking.endTime).toLocaleString()}
            </strong>
          </div>
          <div className="summary-item total">
            <span>Total Amount:</span>
            <strong>₹{booking.totalAmount}</strong>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <div className="method-options">
            <label className={paymentMethod === 'card' ? 'active' : ''}>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💳 Credit/Debit Card</span>
            </label>

            <label className={paymentMethod === 'upi' ? 'active' : ''}>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>📱 UPI</span>
            </label>

            <label className={paymentMethod === 'wallet' ? 'active' : ''}>
              <input
                type="radio"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>👛 Wallet</span>
            </label>
          </div>
        </div>

        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? '⏳ Processing...' : `Pay ₹${booking.totalAmount}`}
        </button>

        {processing && (
          <div className="processing-animation">
            <div className="spinner"></div>
            <p>Processing your payment securely...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;
