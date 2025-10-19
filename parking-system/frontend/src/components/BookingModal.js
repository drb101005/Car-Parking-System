import React, { useState } from 'react';
import './BookingModal.css';

function BookingModal({ slot, user, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    startTime: '',
    endTime: ''
  });
  const [estimatedCost, setEstimatedCost] = useState(0);

  const calculateCost = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const hours = Math.ceil((endDate - startDate) / (1000 * 60 * 60));
      
      if (hours > 0) {
        setEstimatedCost(hours * slot.hourlyRate);
      } else {
        setEstimatedCost(0);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    if (name === 'startTime' || name === 'endTime') {
      calculateCost(newData.startTime, newData.endTime);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      alert('End time must be after start time');
      return;
    }

    const bookingData = {
      userId: user.id,
      slotId: slot.id,
      vehicleNumber: formData.vehicleNumber,
      startTime: formData.startTime,
      endTime: formData.endTime,
      totalAmount: estimatedCost
    };

    onSubmit(bookingData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Book Parking Slot</h2>
        <div className="slot-info">
          <p><strong>Slot:</strong> {slot.slotNumber}</p>
          <p><strong>Division:</strong> {slot.division}</p>
          <p><strong>Rate:</strong> ₹{slot.hourlyRate}/hour</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vehicle Number *</label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g., MH01AB1234"
              required
            />
          </div>

          <div className="form-group">
            <label>Start Time *</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>

          <div className="form-group">
            <label>End Time *</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              min={formData.startTime}
              required
            />
          </div>

          {estimatedCost > 0 && (
            <div className="estimated-cost">
              <p>💰 Estimated Cost: <strong>₹{estimatedCost}</strong></p>
            </div>
          )}

          <button type="submit" className="submit-btn">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}
export default BookingModal;