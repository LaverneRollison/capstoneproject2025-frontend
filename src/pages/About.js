import React from "react";
import { Link } from "react-router-dom";
import "./About.css"; // optional styling file

const About = () => {
  return (
    <div className="about-container">
      {/* Intro Section */}
      <section className="about-intro">
        <h1>About AutoFix Pro</h1>
        <p>
          Your trusted automotive repair partner since 1985, dedicated to keeping your
          vehicle safe, reliable, and running at peak performance.
        </p>

        <div className="about-story">
          <h2>Our Story</h2>
          <p>
            Founded in 1985 by Mike Rodriguez, AutoFix Pro started as a small
            family-owned garage with a simple mission: provide honest, reliable
            automotive service at fair prices.
          </p>
          <p>
            Over the decades later, we’ve grown into one of the most trusted auto
            repair shops in the area, but our commitment to quality service and
            customer satisfaction remains unchanged.
          </p>
          <p>
            We combine old-fashioned work ethic with modern diagnostic equipment and
            training to deliver the best possible service for every vehicle that
            comes through our doors.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat-box">35+<br />Years in Business</div>
          <div className="stat-box">10,000+<br />Vehicles Serviced</div>
          <div className="stat-box">5<br />Certified Technicians</div>
          <div className="stat-box">98%<br />Customer Satisfaction</div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>❤️ Integrity</h3>
            <p>
              We believe in honest communication, fair pricing, and transparent
              service. Your trust is our most valuable asset.
            </p>
          </div>
          <div className="value-card">
            <h3>⭐ Excellence</h3>
            <p>
              We strive for perfection in every repair, using quality parts and
              proven techniques to ensure lasting results.
            </p>
          </div>
          <div className="value-card">
            <h3>🤝 Community</h3>
            <p>
              As a local business, we’re committed to supporting our community and
              building lasting relationships with our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="meet-team">
        <h2>Meet Our Team</h2>
        <p>
          Our certified technicians bring decades of combined experience and a passion
          for automotive excellence.
        </p>
        <div className="team-grid">
          <div className="team-card">
            <h3>🔧 Mike Rodriguez</h3>
            <p>Owner & Master Technician</p>
            <p>25+ years experience</p>
            <p>
              <strong>Specialties:</strong> Engine diagnostics, Performance tuning
            </p>
          </div>
          <div className="team-card">
            <h3>⚡ Sarah Chen</h3>
            <p>Lead Technician</p>
            <p>15+ years experience</p>
            <p>
              <strong>Specialties:</strong> Electrical systems, Brake service
            </p>
          </div>
          <div className="team-card">
            <h3>⚙️ David Thompson</h3>
            <p>Transmission Specialist</p>
            <p>20+ years experience</p>
            <p>
              <strong>Specialties:</strong> Automatic/Manual transmissions
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-banner">
        <h2>Experience the AutoFix Pro Difference</h2>
        <p>
          Join thousands of satisfied customers who trust us with their vehicles.
        </p>
        <div className="cta-buttons">
          <Link to="/Booking" className="btn btn-orange">
            Schedule Service
          </Link>
          <Link to="/contact" className="btn btn-dark">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
