// src/pages/MechanicMessages.js
import React, { useEffect, useState } from 'react';
import api from '../api/client';
import './Contact.css';

function MechanicMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/admin/contacts');
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    setActionInProgress(id);
    try {
      await api.delete(`/api/admin/contacts/${id}`);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete message');
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <div className="container contact-page">
      <div className="page-title">
        <h2>Mechanic — View Messages</h2>
        <p className="lead">Customer messages.</p>
      </div>

      {loading && <p>Loading messages...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && messages.length === 0 && <p>No messages found.</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {messages.map(m => (
          <div key={m.id} style={{ border: '1px solid #e9e9e9', padding: 12, borderRadius: 6, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{m.name}</strong> — <span style={{ color: '#666' }}>{m.email} / {m.phone}</span>
              </div>
              <div>
                <button className="btn danger" onClick={() => deleteMessage(m.id)} disabled={actionInProgress === m.id}>
                  {actionInProgress === m.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              {m.vehicle && <div><strong>Vehicle:</strong> {m.vehicle}</div>}
              <div style={{ marginTop: 8 }}>{m.message}</div>
              {m.createdAt && <div style={{ marginTop: 6, color: '#999' }}>Created: {new Date(m.createdAt).toLocaleString()}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MechanicMessages;
