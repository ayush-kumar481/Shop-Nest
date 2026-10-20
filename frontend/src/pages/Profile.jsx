import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok) setOrders(Array.isArray(data) ? data : []);
        else {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <main className="profile-page">
      <header className="profile-header">
        <div className="profile-identity">
          <div className="profile-avatar" aria-hidden="true">{user.name?.charAt(0)?.toUpperCase()}</div>
          <div>
            <p className="admin-eyebrow">Your account</p>
            <h1>My profile</h1>
            <p className="profile-name">{user.name}</p>
            <p className="profile-email">{user.email}</p>
            <span className="profile-role">{user.role} account</span>
          </div>
        </div>
        <button onClick={handleLogout} className="profile-logout">Logout</button>
      </header>

      <section className="profile-orders">
        <div className="profile-section-heading">
          <div><p className="admin-eyebrow">Your purchases</p><h2>Order history</h2></div>
        </div>
        {loading ? (
          <p className="profile-message">Fetching your orders…</p>
        ) : orders.length === 0 ? (
          <div className="profile-empty">
            <p>You haven't placed any orders yet.</p>
            <Link to="/shop" className="btn">Start shopping</Link>
          </div>
        ) : (
          <div className="profile-order-list">
            {orders.map((order) => (
              <article key={order._id} className="profile-order-card">
                <div className="profile-order-details">
                  <p><span>Order ID</span><strong>{order._id}</strong></p>
                  <p><span>Placed on</span><strong>{new Date(order.createdAt).toLocaleDateString()}</strong></p>
                  <p><span>Total</span><strong className="profile-order-total">₹{order.totalAmount.toFixed(2)}</strong></p>
                </div>
                <span className={`profile-status status-${order.status?.toLowerCase()}`}>{order.status}</span>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
