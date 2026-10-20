import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(apiUrl("/api/analytics"), {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) navigate("/login");
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user, navigate]);

  const metrics = stats ? [
    { label: "Total orders", value: stats.totalOrders, detail: "Orders placed" },
    { label: "Products", value: stats.totalProducts, detail: "Items in your catalog" },
    { label: "Customers", value: stats.totalUsers, detail: "Registered accounts" },
    { label: "Total revenue", value: `₹${stats.totalRevenue.toFixed(2)}`, detail: "Across all orders" },
  ] : [];

  return (
    <main className="admin-dashboard">
      <header className="admin-heading">
        <div className="admin-title-group">
          <img src="/ShopNestLogo.png" alt="" />
          <div><p className="admin-eyebrow">ShopNest management</p><h1>Dashboard</h1></div>
        </div>
        <p className="admin-welcome">Welcome back, <strong>{user?.name}</strong></p>
      </header>

      {stats ? (
        <section className="admin-metrics" aria-label="Store metrics">
          {metrics.map((metric) => (
            <article className="admin-metric-card" key={metric.label}>
              <p>{metric.label}</p><strong>{metric.value}</strong><span>{metric.detail}</span>
            </article>
          ))}
        </section>
      ) : <p className="admin-loading">Loading store metrics…</p>}

      <section className="admin-controls">
        <div className="admin-controls-heading"><div><p className="admin-eyebrow">Quick access</p><h2>Administrative controls</h2></div></div>
        <div className="admin-action-grid">
          <button className="admin-action primary" onClick={() => navigate("/admin/add-product")}><span>+</span><span><strong>Add product</strong><small>Create a new catalog item</small></span><b aria-hidden="true">→</b></button>
          <button className="admin-action" onClick={() => navigate("/admin/products")}><span className="admin-action-icon">P</span><span><strong>Manage products</strong><small>Update your catalog</small></span><b aria-hidden="true">→</b></button>
          <button className="admin-action" onClick={() => navigate("/admin/orders")}><span className="admin-action-icon">O</span><span><strong>Manage orders</strong><small>Review customer orders</small></span><b aria-hidden="true">→</b></button>
          <button className="admin-action" onClick={() => navigate("/admin/users")}><span className="admin-action-icon">U</span><span><strong>Users directory</strong><small>View registered users</small></span><b aria-hidden="true">→</b></button>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
