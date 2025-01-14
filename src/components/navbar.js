import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"

function Navbar() {
  let location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid nav2">
          <Link className="navbar-brand" to="/">
            Online-Shopping
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/products' ? "active" : ""}`} to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/contacts' ? "active" : ""}`} to="/contacts">
                  Contacts
                </Link>
              </li>
              <li>
                  <Link to="/yourcart">
                    <div className="d-flex">
                    <FiShoppingCart className="cart-trolley active" />
                    <span className="cart-total">10</span>
                    </div>
                  </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <div  className="mx-2 d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success " type="submit">
                Search
              </button>
              </div>
              <Link type="button" className="btn btn-success mx-1" to="/login">Login</Link>
              <Link type="button" className="btn btn-success  mx-1" to="/signup">Signup</Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
