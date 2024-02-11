import React from "react";
import Layout from "../components/Layout/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1 className="text-center mb-5">Terms of Service</h1>
            <h3>1. Agreement to Terms</h3>
            <p>
              Welcome to FreshMart. These Terms of Service outline the rules and
              regulations for the use of our website. By accessing this website,
              we assume you accept these terms and conditions. Do not continue
              to use FreshMart if you do not agree to all the terms and
              conditions stated on this page.
            </p>
            <h3>2. Intellectual Property Rights</h3>
            <p>
              Other than the content you own, under these Terms, FreshMart
              and/or its licensors own all the intellectual property rights and
              materials contained in this website.
            </p>
            <h3>3. Restrictions</h3>
            <p>
              You are specifically restricted from all of the following:
              publishing any website material in any other media; selling,
              sublicensing and/or otherwise commercializing any website
              material; using this website in any way that is or may be damaging
              to this website.
            </p>
            <h3>4. Limitation of Liability</h3>
            <p>
              In no event shall FreshMart, nor any of its officers, directors,
              and employees, be held liable for anything arising out of or in
              any way connected with your use of this website.
            </p>
            <h3>5. Governing Law & Jurisdiction</h3>
            <p>
              These Terms will be governed by and interpreted in accordance with
              the laws of the country where FreshMart is located, and you submit
              to the non-exclusive jurisdiction of the courts in that country
              for the resolution of any disputes.
            </p>
            <h3>6. Contact Us</h3>
            <p>
              If you have any questions or concerns about our Terms of Service,
              please contact us at{" "}
              <a href="mailto:contact@freshmart.com">contact@freshmart.com</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
