import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark rounded-3 p-2 m-2 text-white text-center">
            CONTACT US
          </h1>
          <p className="text-justify mt-3">
            For any inquiries or product information, please don't hesitate to
            contact us. Our dedicated customer support team is available 24/7 to
            assist you. Feel free to reach out to us at any time, and we'll be
            happy to help.
          </p>

          <p className="mt-3">
            <BiMailSend /> : support@freshmart.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 9104874359
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
