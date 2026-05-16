import React from "react";
import { Link } from "react-router-dom";
import StoreContactInfo from "../../components/StoreContactInfo/StoreContactInfo";
import "./CookiePolicy.css";

const CookiePolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Cookie Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device
              (computer, tablet, or mobile phone) when you visit our website.
              They are widely used to make websites work more efficiently and
              provide information to website owners.
            </p>
            <p>
              Cookies help us provide you with a better experience by
              remembering your preferences, analyzing how you use our site, and
              personalizing content and advertisements.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. How We Use Cookies</h2>
            <p>HY Nutrition uses cookies for several purposes:</p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for basic website
                functionality
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how
                visitors interact with our website
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                and settings
              </li>
              <li>
                <strong>Targeting Cookies:</strong> Used to deliver relevant
                advertisements
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Provide insights into
                website usage patterns
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Types of Cookies We Use</h2>
            
            <h3>3.1 Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly.
              They enable basic functions like page navigation, access to secure
              areas, and shopping cart functionality. The website cannot
              function properly without these cookies.
            </p>
            <ul>
              <li>Authentication cookies (login sessions)</li>
              <li>Shopping cart cookies</li>
              <li>Security cookies</li>
              <li>Load balancing cookies</li>
            </ul>

            <div className="example-box">
              <h4>Essential Cookie Examples:</h4>
              <ul>
                <li><strong>Session ID:</strong> "powerfuel_session" - expires when browser closes</li>
                <li><strong>Authentication:</strong> "auth_token" - stores login session (24 hours)</li>
                <li><strong>Cart:</strong> "shopping_cart" - remembers items in cart (7 days)</li>
                <li><strong>Security:</strong> "csrf_token" - prevents cross-site attacks (session)</li>
                <li><strong>Language:</strong> "locale" - remembers your language preference (1 year)</li>
              </ul>
            </div>

            <h3>3.2 Performance and Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our
              website by collecting and reporting information anonymously.
            </p>
            <ul>
              <li>Google Analytics cookies</li>
              <li>Page load time tracking</li>
              <li>User behavior analysis</li>
              <li>Error tracking and monitoring</li>
            </ul>

            <div className="example-box">
              <h4>Analytics Cookie Examples:</h4>
              <ul>
                <li><strong>Google Analytics:</strong> "_ga" - unique visitor ID (2 years)</li>
                <li><strong>Page Views:</strong> "_gid" - session tracking (24 hours)</li>
                <li><strong>Campaigns:</strong> "_utmz" - traffic source tracking (6 months)</li>
                <li><strong>Performance:</strong> "perf_data" - page load metrics (1 month)</li>
                <li><strong>Errors:</strong> "error_log" - JavaScript error tracking (7 days)</li>
              </ul>
            </div>

            <h3>3.3 Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization,
              such as remembering your language preference or region.
            </p>
            <ul>
              <li>Language preference cookies</li>
              <li>Region/location cookies</li>
              <li>User preference cookies</li>
              <li>Social media integration cookies</li>
            </ul>

            <div className="example-box">
              <h4>Functional Cookie Examples:</h4>
              <ul>
                <li><strong>Preferences:</strong> "theme" - dark/light mode choice (1 year)</li>
                <li><strong>Currency:</strong> "currency" - USD, EUR, GBP selection (1 year)</li>
                <li><strong>Notifications:</strong> "notif_settings" - email preferences (1 year)</li>
                <li><strong>Search History:</strong> "recent_searches" - last 5 searches (30 days)</li>
                <li><strong>Wishlist:</strong> "wishlist_items" - saved products (1 year)</li>
              </ul>
            </div>

            <h3>3.4 Targeting and Advertising Cookies</h3>
            <p>
              These cookies are used to deliver advertisements more relevant to
              you and your interests. They also limit the number of times you
              see an advertisement and help measure the effectiveness of
              advertising campaigns.
            </p>
            <ul>
              <li>Retargeting cookies</li>
              <li>Social media advertising cookies</li>
              <li>Affiliate marketing cookies</li>
              <li>Cross-site tracking cookies</li>
            </ul>

            <div className="example-box">
              <h4>Advertising Cookie Examples:</h4>
              <ul>
                <li><strong>Facebook Pixel:</strong> "fbp" - Facebook advertising (3 months)</li>
                <li><strong>Google Ads:</strong> "gclid" - Google Ads tracking (90 days)</li>
                <li><strong>Retargeting:</strong> "retarget_id" - product recommendation (60 days)</li>
                <li><strong>Affiliate:</strong> "aff_id" - affiliate link tracking (30 days)</li>
                <li><strong>Social Proof:</strong> "social_views" - recent purchases display (7 days)</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>4. Third-Party Cookies</h2>
            <p>
              Our website may use third-party cookies from the following
              services:
            </p>
            
            <h3>4.1 Google Analytics</h3>
            <p>
              We use Google Analytics to understand how visitors use our
              website. Google Analytics cookies collect information about your
              use of our website, including your IP address, which is
              transmitted to Google.
            </p>

            <div className="example-box">
              <h4>Google Analytics Details:</h4>
              <ul>
                <li><strong>Service:</strong> Google Analytics 4 (GA4)</li>
                <li><strong>Data Collected:</strong> Page views, session duration, bounce rate</li>
                <li><strong>Retention:</strong> 26 months (configurable)</li>
                <li><strong>Privacy:</strong> IP addresses are anonymized</li>
                <li><strong>Opt-out:</strong> Google Analytics Opt-out Browser Add-on</li>
              </ul>
            </div>

            <h3>4.2 Payment Processors</h3>
            <p>
              Payment processors like Stripe and PayPal may place cookies to
              ensure secure payment processing and fraud prevention.
            </p>

            <div className="example-box">
              <h4>Payment Processor Cookies:</h4>
              <ul>
                <li><strong>Stripe:</strong> "stripe_mid" - fraud prevention (1 year)</li>
                <li><strong>PayPal:</strong> "paypal_flow" - payment flow tracking (session)</li>
                <li><strong>Apple Pay:</strong> "apple_pay_session" - payment method (1 hour)</li>
                <li><strong>Google Pay:</strong> "google_pay_token" - payment authentication (24 hours)</li>
                <li><strong>Fraud Detection:</strong> "risk_score" - transaction risk assessment (7 days)</li>
              </ul>
            </div>

            <h3>4.3 Social Media Platforms</h3>
            <p>
              Social media platforms may place cookies when you interact with
              social media features on our website, such as sharing buttons or
              embedded content.
            </p>

            <div className="example-box">
              <h4>Social Media Cookies:</h4>
              <ul>
                <li><strong>Facebook:</strong> "c_user" - user ID (1 year), "xs" - session (3 months)</li>
                <li><strong>Instagram:</strong> "ig_did" - device ID (1 year), "sessionid" - session (1 year)</li>
                <li><strong>Twitter:</strong> "auth_token" - authentication (1 year), "ct0" - CSRF (1 year)</li>
                <li><strong>LinkedIn:</strong> "li_at" - authentication (1 year), "JSESSIONID" - session (1 year)</li>
                <li><strong>Pinterest:</strong> "_auth" - authentication (1 year), "session" - session (1 year)</li>
              </ul>
            </div>

            <h3>4.4 Advertising Networks</h3>
            <p>
              We may work with advertising networks that place cookies to
              deliver personalized advertisements based on your browsing
              behavior.
            </p>

            <div className="example-box">
              <h4>Advertising Network Cookies:</h4>
              <ul>
                <li><strong>Google Ads:</strong> "1P_JAR" - personalization (1 month), "NID" - preferences (6 months)</li>
                <li><strong>Facebook Ads:</strong> "fr" - advertising (3 months), "datr" - device (2 years)</li>
                <li><strong>Amazon Ads:</strong> "ad-id" - advertising (1 year), "ad-privacy" - privacy (1 year)</li>
                <li><strong>Microsoft Ads:</strong> "MUID" - unique ID (1 year), "ANON" - anonymous (1 year)</li>
                <li><strong>Taboola:</strong> "taboola" - content recommendations (1 year)</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>5. Cookie Duration</h2>
            
            <h3>5.1 Session Cookies</h3>
            <p>
              These cookies are temporary and are deleted when you close your
              browser. They are used to maintain your session while browsing
              our website.
            </p>

            <div className="example-box">
              <h4>Session Cookie Examples:</h4>
              <ul>
                <li><strong>Login Session:</strong> "user_session" - expires when browser closes</li>
                <li><strong>Shopping Cart:</strong> "cart_items" - expires when browser closes</li>
                <li><strong>Form Data:</strong> "form_autosave" - expires when browser closes</li>
                <li><strong>Security:</strong> "csrf_token" - expires when browser closes</li>
                <li><strong>Navigation:</strong> "current_page" - expires when browser closes</li>
              </ul>
            </div>

            <h3>5.2 Persistent Cookies</h3>
            <p>
              These cookies remain on your device for a set period or until
              you delete them. They are used to remember your preferences and
              settings for future visits.
            </p>

            <div className="example-box">
              <h4>Persistent Cookie Examples:</h4>
              <ul>
                <li><strong>Language:</strong> "locale" - expires in 1 year</li>
                <li><strong>Theme:</strong> "dark_mode" - expires in 1 year</li>
                <li><strong>Currency:</strong> "currency_pref" - expires in 1 year</li>
                <li><strong>Analytics:</strong> "_ga" - expires in 2 years</li>
                <li><strong>Advertising:</strong> "ad_preferences" - expires in 6 months</li>
              </ul>
            </div>

            <h3>5.3 Third-Party Cookie Duration</h3>
            <p>
              The duration of third-party cookies is determined by the
              respective third-party services and may vary.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Managing Your Cookie Preferences</h2>
            
            <h3>6.1 Browser Settings</h3>
            <p>
              You can control and manage cookies through your browser settings.
              Most browsers allow you to:
            </p>
            <ul>
              <li>View and delete existing cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Block all cookies</li>
              <li>Set preferences for different types of cookies</li>
            </ul>

            <div className="example-box">
              <h4>Browser-Specific Instructions:</h4>
              <ul>
                <li><strong>Chrome:</strong> Settings → Privacy → Cookies and site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies</li>
                <li><strong>Mobile:</strong> Settings → Safari → Privacy & Security → Block All Cookies</li>
              </ul>
            </div>

            <h3>6.2 Cookie Consent</h3>
            <p>
              When you first visit our website, you will see a cookie consent
              banner. You can:
            </p>
            <ul>
              <li>Accept all cookies</li>
              <li>Accept only essential cookies</li>
              <li>Customize your cookie preferences</li>
              <li>Reject non-essential cookies</li>
            </ul>

            <div className="example-box">
              <h4>Cookie Consent Options:</h4>
              <ul>
                <li><strong>Essential:</strong> Always enabled (required for website function)</li>
                <li><strong>Analytics:</strong> Optional - helps improve website performance</li>
                <li><strong>Functional:</strong> Optional - enhances user experience</li>
                <li><strong>Advertising:</strong> Optional - personalized ads and content</li>
                <li><strong>Social Media:</strong> Optional - social media integration</li>
              </ul>
            </div>

            <h3>6.3 Opt-Out Options</h3>
            <p>
              For certain types of cookies, you can opt out through
              third-party services:
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> Use the Google Analytics
                Opt-out Browser Add-on
              </li>
              <li>
                <strong>Advertising:</strong> Visit the Digital Advertising
                Alliance or Network Advertising Initiative
              </li>
              <li>
                <strong>Social Media:</strong> Adjust privacy settings on
                respective platforms
              </li>
            </ul>

            <div className="example-box">
              <h4>Opt-Out Tools & Services:</h4>
              <ul>
                <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                <li><strong>Digital Advertising:</strong> <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a></li>
                <li><strong>Network Advertising:</strong> <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a></li>
                <li><strong>Facebook:</strong> Facebook Ad Preferences → Ad Settings → Ads based on data from partners</li>
                <li><strong>Google Ads:</strong> Google Account → Data & personalization → Ad personalization</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>7. Impact of Disabling Cookies</h2>
            <p>
              Please note that disabling certain cookies may affect the
              functionality of our website:
            </p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Website may not function
                properly
              </li>
              <li>
                <strong>Performance Cookies:</strong> We won't be able to
                analyze website usage
              </li>
              <li>
                <strong>Functional Cookies:</strong> Preferences won't be
                remembered
              </li>
              <li>
                <strong>Targeting Cookies:</strong> Advertisements may be less
                relevant
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the updated policy on our website.
            </p>
            <p>
              The "Last updated" date at the top of this policy indicates when
              it was last revised.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie
              Policy, please contact us:
            </p>
            <StoreContactInfo />
          </section>

          <section className="legal-section">
            <h2>10. Additional Resources</h2>
            <p>
              For more information about cookies and how to manage them, you may
              visit:
            </p>
            <ul>
              <li>
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  All About Cookies
                </a>
              </li>
              <li>
                <a
                  href="https://www.youronlinechoices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Your Online Choices
                </a>
              </li>
              <li>
                <a
                  href="https://www.networkadvertising.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Network Advertising Initiative
                </a>
              </li>
              <li>
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Digital Advertising Alliance
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
