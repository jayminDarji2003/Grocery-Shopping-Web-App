import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-center ">
      <div className="container py-1">
        <span className=" text-muted">&copy; 2024 FreshMart </span>
        <br />
        <Link to={"/about"}> About </Link> |
        <Link to={"/contact"}> Contact </Link> |
        <Link to={"/policy"}> Policy </Link>
      </div>
    </footer>
  );
};

export default Footer;
