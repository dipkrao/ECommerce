import React from "react";
import { Link } from "react-router-dom";
import StoreContactInfo from "../../components/StoreContactInfo/StoreContactInfo";
import "./TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using HY Nutrition's website, mobile application,
              and services, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the
              above, please do not use this service.
            </p>
            <p>
              These Terms of Service ("Terms") govern your use of our website
              and services. Please read them carefully before using our
              services.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              HY Nutrition provides an online platform for purchasing fitness supplements, health products, and related merchandise. Our services include:
            </p>
            <ul>
              <li>Online product browsing and purchasing</li>
              <li>Account management and order tracking</li>
              <li>Customer support and assistance</li>
              <li>Product information and reviews</li>
              <li>Secure payment processing</li>
            </ul>

            <div className="example-box">
              <h4>Our Product Categories:</h4>
              <ul>
                <li><strong>Protein Supplements:</strong> Whey, Casein, Plant-based proteins</li>
                <li><strong>Pre-Workout:</strong> Energy boosters, focus enhancers</li>
                <li><strong>Post-Workout:</strong> Recovery formulas, BCAAs</li>
                <li><strong>Vitamins:</strong> Multivitamins, specific nutrient supplements</li>
                <li><strong>Fitness Equipment:</strong> Resistance bands, yoga mats, weights</li>
                <li><strong>Apparel:</strong> Workout clothes, shoes, accessories</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>3. User Accounts</h2>
            
            <h3>3.1 Account Creation</h3>
            <p>
              To access certain features of our service, you must create an
              account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your account credentials secure</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
            </ul>

            <div className="example-box">
              <h4>Account Requirements:</h4>
              <ul>
                <li><strong>Age:</strong> Must be 18 years or older</li>
                <li><strong>Email:</strong> Valid email address required</li>
                <li><strong>Password:</strong> Minimum 8 characters, must include numbers and symbols</li>
                <li><strong>Verification:</strong> Email verification required for account activation</li>
                <li><strong>Updates:</strong> Keep contact information current</li>
              </ul>
            </div>

            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to notify us immediately of any
              unauthorized use of your account.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Product Information and Pricing</h2>
            
            <h3>4.1 Product Descriptions</h3>
            <p>
              We strive to provide accurate product descriptions, images, and
              pricing. However, we do not warrant that product descriptions or
              other content is accurate, complete, reliable, current, or
              error-free.
            </p>

            <div className="example-box">
              <h4>Product Information Examples:</h4>
              <ul>
                <li><strong>Whey Protein 2lb:</strong> 24g protein per serving, 30 servings per container</li>
                <li><strong>Pre-Workout Formula:</strong> Contains caffeine, creatine, beta-alanine</li>
                <li><strong>Multivitamin:</strong> 100% daily value of essential vitamins and minerals</li>
                <li><strong>Resistance Bands:</strong> 5 different resistance levels, latex-free material</li>
                <li><strong>Yoga Mat:</strong> 6mm thickness, non-slip surface, eco-friendly material</li>
              </ul>
            </div>

            <h3>4.2 Pricing</h3>
            <p>
              All prices are subject to change without notice. Prices do not
              include applicable taxes, shipping, or handling charges. We
              reserve the right to modify or discontinue products at any time.
            </p>

            <div className="example-box">
              <h4>Pricing Structure:</h4>
              <ul>
                <li><strong>Base Prices:</strong> Listed in USD (US Dollars)</li>
                <li><strong>Taxes:</strong> Sales tax applied based on shipping address</li>
                <li><strong>Shipping:</strong> ₹5.99 standard, ₹12.99 express, FREE over ₹50</li>
                <li><strong>Handling:</strong> ₹2.99 processing fee per order</li>
                <li><strong>Discounts:</strong> 10% off first order, 15% off orders over ₹100</li>
              </ul>
            </div>

            <h3>4.3 Availability</h3>
            <p>
              Product availability is subject to change. We reserve the right to
              limit quantities and refuse service to anyone.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Orders and Payment</h2>
            
            <h3>5.1 Order Acceptance</h3>
            <p>
              All orders are subject to acceptance and availability. We reserve
              the right to refuse any order for any reason, including but not
              limited to:
            </p>
            <ul>
              <li>Product unavailability</li>
              <li>Pricing errors</li>
              <li>Fraudulent activity</li>
              <li>Violation of our policies</li>
            </ul>

            <div className="example-box">
              <h4>Order Processing Timeline:</h4>
              <ul>
                <li><strong>Order Confirmation:</strong> Email sent within 1 hour</li>
                <li><strong>Processing:</strong> 1-2 business days</li>
                <li><strong>Shipping:</strong> 3-5 business days standard, 1-2 business days express</li>
                <li><strong>Delivery:</strong> 2-7 business days depending on location</li>
                <li><strong>Tracking:</strong> Updates sent via email and SMS</li>
              </ul>
            </div>

            <h3>5.2 Payment Methods</h3>
            <p>
              We accept various payment methods including credit cards, debit
              cards, and digital wallets. All payments must be made in the
              currency specified on our website.
            </p>

            <div className="example-box">
              <h4>Accepted Payment Methods:</h4>
              <ul>
                <li><strong>Credit Cards:</strong> Visa, Mastercard, American Express, Discover</li>
                <li><strong>Debit Cards:</strong> All major debit card networks</li>
                <li><strong>Digital Wallets:</strong> PayPal, Apple Pay, Google Pay, Samsung Pay</li>
                <li><strong>Buy Now, Pay Later:</strong> Klarna, Afterpay, Affirm</li>
                <li><strong>Gift Cards:</strong> HY Nutrition gift cards and e-gift cards</li>
              </ul>
            </div>

            <h3>5.3 Payment Processing</h3>
            <p>
              Payment processing is handled by secure third-party payment
              processors. We do not store your complete payment information on
              our servers.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Shipping and Delivery</h2>
            
            <h3>6.1 Shipping Methods</h3>
            <p>
              We offer various shipping options with different delivery times
              and costs. Shipping costs and estimated delivery dates are
              provided during checkout.
            </p>

            <div className="example-box">
              <h4>Shipping Options & Costs:</h4>
              <ul>
                <li><strong>Standard Shipping:</strong> ₹5.99 - 5-7 business days</li>
                <li><strong>Express Shipping:</strong> ₹12.99 - 2-3 business days</li>
                <li><strong>Overnight Shipping:</strong> ₹24.99 - Next business day</li>
                <li><strong>Free Shipping:</strong> Orders over ₹50 (standard shipping)</li>
                <li><strong>International:</strong> ₹19.99 - 7-14 business days</li>
              </ul>
            </div>

            <h3>6.2 Delivery</h3>
            <p>
              Delivery is made to the address provided during checkout. Risk of
              loss and title for items pass to you upon delivery to the carrier.
            </p>

            <h3>6.3 International Shipping</h3>
            <p>
              International orders may be subject to customs duties, taxes, and
              other charges. These are the responsibility of the recipient.
            </p>

            <div className="example-box">
              <h4>International Shipping Details:</h4>
              <ul>
                <li><strong>Canada:</strong> ₹14.99 - 5-7 business days</li>
                <li><strong>Mexico:</strong> ₹19.99 - 7-10 business days</li>
                <li><strong>UK:</strong> ₹24.99 - 7-12 business days</li>
                <li><strong>Australia:</strong> ₹29.99 - 10-15 business days</li>
                <li><strong>Restrictions:</strong> Some products may not be available internationally</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>7. Returns and Refunds</h2>
            
            <h3>7.1 Return Policy</h3>
            <p>
              We accept returns within 30 days of delivery for most products.
              Returned items must be:
            </p>
            <ul>
              <li>In original, unopened condition</li>
              <li>In original packaging</li>
              <li>Accompanied by proof of purchase</li>
            </ul>

            <div className="example-box">
              <h4>Return Process:</h4>
              <ul>
                <li><strong>Initiate Return:</strong> Contact customer support or use online return portal</li>
                <li><strong>Return Label:</strong> Free return shipping label provided</li>
                <li><strong>Packaging:</strong> Use original packaging or similar protective materials</li>
                <li><strong>Timeline:</strong> Return must be shipped within 7 days of approval</li>
                <li><strong>Refund:</strong> Processed within 5-10 business days after receipt</li>
              </ul>
            </div>

            <h3>7.2 Refund Process</h3>
            <p>
              Refunds are processed within 5-10 business days after we receive
              and inspect returned items. Shipping costs are non-refundable.
            </p>

            <h3>7.3 Exclusions</h3>
            <p>
              Certain products may not be eligible for return due to health and
              safety regulations or manufacturer restrictions.
            </p>

            <div className="example-box">
              <h4>Non-Returnable Items:</h4>
              <ul>
                <li><strong>Health & Safety:</strong> Opened supplements, personal care items</li>
                <li><strong>Custom Items:</strong> Personalized products, engraved items</li>
                <li><strong>Digital Products:</strong> E-books, online courses, software</li>
                <li><strong>Sale Items:</strong> Clearance products, final sale items</li>
                <li><strong>Gift Cards:</strong> Non-refundable, non-returnable</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>8. Prohibited Uses</h2>
            <p>
              You agree not to use our service for any unlawful purpose or to
              solicit others to perform unlawful acts. Prohibited uses include:
            </p>
            <ul>
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights</li>
              <li>Harassing, abusing, or harming others</li>
              <li>Transmitting viruses or malicious code</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Interfering with the proper functioning of our service</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>9. Intellectual Property</h2>
            <p>
              The content on our website, including text, graphics, logos,
              images, and software, is the property of HY Nutrition or its content
              suppliers and is protected by copyright and other intellectual
              property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative
              works without our express written consent.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, HY Nutrition shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits,
              data, or use.
            </p>
            <p>
              Our total liability for any claim arising from these terms or your
              use of our service shall not exceed the amount you paid for the
              specific product or service giving rise to the claim.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless HY Nutrition, its officers,
              directors, employees, and agents from any claims, damages, or
              expenses arising from your use of our service or violation of
              these terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of New York, without regard to its conflict
              of law provisions.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting. Your continued use of
              our service constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <StoreContactInfo />
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

export default TermsOfService;
