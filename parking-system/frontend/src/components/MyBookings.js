import React, { useState } from 'react';
import './MyBookings.css';

function MyBookings({ bookings, onCancel }) {
  const [filter, setFilter] = useState('ALL');

  const getFilteredBookings = () => {
    if (filter === 'ACTIVE') {
      return bookings.filter(b => b.status === 'ACTIVE');
    } else if (filter === 'PAST') {
      return bookings.filter(b => b.status === 'COMPLETED' || b.status === 'CANCELLED');
    }
    return bookings;
  };

  const getStatusBadge = (status) => {
    const badges = {
      'ACTIVE': { text: 'Active', className: 'badge-active' },
      'COMPLETED': { text: 'Completed', className: 'badge-completed' },
      'CANCELLED': { text: 'Cancelled', className: 'badge-cancelled' }
    };
    return badges[status] || badges['ACTIVE'];
  };

  const getRemainingTime = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="my-bookings">
      <div className="bookings-header">
        <h2>📋 My Bookings</h2>
        <div className="booking-filters">
          {['ALL', 'ACTIVE', 'PAST'].map(f => (
            <button
              key={f}
              className={`filter-chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'ALL' ? 'All' : f === 'ACTIVE' ? 'Current' : 'History'}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <p>📭 No bookings found</p>
        </div>
      ) : (
        <div className="bookings-list">
          {filteredBookings.map(booking => {
            const badge = getStatusBadge(booking.status);
            return (
              <div key={booking.id} className="booking-card">
                <div className="booking-header-section">
                  <div className="booking-id">Booking #{booking.id}</div>
                  <span className={`status-badge ${badge.className}`}>
                    {badge.text}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <span className="detail-label">🚗 Vehicle:</span>
                    <span className="detail-value">{booking.vehicleNumber}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">🅿️ Slot:</span>
                    <span className="detail-value">Slot #{booking.slotId}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">📅 Start:</span>
                    <span className="detail-value">
                      {new Date(booking.startTime).toLocaleString()}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">📅 End:</span>
                    <span className="detail-value">
                      {new Date(booking.endTime).toLocaleString()}
                    </span>
                  </div>

                  {booking.status === 'ACTIVE' && (
                    <div className="detail-row countdown">
                      <span className="detail-label">⏰ Time Left:</span>
                      <span className="detail-value countdown-value">
                        {getRemainingTime(booking.endTime)}
                      </span>
                    </div>
                  )}

                  <div className="detail-row total">
                    <span className="detail-label">💰 Total:</span>
                    <span className="detail-value">₹{booking.totalAmount}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">💳 Payment:</span>
                    <span className={`payment-status ${booking.paymentStatus.toLowerCase()}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>

                {booking.status === 'ACTIVE' && (
                  <button
                    className="cancel-btn"
                    onClick={() => onCancel(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default MyBookings;