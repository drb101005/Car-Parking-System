import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    activeBookings: 0,
    totalRevenue: 0
  });
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [slots, setSlots] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, usersRes, slotsRes] = await Promise.all([
        fetch('http://localhost:8080/api/bookings'),
        fetch('http://localhost:8080/api/users'),
        fetch('http://localhost:8080/api/slots')
      ]);

      const bookingsData = await bookingsRes.json();
      const usersData = await usersRes.json();
      const slotsData = await slotsRes.json();

      setBookings(bookingsData);
      setUsers(usersData);
      setSlots(slotsData);

      // Calculate stats
      const activeBookings = bookingsData.filter(b => b.status === 'ACTIVE').length;
      const availableSlots = slotsData.filter(s => s.available).length;
      const totalRevenue = bookingsData
        .filter(b => b.paymentStatus === 'PAID')
        .reduce((sum, b) => sum + b.totalAmount, 0);

      setStats({
        totalSlots: slotsData.length,
        availableSlots,
        activeBookings,
        totalRevenue
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getDivisionStats = () => {
    const divisions = ['A', 'B', 'C'];
    return divisions.map(div => {
      const divSlots = slots.filter(s => s.division === div);
      const available = divSlots.filter(s => s.available).length;
      const occupied = divSlots.length - available;
      return { division: div, available, occupied, total: divSlots.length };
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>👨‍💼 Admin Dashboard</h2>
        <p>Welcome back, {user.name}</p>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          📋 All Bookings
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button
          className={activeTab === 'slots' ? 'active' : ''}
          onClick={() => setActiveTab('slots')}
        >
          🅿️ Slots
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="overview-tab">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🅿️</div>
              <div className="stat-info">
                <h3>{stats.totalSlots}</h3>
                <p>Total Slots</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{stats.availableSlots}</h3>
                <p>Available Slots</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🚗</div>
              <div className="stat-info">
                <h3>{stats.activeBookings}</h3>
                <p>Active Bookings</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>₹{stats.totalRevenue}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="division-stats">
            <h3>Division-wise Slot Status</h3>
            <div className="division-bars">
              {getDivisionStats().map(div => (
                <div key={div.division} className="division-bar-item">
                  <div className="division-label">
                    <strong>Division {div.division}</strong>
                    <span>{div.available}/{div.total} available</span>
                  </div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill available"
                      style={{ width: `${(div.available / div.total) * 100}%` }}
                    ></div>
                    <div 
                      className="bar-fill occupied"
                      style={{ width: `${(div.occupied / div.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="bar-legend">
                    <span className="legend-available">Available: {div.available}</span>
                    <span className="legend-occupied">Occupied: {div.occupied}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bookings-tab">
          <h3>All Bookings ({bookings.length})</h3>
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Slot ID</th>
                  <th>Vehicle</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.slotId}</td>
                    <td>{booking.vehicleNumber}</td>
                    <td>{new Date(booking.startTime).toLocaleString()}</td>
                    <td>{new Date(booking.endTime).toLocaleString()}</td>
                    <td>₹{booking.totalAmount}</td>
                    <td>
                      <span className={`status-badge-admin ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <span className={`payment-badge ${booking.paymentStatus.toLowerCase()}`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-tab">
          <h3>Registered Users ({users.length})</h3>
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>
                      <span className={`role-badge ${u.role.toLowerCase()}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'slots' && (
        <div className="slots-tab">
          <h3>All Parking Slots ({slots.length})</h3>
          <div className="slots-grid-admin">
            {slots.map(slot => (
              <div key={slot.id} className={`admin-slot-card ${slot.available ? 'available' : 'occupied'}`}>
                <div className="slot-number-admin">{slot.slotNumber}</div>
                <div className="slot-division">Division {slot.division}</div>
                <div className="slot-status-admin">
                  {slot.available ? '✓ Available' : '✗ Occupied'}
                </div>
                <div className="slot-rate-admin">₹{slot.hourlyRate}/hr</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;