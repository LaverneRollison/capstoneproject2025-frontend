// src/pages/MechanicServices.js
import React, { useEffect, useState } from 'react';
import api from '../api/client';
import './Booking.css';

function MechanicServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ mechanicName: '', durationMinutes: '', status: '', notes: '' });
  const [actionInProgress, setActionInProgress] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/bookings/services');
      setServices(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (s) => {
    setEditingId(s.id);
    setEditForm({
      mechanicName: s.mechanicName || '',
      durationMinutes: s.durationMinutes || '',
      status: s.status || 'PENDING',
      notes: s.notes || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const onChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const saveEdit = async (id) => {
    setActionInProgress(true);
    try {
      const payload = {
        mechanicName: editForm.mechanicName,
        durationMinutes: editForm.durationMinutes ? Number(editForm.durationMinutes) : null,
        status: editForm.status,
        notes: editForm.notes
      };
      await api.patch(`/api/admin/bookings/services/${id}`, payload);
      await fetchServices();
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update service');
    } finally {
      setActionInProgress(false);
    }
  };

  const statusStyle = (status) => {
    if (!status) return {};
    if (status === 'IN_PROGRESS') return { color: 'red', fontWeight: '700' };
    if (status === 'SERVICE_COMPLETE') return { color: 'green', fontWeight: '700' };
    return {};
  };

  return (
    <div className="container booking-page">
      <div className="page-title">
        <h2>Mechanic — Services</h2>
        <p className="lead">Assigned service records</p>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && services.length === 0 && <p>No services found.</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {services.map(s => (
          <div key={s.id} style={{ border: '1px solid #e9e9e9', padding: 12, borderRadius: 6, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Service ID: {s.id}</strong>
                <div style={{ marginTop: 6 }}>
                  <span style={{ fontSize: 14 }}>{s.serviceTypeName || 'Custom Service'}</span>
                  <div style={{ marginTop: 6 }}>
                    <strong>Booking:</strong> {s.bookingFirstName} {s.bookingLastName} — {s.bookingServiceType}
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <strong>When:</strong> {s.bookingDate || 'TBD'} {s.bookingTime || ''}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div>
                  <div style={statusStyle(s.status)}>{s.status}</div>
                  <div style={{ marginTop: 6 }}>
                    <strong>Mechanic:</strong> {s.mechanicName || '—'}
                  </div>
                  <div><strong>Duration:</strong> {s.estimatedDuration ? `${s.estimatedDuration} min` : '—'}</div>

                </div>
                <div style={{ marginTop: 8 }}>
                  <button className="btn" onClick={() => startEdit(s)}>Edit</button>
                </div>
              </div>
            </div>

            {editingId === s.id && (
              <div style={{ marginTop: 12, borderTop: '1px dashed #ddd', paddingTop: 12 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <input name="mechanicName" placeholder="Mechanic name" value={editForm.mechanicName} onChange={onChange} />
                  <input name="durationMinutes" placeholder="Duration (min)" value={editForm.durationMinutes} onChange={onChange} />
                  <select name="status" value={editForm.status} onChange={onChange}>
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="SERVICE_COMPLETE">SERVICE_COMPLETE</option>
                  </select>
                </div>

                <div style={{ marginTop: 8 }}>
                  <textarea name="notes" placeholder="Notes" value={editForm.notes} onChange={onChange} rows="3" style={{ width: '100%' }} />
                </div>

                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                  <button className="btn primary" onClick={() => saveEdit(s.id)} disabled={actionInProgress}>
                    {actionInProgress ? 'Saving...' : 'Save'}
                  </button>
                  <button className="btn outline" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MechanicServices;
