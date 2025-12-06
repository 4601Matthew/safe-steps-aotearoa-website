import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Safe Steps Aotearoa</h1>
              <p className="hero-tagline">Small steps. Big difference.</p>
              <p className="hero-description">
                Supporting vulnerable New Zealanders by creating safer, more accessible home environments—reducing preventable harm and empowering people to remain independent, confident, and connected in their own homes.
              </p>
              <div className="hero-actions">
                <Link to="/get-involved" className="btn btn-primary">Get Involved</Link>
                <Link to="/services" className="btn btn-outline">Our Services</Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="/logo.png" alt="Safe Steps Aotearoa Logo" className="hero-logo" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section problem-section">
        <div className="container">
          <h2 className="section-title">🌿 The Problem</h2>
          <div className="problem-content">
            <p className="lead">
              Across Aotearoa, many people—especially older adults, disabled individuals, and those experiencing financial hardship—live in homes that have become difficult or unsafe to access.
            </p>
            <p>
              As paramedics and community responders know well, a significant number of emergencies are made even more dangerous by a simple but overlooked issue: <strong>the environment around the home</strong>.
            </p>
            <div className="problem-list">
              <div className="problem-item">
                <h3>Common Hazards</h3>
                <ul>
                  <li>Slippery steps covered in moss and mould</li>
                  <li>Poor outdoor lighting leading to falls at night</li>
                  <li>Overgrown pathways blocking safe access</li>
                  <li>Missing house numbers delaying emergency responders</li>
                  <li>Cluttered entrances creating trip hazards</li>
                </ul>
              </div>
              <div className="problem-item">
                <h3>The Impact</h3>
                <ul>
                  <li>Falls and injuries that could be prevented</li>
                  <li>Delayed emergency care when every minute matters</li>
                  <li>Increased risk for first responders</li>
                  <li>Loss of independence and confidence</li>
                  <li>Strain on emergency services</li>
                </ul>
              </div>
            </div>
            <p>
              For many New Zealanders, these hazards are not the result of neglect—they stem from limited mobility, chronic health conditions, lack of nearby support, or financial barriers that prevent them from keeping their homes safe and accessible. Others may feel embarrassed to ask for help, or simply not know where to turn.
            </p>
            <p className="highlight">
              <strong>Despite being common, these issues fall into a service gap:</strong> they are too small for most traditional contractors, not covered by health services, and often beyond the capacity of family or neighbours. There is currently no dedicated community organisation focused on bridging this gap in a practical, compassionate, and preventative way.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section solution-section">
        <div className="container">
          <h2 className="section-title">✨ Our Solution</h2>
          <p className="lead">
            Safe Steps Aotearoa provides <strong>practical, targeted home safety improvements</strong> through a hybrid model combining volunteer support and trusted contractors.
          </p>
          <div className="solution-cards">
            <div className="solution-card">
              <div className="solution-icon">🙌</div>
              <h3>Volunteer Support</h3>
              <p>Community volunteers help with:</p>
              <ul>
                <li>Clearing pathways and entrances</li>
                <li>Light garden tidying</li>
                <li>Installing reflective house numbers</li>
                <li>Replacing outdoor light bulbs</li>
                <li>Simple hazard removal</li>
              </ul>
            </div>
            <div className="solution-card">
              <div className="solution-icon">🔧</div>
              <h3>Trusted Contractors</h3>
              <p>Skilled tradespeople handle:</p>
              <ul>
                <li>Pressure washing slippery surfaces</li>
                <li>Installing outdoor lighting</li>
                <li>Pathway repairs (non-structural)</li>
                <li>Heavy vegetation removal</li>
                <li>Anti-slip treatments</li>
              </ul>
            </div>
          </div>
          <p className="solution-note">
            Contractors work at <strong>discounted rates or donate services</strong> to keep costs low and maximize community impact.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Make a Difference?</h2>
          <p className="lead">Whether you need help, want to volunteer, or know someone who could benefit—we're here.</p>
          <div className="cta-actions">
            <Link to="/get-involved" className="btn btn-primary btn-large">Get Involved</Link>
            <Link to="/contact" className="btn btn-secondary btn-large">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

