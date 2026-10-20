import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-inner">
      <div className="site-footer-brand">
        <h3>ShopNest</h3>
        <p>Thoughtful finds for everyday living.</p>
      </div>
      <nav className="site-footer-links" aria-label="Footer">
        <Link to="/about">About Us</Link>
        <Link to="/return">Return Policy</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </nav>
      <p className="site-footer-copy">&copy; {new Date().getFullYear()} ShopNest. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
