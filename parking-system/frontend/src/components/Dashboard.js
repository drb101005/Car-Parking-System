import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import SlotGrid from './SlotGrid';
import BookingModal from './BookingModal';
import PaymentModal from './PaymentModal';
import MyBookings from './MyBookings';

function Dashboard({ user }) {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('ALL');
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetchSlots();
    fetchMyBookings();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchSlots();
      fetchMyBookings();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/slots');
      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/user/${user.id}`);
      const data = await response.json();
      setMyBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSlotClick = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setShowBookingModal(true);
    }
  };

  const handleBookingSubmit = async (bookingData) => {
    setPendingBooking(bookingData);
    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = async () => {
    try {
      // Create booking
      const bookingResponse = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingBooking)
      });

      if (bookingResponse.ok) {
        const booking = await bookingResponse.json();
        
        // Update payment status
        await fetch(`http://localhost:8080/api/bookings/${booking.id}/payment`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'PAID' })
        });

        alert('✅ Booking confirmed! Confirmation sent to your email.');
        setShowPaymentModal(false);
        setPendingBooking(null);
        fetchSlots();
        fetchMyBookings();
      }
    } catch (error) {
      alert('Error creating booking');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
          method: 'DELETE'
        });
        alert('Booking cancelled successfully');
        fetchSlots();
        fetchMyBookings();
      } catch (error) {
        alert('Error cancelling booking');
      }
    }
  };

  const filteredSlots = slots.filter(slot => {
    const matchesSearch = slot.slotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         slot.division.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = selectedDivision === 'ALL' || slot.division === selectedDivision;
    return matchesSearch && matchesDivision;
  });

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h2>Welcome, {user.name}! 👋</h2>
        <p>Find and book your parking spot instantly</p>
      </div>

      <div className="controls-section">
        <input
          type="text"
          placeholder="🔍 Search by slot number or division..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        
        <div className="division-filter">
          {['ALL', 'A', 'B', 'C'].map(div => (
            <button
              key={div}
              className={`filter-btn ${selectedDivision === div ? 'active' : ''}`}
              onClick={() => setSelectedDivision(div)}
            >
              {div === 'ALL' ? 'All Divisions' : `Division ${div}`}
            </button>
          ))}
        </div>
      </div>

      <SlotGrid 
        slots={filteredSlots} 
        onSlotClick={handleSlotClick}
        myBookings={myBookings}
      />

      <MyBookings 
        bookings={myBookings} 
        onCancel={handleCancelBooking}
      />

      {showBookingModal && (
        <BookingModal
          slot={selectedSlot}
          user={user}
          onClose={() => setShowBookingModal(false)}
          onSubmit={handleBookingSubmit}
        />
      )}

      {showPaymentModal && pendingBooking && (
        <PaymentModal
          booking={pendingBooking}
          onClose={() => setShowPaymentModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}

export default Dashboard;