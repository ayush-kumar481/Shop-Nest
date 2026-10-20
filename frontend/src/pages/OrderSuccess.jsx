import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => (
  <main className="order-success-page">
    <div className="order-success-mark" aria-hidden="true">✓</div>
    <p className="order-success-eyebrow">Order confirmed</p>
    <h1>Payment successful!</h1>
    <p className="order-success-copy">Thank you for your order. We have securely received your payment and will process your shipment shortly.</p>
    <Link to="/shop" className="btn">Continue shopping</Link>
  </main>
);

export default OrderSuccess;
