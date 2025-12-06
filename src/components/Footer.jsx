import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Safe Steps Aotearoa</h3>
            <p className="footer-tagline">Small steps. Big difference.</p>
            <p>Supporting vulnerable New Zealanders by creating safer, more accessible home environments.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/get-involved">Get Involved</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul className="footer-links">
              <li><Link to="/get-involved#volunteer">Volunteer</Link></li>
              <li><Link to="/get-involved#partner">Partner With Us</Link></li>
              <li><Link to="/get-involved#donate">Donate</Link></li>
              <li><Link to="/get-involved#refer">Refer Someone</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Hamilton, Waikato, New Zealand 🇳🇿</p>
            <p>Email: Coming soon</p>
            <p>Website: Coming soon</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Safe Steps Aotearoa. All rights reserved.</p>
          <p>Incorporated Charitable Trust | Charities Services Registration (pending)</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

