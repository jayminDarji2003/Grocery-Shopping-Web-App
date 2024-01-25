import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

// import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "FreshMart- A Grocery Shopping Web App",
  description:
    "FreshMart- A grocery shopping web app created using MERN Stack. This is the final year project of BCA. This project is created by JAYMIN DARJI and KISHAN PANCHAL",
  keywords: "FreshMart ,Grocery shopping , Ecommerce App , mern",
  author: "Jaymin Darji and Kishan Panchal",
};

export default Layout;
