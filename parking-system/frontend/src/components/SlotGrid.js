import React from 'react';
import './SlotGrid.css';

function SlotGrid({ slots, onSlotClick, myBookings }) {
  const getSlotStatus = (slot) => {
    const booking = myBookings.find(b => 
      b.slotId === slot.id && b.status === 'ACTIVE'
    );
    
    if (booking) {
      const endTime = new Date(booking.endTime);
      const now = new Date();
      const minutesLeft = Math.floor((endTime - now) / 60000);
      
      if (minutesLeft <= 10 && minutesLeft > 0) {
        return 'expiring-soon';
      }
      return 'my-booking';
    }
    
    return slot.available ? 'available' : 'occupied';
  };

  const getTimeLeft = (slot) => {
    const booking = myBookings.find(b => 
      b.slotId === slot.id && b.status === 'ACTIVE'
    );
    
    if (booking) {
      const endTime = new Date(booking.endTime);
      const now = new Date();
      const minutesLeft = Math.floor((endTime - now) / 60000);
      const hoursLeft = Math.floor(minutesLeft / 60);
      const mins = minutesLeft % 60;
      
      if (minutesLeft > 0) {
        return hoursLeft > 0 
          ? `${hoursLeft}h ${mins}m left`
          : `${mins}m left`;
      }
    }
    return null;
  };

  const divisions = ['A', 'B', 'C'];

  return (
    <div className="slot-grid-container">
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color available"></span>
          Available
        </div>
        <div className="legend-item">
          <span className="legend-color occupied"></span>
          Occupied
        </div>
        <div className="legend-item">
          <span className="legend-color my-booking"></span>
          Your Booking
        </div>
        <div className="legend-item">
          <span className="legend-color expiring-soon"></span>
          Expiring Soon
        </div>
      </div>

      {divisions.map(division => {
        const divisionSlots = slots.filter(s => s.division === division);
        
        return (
          <div key={division} className="division-section">
            <h3>Division {division}</h3>
            <div className="slot-grid">
              {divisionSlots.map(slot => {
                const status = getSlotStatus(slot);
                const timeLeft = getTimeLeft(slot);
                
                return (
                  <div
                    key={slot.id}
                    className={`slot-card ${status}`}
                    onClick={() => onSlotClick(slot)}
                    title={slot.available ? 'Click to book' : 'Occupied'}
                  >
                    <div className="slot-number">{slot.slotNumber}</div>
                    <div className="slot-status">
                      {status === 'available' ? '✓ Available' : 
                       status === 'my-booking' ? '🚗 Your Slot' :
                       status === 'expiring-soon' ? '⏰ Expiring' : '✗ Occupied'}
                    </div>
                    {timeLeft && (
                      <div className="time-left">{timeLeft}</div>
                    )}
                    <div className="slot-rate">₹{slot.hourlyRate}/hr</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SlotGrid;