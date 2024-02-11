import React from "react";
import Layout from "../components/Layout/Layout";

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1 className="text-center mb-5">Privacy Policy</h1>
            <p>
              At FreshMart, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy outlines how we collect, use, and safeguard the information
              you provide to us when using our website or services.
            </p>
            <h3>Information We Collect</h3>
            <p>
              When you visit our website or use our services, we may collect
              personal information such as your name, email address, phone
              number, shipping address, and payment details. We may also collect
              non-personal information such as your IP address, browser type,
              and device information for analytical purposes.
            </p>
            <h3>How We Use Your Information</h3>
            <p>
              We use the information we collect to process your orders, provide
              customer support, personalize your shopping experience, and
              improve our services. We may also use your information to send you
              promotional offers, newsletters, and updates about our products
              and services, but you can opt-out of receiving these
              communications at any time.
            </p>
            <h3>Data Security</h3>
            <p>
              We take the security of your personal information seriously and
              implement measures to protect it from unauthorized access,
              disclosure, alteration, or destruction. We use industry-standard
              encryption technologies and secure servers to safeguard your data.
            </p>
            <h3>Third-Party Disclosure</h3>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              required by law or to facilitate services provided by our trusted
              partners (e.g., shipping companies, payment processors).
            </p>
            <h3>Cookies</h3>
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience, analyze website traffic, and track user interactions.
              You can manage your cookie preferences through your browser
              settings, but please note that disabling cookies may affect
              certain functionalities of our website.
            </p>
            <h3>Changes to This Policy</h3>
            <p>
              We reserve the right to update or revise this Privacy Policy at
              any time. Any changes will be effective immediately upon posting
              on our website. We encourage you to review this Policy
              periodically for updates.
            </p>
            <h3>Contact Us</h3>
            <p>
              If you have any questions or concerns about our Privacy Policy or
              the handling of your personal information, please contact us at{" "}
              <a href="mailto:contact@freshmart.com">contact@freshmart.com</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
