import { Link } from 'react-router-dom'
import './Services.css'

function Services() {
  return (
    <div className="services">
      <section className="page-banner">
        <div className="container">
          <h1 className="page-title">Our Services</h1>
          <p className="lead">
            Safe Steps Aotearoa provides practical, targeted home safety improvements through a combination of volunteer support and trusted contractors. Our services are designed to address the small but critical hazards that can make homes unsafe or difficult to access.
          </p>
        </div>
      </section>

      {/* Home Access & Safety Improvements */}
      <section className="section service-category">
        <div className="container">
          <div className="category-header">
            <h2>🌿 Home Access & Safety Improvements</h2>
            <p>Practical improvements to make homes safer and more accessible</p>
          </div>
          <div className="services-grid">
            <div className="service-item">
              <h3>Clearing overgrown accessways</h3>
              <p>Removing vegetation and debris that blocks safe pathways to your home.</p>
            </div>
            <div className="service-item">
              <h3>Pruning low-hanging branches</h3>
              <p>Trimming branches that create hazards or block visibility along pathways.</p>
            </div>
            <div className="service-item">
              <h3>Lawn and garden maintenance</h3>
              <p>One-off maintenance to improve pathway safety and accessibility.</p>
            </div>
            <div className="service-item">
              <h3>Removing debris or clutter</h3>
              <p>Clearing entrances and pathways of items that create trip hazards.</p>
            </div>
            <div className="service-item">
              <h3>Minor path or step repairs</h3>
              <p>Non-structural repairs to improve safety and accessibility.</p>
            </div>
            <div className="service-item">
              <h3>Installing or improving outdoor lighting</h3>
              <p>Enhancing visibility for safety, especially during evening hours.</p>
            </div>
            <div className="service-item">
              <h3>Applying anti-slip solutions</h3>
              <p>Treating slippery surfaces to prevent falls and injuries.</p>
            </div>
            <div className="service-item">
              <h3>Pressure washing slippery surfaces</h3>
              <p>Removing moss, mould, and algae from decks, paths, and steps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visibility & Emergency Access */}
      <section className="section service-category alt">
        <div className="container">
          <div className="category-header">
            <h2>🚑 Visibility & Emergency Access</h2>
            <p>Ensuring emergency responders can find and reach you quickly</p>
          </div>
          <div className="services-grid">
            <div className="service-item">
              <h3>House numbering improvements</h3>
              <p>Installing clear, visible, and reflective house numbers for easy identification.</p>
            </div>
            <div className="service-item">
              <h3>Installing or upgrading address signage</h3>
              <p>Ensuring your address is clearly visible from the street.</p>
            </div>
            <div className="service-item">
              <h3>Clearing obstacles blocking access</h3>
              <p>Removing items that prevent emergency services from reaching your home.</p>
            </div>
            <div className="service-item">
              <h3>Improving gate/driveway visibility</h3>
              <p>Enhancing visibility of entrances for emergency responders.</p>
            </div>
            <div className="service-item">
              <h3>Securing or adjusting loose items</h3>
              <p>Fixing items that obstruct responders or create hazards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hazard Reduction */}
      <section className="section service-category">
        <div className="container">
          <div className="category-header">
            <h2>⚠️ Hazard Reduction</h2>
            <p>Identifying and removing safety hazards around the home</p>
          </div>
          <div className="services-grid">
            <div className="service-item">
              <h3>Identifying trip hazards</h3>
              <p>Professional assessment of potential trip and fall risks around your property.</p>
            </div>
            <div className="service-item">
              <h3>Minor hazard removal</h3>
              <p>Removing or fixing small hazards that pose safety risks.</p>
            </div>
            <div className="service-item">
              <h3>Clearing unsafe deck or patio areas</h3>
              <p>Making outdoor living spaces safe and accessible.</p>
            </div>
            <div className="service-item">
              <h3>Removing items that pose fall risks</h3>
              <p>Clearing or securing items that could cause falls or injuries.</p>
            </div>
            <div className="service-item">
              <h3>General safety tidying</h3>
              <p>One-off support for vulnerable clients to maintain safe access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supportive Services */}
      <section className="section service-category alt">
        <div className="container">
          <div className="category-header">
            <h2>🤝 Supportive Services</h2>
            <p>Assessment, follow-up, and connection to additional support</p>
          </div>
          <div className="services-grid">
            <div className="service-item">
              <h3>Home safety assessments</h3>
              <p>Free, friendly assessments by trained volunteers identifying outdoor hazards and safety improvements.</p>
            </div>
            <div className="service-item">
              <h3>Follow-up checks</h3>
              <p>Ensuring safety improvements are maintained and effective over time.</p>
            </div>
            <div className="service-item">
              <h3>Referral pathways</h3>
              <p>Connecting clients with other community services and support networks.</p>
            </div>
            <div className="service-item">
              <h3>Linking with local support</h3>
              <p>Helping clients access additional local resources and assistance where needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <h2 className="section-title">Need Our Services?</h2>
          <p className="lead">If you or someone you know could benefit from our services, we're here to help.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-large">Contact Us</Link>
            <Link to="/get-involved#refer" className="btn btn-outline btn-large">Make a Referral</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services

