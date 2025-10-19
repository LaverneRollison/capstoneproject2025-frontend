import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await login(form);
      if (res.success) {
        navigate('/booking');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h3>Login</h3>
        <form onSubmit={onSubmit} className="auth-form">
          <input name="email" value={form.email} onChange={onChange} placeholder="Email Address" required />
          <input name="password" value={form.password} onChange={onChange} type="password" placeholder="Password" required />
          {error && <div className="form-error">{error}</div>}
          <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <div className="auth-footer">
          <span>New here?</span> <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
