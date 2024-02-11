import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/about.jpeg"
              alt="About FreshMart"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="about-content">
              <h2 className="text-center mb-4">About FreshMart</h2>
              <p className="text-justify ">
                FreshMart is your premier destination for sourcing the freshest
                and healthiest groceries. We take pride in offering a wide
                selection of farm-fresh vegetables, succulent fruits,
                high-quality dairy products, and essential home groceries. Our
                commitment to freshness and quality is unwavering, as we
                meticulously source each product to meet the highest standards.
                With our user-friendly website and mobile app, shopping has
                never been more convenient. Experience our dedication to
                exceptional service, ensuring a hassle-free journey from start
                to finish. Join us today in embracing freshness and convenience
                with FreshMart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
