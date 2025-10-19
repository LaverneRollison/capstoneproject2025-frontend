import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // optional: create CSS file if you want same styling

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Professional Auto Repair Services</h1>
        <p>
          Expert mechanics providing reliable, affordable automotive services
          since 1985. Your trusted partner for all vehicle maintenance and
          repair needs.
        </p>
        <div className="hero-buttons">
          <Link to="/Booking" className="btn btn-orange">
            Book Appointment
          </Link>
          <Link to="/services" className="btn btn-gray">
            View Services
          </Link>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <p>
          We offer comprehensive automotive services to keep your vehicle
          running smoothly
        </p>
        <div className="services-grid">
          <div className="service-card">
            <h3>🔧 Engine Repair</h3>
            <p>Complete engine diagnostics and repair services</p>
          </div>
          <div className="service-card">
            <h3>⏱ Quick Service</h3>
            <p>Oil changes, inspections, and routine maintenance</p>
          </div>
          <div className="service-card">
            <h3>🚗 Brake Service</h3>
            <p>Professional brake repair and replacement</p>
          </div>
        </div>
        <Link to="/services" className="btn btn-orange">
          View All Services
        </Link>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose">
        <h2>Why Choose AutoFix Pro?</h2>
        <div className="choose-grid">
          <div className="choose-card">
            <h3>👨‍🔧 Expert Technicians</h3>
            <p>Certified mechanics with decades of combined experience</p>
          </div>
          <div className="choose-card">
            <h3>✅ Quality Guarantee</h3>
            <p>All repairs backed by our comprehensive warranty</p>
          </div>
          <div className="choose-card">
            <h3>⚡ Fast Service</h3>
            <p>Quick turnaround times without compromising quality</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-banner">
        <h2>Need Auto Repair Services?</h2>
        <p>
          Contact us today for a free estimate on your vehicle repair needs
        </p>
        <p>📞 (555) 123-4567</p>
        <p>📍 123 Auto Street, Car City, CA 90210</p>
        <Link to="/contact" className="btn btn-gray">
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default Home;
