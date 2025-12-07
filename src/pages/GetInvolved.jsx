import { Link } from 'react-router-dom'
import './GetInvolved.css'

function GetInvolved() {
  return (
    <div className="get-involved">
      <section className="page-banner">
        <div className="container">
          <h1 className="page-title">Get Involved</h1>
          <p className="lead">
            Safe Steps Aotearoa is built on community support. There are many ways you can help make homes safer across Aotearoa.
          </p>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="section involvement-section">
        <div className="container">
          <div className="involvement-card">
            <div className="involvement-icon">🙋</div>
            <h2>Volunteer</h2>
            <p>
              Join our community team and help make homes safer for your neighbors. Volunteers are the heart of Safe Steps Aotearoa, providing practical support and building connections within our communities.
            </p>
            <div className="involvement-details">
              <h3>What volunteers do:</h3>
              <ul>
                <li>Conduct home safety assessments</li>
                <li>Clear pathways and entrances</li>
                <li>Install reflective house numbers</li>
                <li>Replace outdoor light bulbs</li>
                <li>Light garden tidying</li>
                <li>Simple hazard removal</li>
                <li>Follow-up visits and support</li>
              </ul>
              <h3>What we provide:</h3>
              <ul>
                <li>Training and support</li>
                <li>Safety equipment and tools</li>
                <li>Insurance coverage</li>
                <li>Flexible time commitments</li>
                <li>A meaningful way to help your community</li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn-primary">Become a Volunteer</Link>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" className="section involvement-section alt">
        <div className="container">
          <div className="involvement-card">
            <div className="involvement-icon">💼</div>
            <h2>Partner With Us</h2>
            <p>
              Are you a contractor, hardware supplier, or community organization? We're always looking for partners who share our vision of safer homes across Aotearoa.
            </p>
            <div className="involvement-details">
              <h3>Partnership opportunities:</h3>
              <ul>
                <li><strong>Contractors:</strong> Provide services at discounted rates or donate time for vulnerable clients</li>
                <li><strong>Hardware Suppliers:</strong> Donate materials or provide discounts on safety equipment</li>
                <li><strong>Community Organizations:</strong> Refer clients, share resources, or collaborate on projects</li>
                <li><strong>Health Services:</strong> Refer patients who could benefit from our services</li>
                <li><strong>Local Councils:</strong> Work together on community safety initiatives</li>
              </ul>
              <h3>Benefits of partnering:</h3>
              <ul>
                <li>Make a meaningful difference in your community</li>
                <li>Tax benefits for charitable contributions</li>
                <li>Positive community recognition</li>
                <li>Connection to a network of community-focused organizations</li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn-secondary">Partner With Us</Link>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="section involvement-section">
        <div className="container">
          <div className="involvement-card">
            <div className="involvement-icon">💝</div>
            <h2>Donate</h2>
            <p>
              Support our work through funding, materials, or services. Every contribution helps us reach more people and make more homes safe.
            </p>
            <div className="involvement-details">
              <h3>Ways to donate:</h3>
              <ul>
                <li><strong>Financial Donations:</strong> Support our operations and help us reach more clients</li>
                <li><strong>Materials:</strong> Donate safety equipment, tools, or supplies</li>
                <li><strong>Services:</strong> Provide professional services at reduced rates or pro bono</li>
                <li><strong>In-Kind Support:</strong> Office space, vehicles, or other resources</li>
              </ul>
              <h3>Tax benefits:</h3>
              <p>
                Safe Steps Aotearoa is applying for donee status with IRD, which will provide tax benefits for donors. All donations will be used directly to support our mission of creating safer homes.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary">Make a Donation</Link>
          </div>
        </div>
      </section>

      {/* Refer Section */}
      <section id="refer" className="section involvement-section alt">
        <div className="container">
          <div className="involvement-card">
            <div className="involvement-icon">📢</div>
            <h2>Refer Someone</h2>
            <p>
              Know someone who could benefit from our services? Health professionals, social workers, and community members can refer clients to us.
            </p>
            <div className="involvement-details">
              <h3>Who can benefit:</h3>
              <ul>
                <li>Older adults with limited mobility</li>
                <li>Disabled individuals facing physical barriers</li>
                <li>People living alone without nearby support</li>
                <li>Those experiencing financial hardship</li>
                <li>Individuals recovering from illness or injury</li>
                <li>Socially isolated residents</li>
              </ul>
              <h3>How to refer:</h3>
              <ul>
                <li>Contact us through our contact form or email</li>
                <li>Provide basic information about the person's needs</li>
                <li>We'll make contact and arrange an assessment</li>
                <li>Self-referrals are also welcome</li>
              </ul>
              <h3>Referral sources:</h3>
              <ul>
                <li>Health professionals (GPs, nurses, paramedics)</li>
                <li>Community workers and social services</li>
                <li>Family members and whānau</li>
                <li>Neighbors and community members</li>
                <li>Self-referrals</li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn-secondary">Make a Referral</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Make a Difference?</h2>
          <p className="lead">Every contribution, big or small, helps us create safer homes across Aotearoa.</p>
          <Link to="/contact" className="btn btn-primary btn-large">Get in Touch</Link>
        </div>
      </section>
    </div>
  )
}

export default GetInvolved

