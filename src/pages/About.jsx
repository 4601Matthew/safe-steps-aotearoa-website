import './About.css'

function About() {
  return (
    <div className="about">
      {/* Mission & Vision Section */}
      <section className="section">
        <div className="container">
          <h1 className="page-title">About Safe Steps Aotearoa</h1>
          
          <div className="mission-vision">
            <div className="mission-box">
              <h2>⭐ Mission Statement</h2>
              <p>
                To support vulnerable New Zealanders by creating safer, more accessible home environments—reducing preventable harm and empowering people to remain independent, confident, and connected in their own homes.
              </p>
            </div>
            
            <div className="vision-box">
              <h2>🌄 Vision Statement</h2>
              <p>
                A safer Aotearoa where everyone, regardless of age, health, or circumstance, can live in a home that supports their wellbeing and enables emergency responders to reach them without barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">💚 Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>1. Manaakitanga (Care & Compassion)</h3>
              <p>We treat every person with dignity, kindness, and respect, recognising the mana of each individual and whānau.</p>
            </div>
            
            <div className="value-card">
              <h3>2. Prevention First</h3>
              <p>Small steps can prevent major harm. We focus on early, practical interventions that reduce injuries and improve safety before emergencies occur.</p>
            </div>
            
            <div className="value-card">
              <h3>3. Equity & Access</h3>
              <p>Everyone deserves a safe home. We work to reduce health inequities by reaching people who face financial, physical, or social barriers to maintaining their environment.</p>
            </div>
            
            <div className="value-card">
              <h3>4. Community Connection</h3>
              <p>We believe in the power of community helping community — building supportive relationships between volunteers, trades, responders, and the people we serve.</p>
            </div>
            
            <div className="value-card">
              <h3>5. Integrity & Trust</h3>
              <p>We are transparent, accountable, and committed to doing what is right for those who rely on us.</p>
            </div>
            
            <div className="value-card">
              <h3>6. Whanaungatanga (Relationships)</h3>
              <p>We value strong partnerships and collaboration, knowing that lasting change comes from working together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section founder-section">
        <div className="container">
          <h2 className="section-title">🧑‍⚕️ About the Founder</h2>
          <div className="founder-content">
            <p>
              <strong>Cameron New</strong> is a paramedic who has responded to countless emergencies across Aotearoa. Time and again, Cameron witnessed how outdoor hazards—slippery paths, poor lighting, hidden house numbers—contributed to preventable injuries and delayed emergency care.
            </p>
            <p>
              Motivated by these experiences, Cameron founded <strong>Safe Steps Aotearoa</strong> to address the gap between health needs and practical home safety support.
            </p>
          </div>
        </div>
      </section>

      {/* Trustees Section */}
      <section className="section trustees-section">
        <div className="container">
          <h2 className="section-title">Trustees</h2>
          <p className="lead">The founding trustees of Safe Steps Aotearoa bring a combination of lived experience, community focus, professional insight, and commitment to improving safety and wellbeing across Aotearoa.</p>
          <div className="trustees-list">
            <div className="trustee-item">
              <h3>Cameron New</h3>
              <p>Paramedic and Founder</p>
            </div>
            <div className="trustee-item">
              <h3>Jade Morris</h3>
              <p>Trustee</p>
            </div>
            <div className="trustee-item">
              <h3>Aakash Shah</h3>
              <p>Trustee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="section governance-section">
        <div className="container">
          <h2 className="section-title">📄 Governance & Legal Structure</h2>
          <div className="governance-content">
            <p>
              Safe Steps Aotearoa is established as an <strong>Incorporated Charitable Trust</strong> under New Zealand law. This structure provides strong legal footing, transparency, and accountability, while allowing the organisation to operate with flexibility and community focus.
            </p>
            
            <div className="governance-box">
              <h3>Purpose of the Trust</h3>
              <p>
                The trust exists to support vulnerable members of the community by improving home safety, reducing preventable harm, and addressing inequities that make safe living environments difficult for many New Zealanders to maintain. All activities and decisions made by the trustees will align with this charitable purpose.
              </p>
            </div>
            
            <div className="governance-box">
              <h3>Governance Approach</h3>
              <p>Safe Steps Aotearoa is committed to:</p>
              <ul>
                <li>Transparent and ethical decision-making</li>
                <li>Operating in the best interests of the communities we serve</li>
                <li>Ensuring compliance with the Trusts Act 2019, Charities Services requirements, and all relevant health and safety standards</li>
                <li>Maintaining strong financial accountability, including annual reporting, audit/verification processes, and clear operational policies</li>
              </ul>
            </div>
            
            <div className="governance-box">
              <h3>Trustee Responsibilities</h3>
              <p>Trustees will oversee:</p>
              <ul>
                <li>Strategic direction and long-term planning</li>
                <li>Financial stewardship and approval of budgets</li>
                <li>Monitoring of service delivery, safety, and community impact</li>
                <li>Ensuring the organisation remains aligned with its charitable purpose</li>
                <li>Approving partnerships, funding applications, and major initiatives</li>
                <li>Risk management and organisational resilience</li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

