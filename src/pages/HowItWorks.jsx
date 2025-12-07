import { Link } from 'react-router-dom'
import './HowItWorks.css'

function HowItWorks() {
  return (
    <div className="how-it-works">
      <section className="page-banner">
        <div className="container">
          <h1 className="page-title">How It Works</h1>
          <p className="lead">
            Our process is simple, friendly, and designed to make getting help as easy as possible. From referral to follow-up, we're here to support you every step of the way.
          </p>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h2>Referral</h2>
                <p>
                  Referrals can come from health professionals, community workers, whānau (family), or you can refer yourself. We accept referrals from anyone who identifies a need for our services.
                </p>
                <div className="step-details">
                  <h3>Who can refer?</h3>
                  <ul>
                    <li>Health professionals (GPs, nurses, paramedics)</li>
                    <li>Community workers and social services</li>
                    <li>Family members and whānau</li>
                    <li>Self-referrals</li>
                    <li>Neighbors and community members</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h2>Initial Contact & Assessment</h2>
                <p>
                  We'll make contact to understand your situation and needs. A trained volunteer will conduct a friendly, respectful home safety assessment to identify hazards and potential improvements.
                </p>
                <div className="step-details">
                  <h3>What happens during assessment?</h3>
                  <ul>
                    <li>Friendly conversation about your needs</li>
                    <li>Visual inspection of outdoor areas</li>
                    <li>Identification of safety hazards</li>
                    <li>Discussion of potential improvements</li>
                    <li>Respect for your privacy and dignity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h2>Safety Plan Created</h2>
                <p>
                  Together with you, we'll create a simple, clear action plan that addresses the identified hazards. The plan will outline what work needs to be done and who will do it (volunteers or contractors).
                </p>
                <div className="step-details">
                  <h3>Your plan includes:</h3>
                  <ul>
                    <li>List of identified hazards</li>
                    <li>Recommended improvements</li>
                    <li>Timeline for completion</li>
                    <li>Who will complete the work</li>
                    <li>Your input and preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h2>Volunteers or Contractors Assigned</h2>
                <p>
                  Based on the safety plan, we'll assign appropriate volunteers or trusted contractors to complete the work. All work is done safely, respectfully, and with your consent.
                </p>
                <div className="step-details">
                  <h3>Who does the work?</h3>
                  <ul>
                    <li><strong>Volunteers:</strong> For simple tasks like clearing pathways, installing house numbers, light garden work</li>
                    <li><strong>Contractors:</strong> For skilled work like pressure washing, lighting installation, pathway repairs</li>
                    <li>All workers are vetted and insured</li>
                    <li>Work is completed at discounted rates or donated</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h2>Work Completed</h2>
                <p>
                  The identified improvements are completed safely and professionally. We ensure all work meets safety standards and addresses the hazards identified in your safety plan.
                </p>
                <div className="step-details">
                  <h3>What to expect:</h3>
                  <ul>
                    <li>Professional, respectful service</li>
                    <li>Clear communication throughout</li>
                    <li>Work completed to safety standards</li>
                    <li>Your property treated with care</li>
                    <li>Completion of all planned improvements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h2>Follow-Up & Support</h2>
                <p>
                  We'll check in to ensure the safety improvements are working well and that you're satisfied. We can also connect you with additional support services if needed.
                </p>
                <div className="step-details">
                  <h3>Follow-up includes:</h3>
                  <ul>
                    <li>Check-in to ensure satisfaction</li>
                    <li>Verification that safety is maintained</li>
                    <li>Connection to additional support if needed</li>
                    <li>Ongoing relationship with our community</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="lead">If you or someone you know could benefit from our services, we're here to help.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-large">Contact Us</Link>
            <Link to="/get-involved#refer" className="btn btn-secondary btn-large">Make a Referral</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks

