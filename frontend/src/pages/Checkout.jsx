import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import { apiUrl } from "../config/api";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postCode: "",
    country: "",
  });
  const [paymentError, setPaymentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handlePayment = async () => {
    setPaymentError("");
    setIsSubmitting(true);
    try {
      const orderRes = await fetch(apiUrl("/api/payment/order"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const orderData = await orderRes.json().catch(() => ({}));

      if (!orderRes.ok) {
        if (orderRes.status === 503) {
          const fallback = window.confirm(
            "Razorpay is not configured on this demo. Use Student Bypass Mode to place a test order?",
          );
          if (fallback) await bypassPayment();
        } else {
          throw new Error(orderData.message || "Payment failed to initialize.");
        }
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ShopNest",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch(apiUrl("/api/payment/verify"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch(apiUrl("/api/orders"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id,
              }),
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate("/ordersuccess");
            } else {
              const errorData = await saveOrderRes.json().catch(() => ({}));
              setPaymentError(errorData.message || "Order saving failed.");
            }
          } else {
            const errorData = await verifyRes.json().catch(() => ({}));
            setPaymentError(errorData.message || "Payment verification failed.");
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
        },
        theme: {
          color: "#28634b",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      setPaymentError(error.message || "Unable to complete checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await fetch(apiUrl("/api/orders"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: "bypass_txn_" + Date.now(),
      }),
    });
    const orderData = await saveOrderRes.json().catch(() => ({}));
    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate("/ordersuccess");
    } else {
      throw new Error(orderData.message || `Test order could not be saved (${saveOrderRes.status}).`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    handlePayment();
  };

  return (
    <main className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Postal Code"
            required
              value={address.postCode}
            onChange={(e) =>
              setAddress({ ...address, postCode: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            {paymentError && <p role="alert" className="checkout-error">{paymentError}</p>}
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Processing…" : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
