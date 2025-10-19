import React from "react";
import "./Services.css"; // create this CSS file for styling

const Services = () => {
  return (
    <div className="services-container">
      {/* Heading */}
      <section className="services-header">
        <h2>Our Services</h2>
        <p>
          Comprehensive automotive repair and maintenance services to keep your
          vehicle running at its best. Our certified technicians use the latest
          diagnostic equipment and quality parts.
        </p>
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        <div className="service-card">
          <h3>Engine Repair & Diagnostics</h3>
          <ul>
            <li>Computer diagnostics <span className="price">R800</span></li>
            <li>Engine rebuilding <span className="price">R15,000</span></li>
            <li>Performance tuning <span className="price">R2,500</span></li>
            <li>Emission repairs <span className="price">R1,200</span></li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Brake Services</h3>
          <ul>
            <li>Brake pad replacement <span className="price">R1,500</span></li>
            <li>Rotor resurfacing <span className="price">R1,800</span></li>
            <li>Brake fluid service <span className="price">R900</span></li>
            <li>ABS diagnostics <span className="price">R1,300</span></li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Transmission Service</h3>
          <ul>
            <li>Transmission rebuilds <span className="price">R18,000</span></li>
            <li>Fluid changes <span className="price">R1,000</span></li>
            <li>Clutch replacement <span className="price">R7,500</span></li>
            <li>Gear diagnostics <span className="price">R1,500</span></li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Electrical Systems</h3>
          <ul>
            <li>Battery testing <span className="price">R400</span></li>
            <li>Alternator repair <span className="price">R2,200</span></li>
            <li>Starter service <span className="price">R1,800</span></li>
            <li>Wiring repairs <span className="price">R950</span></li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Air Conditioning</h3>
          <ul>
            <li>AC diagnostics <span className="price">R600</span></li>
            <li>Refrigerant recharge <span className="price">R1,100</span></li>
            <li>Compressor repair <span className="price">R3,500</span></li>
            <li>System cleaning <span className="price">R800</span></li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Oil & Fluid Services</h3>
          <ul>
            <li>Oil changes <span className="price">R900</span></li>
            <li>Fluid top-offs <span className="price">R500</span></li>
            <li>Filter replacements <span className="price">R700</span></li>
            <li>System flushes <span className="price">R1,200</span></li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Suspension & Steering</h3>
          <ul>
            <li>Shock replacement <span className="price">R3,500</span></li>
            <li>Strut service <span className="price">R2,800</span></li>
            <li>Alignment <span className="price">R900</span></li>
            <li>Power steering repair <span className="price">R4,000</span></li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Battery & Charging</h3>
          <ul>
            <li>Battery testing <span className="price">R400</span></li>
            <li>Battery replacement <span className="price">R2,000</span></li>
            <li>Charging diagnostics <span className="price">R750</span></li>
            <li>Alternator service <span className="price">R2,200</span></li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Cooling System</h3>
          <ul>
            <li>Radiator repair <span className="price">R3,200</span></li>
            <li>Coolant service <span className="price">R950</span></li>
            <li>Thermostat replacement <span className="price">R1,500</span></li>
            <li>Hose replacement <span className="price">R800</span></li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-banner">
        <h3>Ready to Schedule Service?</h3>
        <p>
          Get your vehicle the expert care it deserves. Book your appointment today!
        </p>
        <div className="cta-buttons">
          <button className="btn btn-orange">Book Appointment</button>
          <button className="btn btn-gray">Get Quote</button>
        </div>
      </section>
    </div>
  );
};

export default Services;
