import React from "react";
import { NavLink, Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../context/auth.jsx";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput.jsx";
import useCategory from "../hooks/useCategory.jsx";
import { useCart } from "../../context/cart.jsx";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            FreshMart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <SearchInput />
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              {/* Drop Down Category */}
              <li className="nav-item dropdown">
                <Link
                  to={"/category"}
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="nav-item dropdown">
                    <Link
                      to={`/categories`}
                      className="dropdown-item text-capitalize "
                      href="/"
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        to={`/category/${c.slug}`}
                        className="dropdown-item text-capitalize "
                        href="/"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/register"} className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarScrollingDropdown"
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          DashBoard
                        </NavLink>
                      </li>
                      <li className="dropdown-item">
                        <NavLink
                          onClick={handleLogout}
                          to={"/login"}
                          className="nav-link"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to={"/cart"} className="nav-link">
                  <Badge count={cart?.length} showZero className="">
                    <span
                      className="text-xxl mx-2 "
                      style={{ fontSize: "20px" }}
                    >
                      <FaShoppingCart />
                    </span>
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
