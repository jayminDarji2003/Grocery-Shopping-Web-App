import React from "react";
import Layout from "../components/Layout/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1 className="text-center mb-5">Refund Policy</h1>
            <p>
              At FreshMart, we strive to provide you with the best shopping
              experience. If you are not satisfied with your purchase, we offer
              a straightforward refund policy to ensure your peace of mind.
            </p>
            <h3>Eligibility for Refunds</h3>
            <p>
              To be eligible for a refund, your item must be unused and in the
              same condition that you received it. It must also be in the
              original packaging.
            </p>
            <h3>Refund Process</h3>
            <p>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
            </p>
            <p>
              If your refund is approved, it will be processed, and a credit
              will automatically be applied to your original method of payment
              within a certain number of days, depending on your bank or payment
              processor.
            </p>
            <h3>Shipping Costs</h3>
            <p>
              Shipping costs are non-refundable. If you receive a refund, the
              cost of return shipping will be deducted from your refund.
            </p>
            <h3>Contact Us</h3>
            <p>
              If you have any questions or concerns about our Refund Policy,
              please contact us at{" "}
              <a href="mailto:contact@freshmart.com">contact@freshmart.com</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
