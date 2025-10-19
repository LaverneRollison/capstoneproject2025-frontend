// src/pages/Booking.js
import React, { useState, useEffect } from 'react';
import './Booking.css';
import api from '../api/client';

function Booking() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    year: '',
    make: '',
    model: '',
    serviceType: '',
    date: '',
    time: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/api/bookings');
      setMyBookings(res.data || []);
    } catch (err) {
      console.error('Could not fetch bookings', err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      await api.post('/api/bookings', form);
      setMessage({ type: 'success', text: 'Booking request submitted.' });
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        year: '',
        make: '',
        model: '',
        serviceType: '',
        date: '',
        time: '',
        notes: ''
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Booking failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-page container">
      <div className="page-title">
        <h2>Book Your Appointment</h2>
        <p className="lead">Schedule your vehicle service with our expert technicians. We'll get back to you within 24 hours.</p>
      </div>
      <div className="booking-grid">
        <form className="booking-form" onSubmit={onSubmit}>
          <fieldset className="card-section">
            <legend>Personal Information</legend>
            <div className="row">
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name *" required />
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name *" required />
            </div>
            <div className="row">
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email *" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone *" required />
            </div>
          </fieldset>

          <fieldset className="card-section">
            <legend>Vehicle Information</legend>
            <div className="row">
              <input name="year" value={form.year} onChange={handleChange} placeholder="Year *" required />
              <input name="make" value={form.make} onChange={handleChange} placeholder="Make *" required />
            </div>
            <div className="row">
              <input name="model" value={form.model} onChange={handleChange} placeholder="Model *" required />
            </div>
          </fieldset>

          <fieldset className="card-section">
            <legend>Service Details</legend>
            <select name="serviceType" value={form.serviceType} onChange={handleChange} required>
              <option value="">Select service type *</option>
              <option>Oil Change</option>
              <option>Brake Service</option>
              <option>Engine Diagnostics</option>
              <option>General Maintenance</option>
            </select>

            <div className="row">
              <input name="date" value={form.date} onChange={handleChange} placeholder="yyyy-mm-dd" />
              <input name="time" value={form.time} onChange={handleChange} placeholder="--:--" />
            </div>

            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Describe the issue or service needed..." rows="5"></textarea>
          </fieldset>

          {message && <div className={`form-message ${message.type}`}>{message.text}</div>}
          <button className="btn primary large" type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Book Appointment'}</button>
        </form>

        <aside className="booking-sidebar">
          <div className="help-card">
            <h4>Need Help?</h4>
            <p className="phone">Call: <strong>(555) 123-4567</strong></p>
            <p>Email: info@autofixpro.com</p>
            <p>Hours: Mon-Fri 8AM-6PM, Sat 8AM-4PM</p>
          </div>

          <div className="info-card">
            <h4>What Happens Next?</h4>
            <ol>
              <li>We'll review your request within 24 hours.</li>
              <li>Our team will call to confirm.</li>
              <li>Bring your vehicle at the scheduled time.</li>
              <li>Our experts will diagnose and repair.</li>
            </ol>
          </div>

          <div className="emergency-card">
            <h4>Emergency Service</h4>
            <p>Vehicle won't start or having an emergency?</p>
            <button className="btn danger">Call Emergency Line</button>
          </div>

          <div style={{ marginTop: 16 }}>
            <h4>Your Bookings</h4>
            {myBookings.length === 0 ? <p>No bookings yet.</p> : (
              <ul>
                {myBookings.map(b => (
                  <li key={b.id}>{b.serviceType} — {b.date || 'TBD'} ({b.createdAt ? new Date(b.createdAt).toLocaleString() : ''})</li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Booking;
