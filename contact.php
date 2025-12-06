<?php
$pageTitle = 'Contact Us';
include 'includes/header.php';
?>

<section class="hero" style="padding: 3rem 0;">
    <div class="container">
        <h1>Contact Us</h1>
        <p class="tagline">We're here to help</p>
    </div>
</section>

<section class="section">
    <div class="container">
        <div class="two-column">
            <div class="content-block">
                <h2>Get in Touch</h2>
                <p>Whether you need our services, want to volunteer, have questions, or want to make a referral, we'd love to hear from you.</p>
                
                <div style="margin-top: 2rem;">
                    <h3>📍 Location</h3>
                    <p><strong>Hamilton, Waikato<br>New Zealand 🇳🇿</strong></p>
                    <p style="margin-top: 1rem;">Currently serving: <strong>Hamilton City & Wider Waikato Region</strong></p>
                </div>
                
                <div style="margin-top: 2rem;">
                    <h3>📧 Contact Information</h3>
                    <p><strong>Email:</strong> Coming soon</p>
                    <p><strong>Phone:</strong> Coming soon</p>
                    <p style="margin-top: 1rem; font-style: italic;">Contact details will be updated as they become available. In the meantime, please use the form to get in touch.</p>
                </div>
                
                <div style="margin-top: 2rem;">
                    <h3>⏰ Response Times</h3>
                    <p>We aim to respond to all inquiries within 2-3 business days. For urgent referrals, please note this in your message and we'll prioritize your request.</p>
                </div>
                
                <div style="margin-top: 2rem;">
                    <h3>💬 What to Include</h3>
                    <p>When contacting us, please include:</p>
                    <ul class="feature-list">
                        <li>Your name and contact details</li>
                        <li>The reason for your inquiry</li>
                        <li>If making a referral, basic information about the situation</li>
                        <li>Any questions or specific needs</li>
                    </ul>
                </div>
            </div>
            
            <div class="content-block">
                <div class="contact-form" id="contactForm">
                    <h3>Send Us a Message</h3>
                    <form method="POST" action="">
                        <div class="form-success" id="formSuccess"></div>
                        
                        <div class="form-group">
                            <label for="name">Your Name *</label>
                            <input type="text" id="name" name="name" required>
                            <div class="form-error" id="nameError"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Your Email *</label>
                            <input type="email" id="email" name="email" required>
                            <div class="form-error" id="emailError"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="phone">Phone Number (Optional)</label>
                            <input type="tel" id="phone" name="phone">
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Subject *</label>
                            <select id="subject" name="subject" required>
                                <option value="">Please select...</option>
                                <option value="request-service">Request a Service</option>
                                <option value="referral">Make a Referral</option>
                                <option value="volunteer">Volunteer Inquiry</option>
                                <option value="donate">Donation Inquiry</option>
                                <option value="partner">Partnership Inquiry</option>
                                <option value="general">General Inquiry</option>
                            </select>
                            <div class="form-error" id="subjectError"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Message *</label>
                            <textarea id="message" name="message" rows="6" required></textarea>
                            <div class="form-error" id="messageError"></div>
                        </div>
                        
                        <button type="submit" class="btn" style="width: 100%;">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt">
    <div class="container">
        <div class="section-title">
            <h2>Other Ways to Reach Us</h2>
            <p>Find us on social media or get involved in other ways</p>
        </div>
        
        <div class="cards">
            <div class="card">
                <h3>📱 Social Media</h3>
                <p>Follow us for updates and stories from the community</p>
                <p style="margin-top: 1rem; font-style: italic;">Social media accounts coming soon</p>
            </div>
            
            <div class="card">
                <h3>📰 Newsletter</h3>
                <p>Stay updated with our latest news and impact stories</p>
                <p style="margin-top: 1rem; font-style: italic;">Newsletter subscription coming soon</p>
            </div>
            
            <div class="card">
                <h3>🏛️ Office Visits</h3>
                <p>We're currently operating remotely. Office location details will be updated as we establish a physical presence.</p>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <div class="section-title">
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about contacting us and our services</p>
        </div>
        
        <div class="cards">
            <div class="card">
                <h3>How quickly will you respond?</h3>
                <p>We aim to respond to all inquiries within 2-3 business days. For urgent referrals, please note this in your message and we'll do our best to respond sooner.</p>
            </div>
            
            <div class="card">
                <h3>Can I refer someone anonymously?</h3>
                <p>Yes, you can make an anonymous referral, though we may need to contact the person directly to verify their interest in our services. We always respect privacy and autonomy.</p>
            </div>
            
            <div class="card">
                <h3>Do I need to provide detailed information?</h3>
                <p>Basic information is helpful, but you don't need to provide extensive details in your initial contact. We'll follow up to get any additional information we need.</p>
            </div>
            
            <div class="card">
                <h3>Can I request a specific service?</h3>
                <p>Absolutely! If you know what service you need, please mention it in your message. We'll discuss options and see how we can help.</p>
            </div>
            
            <div class="card">
                <h3>What if I'm outside your service area?</h3>
                <p>We're currently serving Hamilton City and the wider Waikato region. If you're outside this area, we may be able to provide advice or refer you to similar services in your area.</p>
            </div>
            
            <div class="card">
                <h3>Can I volunteer even if I'm not in Hamilton?</h3>
                <p>We're starting in the Waikato region, but if you're interested in volunteering and live elsewhere, please get in touch. We may expand to your area in the future!</p>
            </div>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="container">
        <h2>Still Have Questions?</h2>
        <p>Don't hesitate to reach out—we're here to help and answer any questions you might have.</p>
        <a href="contact.php#contactForm" class="btn">Send Us a Message</a>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

