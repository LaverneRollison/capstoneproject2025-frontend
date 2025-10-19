import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import MechanicBookings from './pages/MechanicBookings';
import MechanicMessages from './pages/MechanicMessages';
import MechanicServices from './pages/MechanicServices'; // ✅ NEW
import './App.css';
import { useAuth } from './auth/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-wrapper">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />

          {/* Private user-only pages */}
          <Route path="/booking" element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          } />

          <Route path="/contact" element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          } />

          {/* Admin (Mechanic) routes */}
          <Route path="/admin/bookings" element={
            <AdminRoute>
              <MechanicBookings />
            </AdminRoute>
          } />

          <Route path="/admin/contacts" element={
            <AdminRoute>
              <MechanicMessages />
            </AdminRoute>
          } />

          <Route path="/admin/services" element={
            <AdminRoute>
              <MechanicServices /> {/* ✅ New route for services management */}
            </AdminRoute>
          } />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Fallback */}
          <Route path="*" element={<h2 style={{ padding: 40 }}>404 - Not found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
