// src/pages/Contact.js
import React, { useState } from 'react';
import './Contact.css';
import api from '../api/client';

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', vehicle: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post('/api/contacts', form);
      setStatus({ type: 'success', text: 'Message sent. We will contact you soon.' });
      setForm({ name: '', phone: '', email: '', vehicle: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page container">
      <h2>Contact Us</h2>
      <p className="lead">Get in touch with our team for questions, quotes, or to schedule your service appointment.</p>

      <form className="contact-form" onSubmit={onSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name *" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone *" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email *" required />
        <input name="vehicle" value={form.vehicle} onChange={handleChange} placeholder="Vehicle (Year, Make, Model)" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your vehicle's issue or what service you need..." rows="5" />
        {status && <div className={`form-message ${status.type}`}>{status.text}</div>}
        <button className="btn primary large" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
      </form>

      <div className="contact-info">
        <h4>Phone</h4>
        <p>(555) 123-4567</p>

        <h4>Email</h4>
        <p>info@autofixpro.com</p>

        <h4>Address</h4>
        <p>123 Auto Street, Car City, CA 90210</p>

        <h4>Hours</h4>
        <p>Mon-Fri 8AM-6PM, Sat 8AM-4PM</p>
      </div>

      <div className="cta-box">
        <h4>Need Service Now?</h4>
        <button className="btn primary">Book Appointment Online</button>
        <button className="btn dark">Call (555) 123-4567</button>
      </div>
    </div>
  );
}

export default Contact;
