import React from "react";
import Layout from "../components/Layout/Layout";
import privacyPolicyImg from "/privacy.jpg";
import refundPolicyImg from "/refund.png";
import termsOfServiceImg from "/tos3.jpg";

const Policy = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <img
                src={privacyPolicyImg}
                className="card-img-top"
                alt="Privacy Policy"
              />
              <div className="card-body">
                <h2 className="card-title text-center">Privacy Policy</h2>
                <p className="card-text">
                  At FreshMart, we are committed to protecting your privacy and
                  ensuring the security of your personal information. This
                  Privacy Policy outlines how we collect, use, and safeguard the
                  information...
                </p>
                <a
                  href="/privacy-policy"
                  className="btn btn-primary d-block mx-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img
                src={refundPolicyImg}
                className="card-img-top"
                alt="Refund Policy"
              />
              <div className="card-body">
                <h2 className="card-title text-center">Refund Policy</h2>
                <p className="card-text">
                  At FreshMart, we strive to provide you with the best shopping
                  experience. If you are not satisfied with your purchase, we
                  offer a straightforward refund policy to ensure your peace of
                  mind.
                </p>
                <a
                  href="/refund-policy"
                  className="btn btn-primary d-block mx-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img
                src={termsOfServiceImg}
                className="card-img-top mb-4"
                alt="Terms of Service"
              />
              <div className="card-body">
                <h2 className="card-title text-center">Terms of Service</h2>
                <p className="card-text">
                  Welcome to FreshMart. These Terms of Service outline the rules
                  and regulations for the use of our website. By accessing this
                  website, we assume you accept these terms and conditions..
                </p>
                <a
                  href="/terms-of-service"
                  className="btn btn-primary d-block mx-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
