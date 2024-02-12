import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const CheckoutPage = () => {
  const [auth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  // Total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" text-center my-3">
        <h2>Checkout Product</h2>
        <div className="my-5">
          <h4> Total Items : {cart?.length}</h4>
          <h4> Total Price : ₹{totalPrice() + 50}.00</h4>
        </div>
        {auth?.user?.address ? (
          <div className="mb-3">
            <h4>Current Address</h4>
            <h5> {auth?.user?.address} </h5>
            <button
              className="primaryButton my-3"
              onClick={() => {
                navigate("/dashboard/user/profile");
              }}
            >
              {" "}
              Update Address{" "}
            </button>

            <div>
              <Link to="/payment">
                <button className="btn btn-danger">Proceed to Payment</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mb-3">
            {auth?.token ? (
              <>
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => navigate("/dashboard/user / profile")}
                >
                  Update Address
                </button>
              </>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => navigate("/login", { state: "/cart" })}
              >
                {" "}
                Please login to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutPage;
