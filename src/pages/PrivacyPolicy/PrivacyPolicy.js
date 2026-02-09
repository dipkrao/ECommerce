import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              HY Nutrition ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or make purchases from us.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
            <div className="info-box">
              <p><strong>Company Details:</strong></p>
              <p>HY Nutrition Inc.</p>
              <p>Business Registration: NY-123456789</p>
              <p>Tax ID: 12-3456789</p>
              <p>Founded: 2020</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul>
              <li>Name and contact information (email address, phone number, mailing address)</li>
              <li>Account credentials and profile information</li>
              <li>Payment and billing information</li>
              <li>Order history and preferences</li>
              <li>Communication preferences</li>
            </ul>

            <div className="example-box">
              <h4>Examples of Personal Information:</h4>
              <ul>
                <li><strong>Name:</strong> John Smith, Jane Doe</li>
                <li><strong>Email:</strong> john.smith@email.com, jane.doe@email.com</li>
                <li><strong>Phone:</strong> +1 (555) 123-4567, +1 (555) 987-6543</li>
                <li><strong>Address:</strong> 123 Main St, New York, NY 10001</li>
                <li><strong>Payment:</strong> Visa ending in 1234, PayPal account</li>
              </ul>
            </div>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, links clicked)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location information (with your consent)</li>
            </ul>

            <div className="example-box">
              <h4>Examples of Automatically Collected Data:</h4>
              <ul>
                <li><strong>Device:</strong> iPhone 14, Samsung Galaxy S23, MacBook Pro</li>
                <li><strong>Browser:</strong> Chrome 120.0, Safari 17.0, Firefox 121.0</li>
                <li><strong>OS:</strong> iOS 17.2, Android 14, macOS 14.2</li>
                <li><strong>IP Range:</strong> 192.168.1.1 - 192.168.1.255</li>
                <li><strong>Location:</strong> New York City, NY (approximate)</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Improve our website and services</li>
              <li>Personalize your shopping experience</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <div className="example-box">
              <h4>Specific Use Cases:</h4>
              <ul>
                <li><strong>Order Processing:</strong> When you order "Whey Protein 2lb" for ₹49.99</li>
                <li><strong>Shipping Updates:</strong> "Your order #ORD-2024-001 has been shipped via FedEx"</li>
                <li><strong>Personalization:</strong> "Based on your purchase of pre-workout, you might like..."</li>
                <li><strong>Customer Support:</strong> "Hello John, regarding your inquiry about shipping..."</li>
                <li><strong>Fraud Prevention:</strong> "Unusual login detected from new device"</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>4. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our website and providing services</li>
              <li><strong>Payment Processors:</strong> With payment processors to complete transactions</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <div className="example-box">
              <h4>Third-Party Service Providers:</h4>
              <ul>
                <li><strong>Hosting:</strong> AWS (Amazon Web Services) - Server hosting and cloud services</li>
                <li><strong>Payment:</strong> Stripe, PayPal - Payment processing and fraud prevention</li>
                <li><strong>Analytics:</strong> Google Analytics - Website usage analysis</li>
                <li><strong>Email:</strong> Mailchimp - Marketing email campaigns</li>
                <li><strong>Shipping:</strong> FedEx, UPS - Order delivery and tracking</li>
                <li><strong>Customer Support:</strong> Zendesk - Help desk and support tickets</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information:</p>
            <ul>
              <li>Encryption of sensitive data during transmission</li>
              <li>Secure storage of personal information</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>

            <div className="example-box">
              <h4>Security Measures in Detail:</h4>
              <ul>
                <li><strong>Encryption:</strong> AES-256 encryption for data at rest, TLS 1.3 for data in transit</li>
                <li><strong>Authentication:</strong> Multi-factor authentication (MFA) for admin accounts</li>
                <li><strong>Access Control:</strong> Role-based access control (RBAC) system</li>
                <li><strong>Monitoring:</strong> 24/7 security monitoring and intrusion detection</li>
                <li><strong>Backups:</strong> Daily encrypted backups stored in multiple locations</li>
                <li><strong>Compliance:</strong> SOC 2 Type II certified, PCI DSS compliant</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>6. Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>

            <div className="example-box">
              <h4>How to Exercise Your Rights:</h4>
              <ul>
                <li><strong>Access Request:</strong> Email privacy@HY Nutrition.com with subject "Data Access Request"</li>
                <li><strong>Correction:</strong> Update your profile in your account settings</li>
                <li><strong>Deletion:</strong> Submit deletion request through customer support</li>
                <li><strong>Marketing Opt-out:</strong> Click "Unsubscribe" in any marketing email</li>
                <li><strong>Response Time:</strong> We respond to all requests within 30 days</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to enhance your browsing experience:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
              <li><strong>Marketing Cookies:</strong> Used for personalized advertising</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
            </ul>
            <p>You can control cookie preferences through your browser settings.</p>

            <div className="example-box">
              <h4>Cookie Examples:</h4>
              <ul>
                <li><strong>Session Cookie:</strong> "powerfuel_session" - expires when browser closes</li>
                <li><strong>Authentication:</strong> "auth_token" - stores login session</li>
                <li><strong>Preferences:</strong> "language" - remembers your language choice</li>
                <li><strong>Analytics:</strong> "_ga" - Google Analytics tracking</li>
                <li><strong>Marketing:</strong> "fbp" - Facebook pixel for ads</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>8. Third-Party Services</h2>
            <p>Our website may contain links to third-party services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.</p>

            <div className="example-box">
              <h4>Third-Party Services We Use:</h4>
              <ul>
                <li><strong>Social Media:</strong> Facebook, Instagram, Twitter integration</li>
                <li><strong>Payment:</strong> Stripe, PayPal, Apple Pay, Google Pay</li>
                <li><strong>Analytics:</strong> Google Analytics, Hotjar, Mixpanel</li>
                <li><strong>Advertising:</strong> Google Ads, Facebook Ads, Instagram Ads</li>
                <li><strong>Reviews:</strong> Trustpilot, Yelp, Google Reviews</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.</p>

            <div className="example-box">
              <h4>Age Verification:</h4>
              <ul>
                <li><strong>Registration:</strong> Users must be 18+ to create accounts</li>
                <li><strong>Purchases:</strong> Credit card verification for age confirmation</li>
                <li><strong>Content:</strong> Age-appropriate content filtering</li>
                <li><strong>Reporting:</strong> Report underage users to privacy@HY Nutrition.com</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>10. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.</p>

            <div className="example-box">
              <h4>Data Transfer Locations:</h4>
              <ul>
                <li><strong>Primary:</strong> United States (New York, NY)</li>
                <li><strong>Backup:</strong> Canada (Toronto, ON)</li>
                <li><strong>CDN:</strong> Global content delivery network</li>
                <li><strong>Compliance:</strong> GDPR, CCPA, PIPEDA compliant</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>11. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.</p>

            <div className="example-box">
              <h4>Recent Policy Updates:</h4>
              <ul>
                <li><strong>December 2024:</strong> Added CCPA compliance section</li>
                <li><strong>October 2024:</strong> Updated cookie policy details</li>
                <li><strong>August 2024:</strong> Enhanced data security measures</li>
                <li><strong>June 2024:</strong> Added international data transfer information</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> privacy@HY Nutrition.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Ecommerce Street, Business District, NY 10001</p>
              <p><strong>Data Protection Officer:</strong> Sarah Johnson</p>
              <p><strong>Response Time:</strong> Within 24-48 hours</p>
            </div>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
