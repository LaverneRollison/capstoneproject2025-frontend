// src/pages/MechanicBookings.js
import React, { useEffect, useState } from 'react';
import api from '../api/client';
import './Booking.css';

function MechanicBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(null);
  const [error, setError] = useState(null);
  const [assigningFor, setAssigningFor] = useState(null); // booking id being assigned
  const [assignForm, setAssignForm] = useState({
    serviceTypeId: '',
    mechanicName: '',
    durationMinutes: '',
    status: 'IN_PROGRESS',
    notes: ''
  });
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchServiceTypes();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/admin/bookings');
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceTypes = async () => {
    try {
      const res = await api.get('/api/service-types'); // endpoint we'll assume exists to list catalog
      setServiceTypes(res.data || []);
    } catch (err) {
      // if no catalog endpoint, ignore
      console.warn('Could not fetch service types', err);
      setServiceTypes([]);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    setActionInProgress(id);
    try {
      await api.delete(`/api/admin/bookings/${id}`);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete booking');
    } finally {
      setActionInProgress(null);
    }
  };

  const openAssign = (booking) => {
    setAssigningFor(booking.id);
    setAssignForm({
      serviceTypeId: '',
      mechanicName: '',
      durationMinutes: '',
      status: 'IN_PROGRESS',
      notes: ''
    });
  };

  const cancelAssign = () => {
    setAssigningFor(null);
  };

  const onAssignChange = (e) => setAssignForm({ ...assignForm, [e.target.name]: e.target.value });

  const submitAssign = async (bookingId) => {
    if (!assignForm.mechanicName) {
      alert('Please enter mechanic name');
      return;
    }
    setActionInProgress(bookingId);
    try {
      const payload = {
        serviceTypeId: assignForm.serviceTypeId ? Number(assignForm.serviceTypeId) : null,
        mechanicName: assignForm.mechanicName,
        durationMinutes: assignForm.durationMinutes ? Number(assignForm.durationMinutes) : null,
        status: assignForm.status,
        notes: assignForm.notes
      };
      const res = await api.post(`/api/admin/bookings/${bookingId}/assign-service`, payload);
      alert('Service assigned successfully (ID: ' + res.data.id + ')');
      setAssigningFor(null);
      // Optionally navigate to mechanic services or refresh bookings
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert('Failed to assign service: ' + (err?.response?.data?.message || err.message));
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <div className="container booking-page">
      <div className="page-title">
        <h2>Mechanic — View Bookings</h2>
        <p className="lead">Customer Bookings</p>
      </div>

      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && bookings.length === 0 && <p>No bookings found.</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {bookings.map(b => (
          <div key={b.id} style={{ border: '1px solid #e9e9e9', padding: 12, borderRadius: 6, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{b.firstName} {b.lastName}</strong> — <span style={{ color: '#666' }}>{b.serviceType}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" onClick={() => openAssign(b)} disabled={actionInProgress === b.id}>
                  Assign Service
                </button>
                <button className="btn danger" onClick={() => deleteBooking(b.id)} disabled={actionInProgress === b.id}>
                  {actionInProgress === b.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>

            <div style={{ marginTop: 8, fontSize: 14 }}>
              <div><strong>Email:</strong> {b.email}</div>
              <div><strong>Phone:</strong> {b.phone}</div>
              <div><strong>Vehicle:</strong> {b.year} {b.make} {b.model}</div>
              <div><strong>Date:</strong> {b.date || 'TBD'} <strong>Time:</strong> {b.time || 'TBD'}</div>
              {b.notes && <div style={{ marginTop: 6 }}><strong>Notes:</strong> {b.notes}</div>}
              {b.createdAt && <div style={{ marginTop: 6, color: '#999' }}>Created: {new Date(b.createdAt).toLocaleString()}</div>}
            </div>

            {assigningFor === b.id && (
              <div style={{ marginTop: 12, borderTop: '1px dashed #ddd', paddingTop: 12 }}>
                <h4 style={{ margin: '6px 0' }}>Assign Service</h4>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <select name="serviceTypeId" value={assignForm.serviceTypeId} onChange={onAssignChange}>
                    <option value="">Select service (optional)</option>
                    {serviceTypes.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>

                  <input name="mechanicName" placeholder="Mechanic name" value={assignForm.mechanicName} onChange={onAssignChange} />
                  <input name="durationMinutes" placeholder="Duration (min)" value={assignForm.durationMinutes} onChange={onAssignChange} />
                  <select name="status" value={assignForm.status} onChange={onAssignChange}>
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="SERVICE_COMPLETE">SERVICE_COMPLETE</option>
                  </select>
                </div>

                <div style={{ marginTop: 8 }}>
                  <textarea name="notes" placeholder="Notes" value={assignForm.notes} onChange={onAssignChange} rows="3" style={{ width: '100%' }} />
                </div>

                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                  <button className="btn primary" onClick={() => submitAssign(b.id)} disabled={actionInProgress === b.id}>
                    {actionInProgress === b.id ? 'Assigning...' : 'Assign'}
                  </button>
                  <button className="btn outline" onClick={cancelAssign}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MechanicBookings;
