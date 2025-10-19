import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signup(form);
      if (res.success) {
        navigate('/booking');
      } else {
        setError('Signup failed');
      }
    } catch (err) {
      setError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h3>Sign Up</h3>
        <form onSubmit={onSubmit} className="auth-form">
          <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" required />
          <input name="email" value={form.email} onChange={onChange} placeholder="Email Address" required />
          <input name="password" value={form.password} onChange={onChange} type="password" placeholder="Password" required />
          {error && <div className="form-error">{error}</div>}
          <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
        <div className="auth-footer">
          <span>Already have an account?</span> <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
