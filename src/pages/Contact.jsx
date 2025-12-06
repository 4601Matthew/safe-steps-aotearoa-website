import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, this would send the form data to a backend
    // For now, we'll just show a success message
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'general'
      })
    }, 5000)
  }

  return (
    <div className="contact">
      <section className="section">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="lead">
            We're here to help. Whether you need our services, want to volunteer, or have questions, we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div className="info-item">
                <h3>📍 Location</h3>
                <p>Hamilton, Waikato, New Zealand 🇳🇿</p>
                <p>Currently serving: Hamilton City & Wider Waikato Region</p>
              </div>
              
              <div className="info-item">
                <h3>📧 Email</h3>
                <p>Coming soon</p>
                <p>We're setting up our contact email. Please use the form below for now.</p>
              </div>
              
              <div className="info-item">
                <h3>🌐 Website</h3>
                <p>Coming soon</p>
              </div>

              <div className="info-item">
                <h3>⏰ Response Time</h3>
                <p>We aim to respond to all inquiries within 2-3 business days.</p>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <h3>✓ Thank you for your message!</h3>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="type">I'm interested in:</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="services">Request Services</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="partner">Partnership</option>
                      <option value="donate">Donation</option>
                      <option value="refer">Make a Referral</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-large">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section map-section">
        <div className="container">
          <h2 className="section-title">Where We Operate</h2>
          <p className="lead">
            Currently serving: <strong>Hamilton City & Wider Waikato Region</strong>
          </p>
          <p>
            We're starting local and building strong foundations before expanding across Aotearoa. If you're outside our current service area, please still get in touch—we may be able to help or connect you with local resources.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Contact

