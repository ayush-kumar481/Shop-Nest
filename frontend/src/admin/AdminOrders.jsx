import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiUrl } from "../config/api";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(apiUrl("/api/orders"), { headers: { Authorization: `Bearer ${user.token}` } });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    };
    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(apiUrl(`/api/orders/${id}/status`), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setOrders((current) => current.map((order) => order._id === id ? { ...order, status } : order));
  };

  return (
    <main className="admin-table-page">
      <header className="admin-table-heading"><div><p className="admin-eyebrow">Fulfillment</p><h1>Manage orders</h1><p>Review orders and keep their status up to date.</p></div></header>
      <div className="admin-table-wrap">
        <table className="admin-data-table">
          <thead><tr><th>ORDER ID</th><th>USER</th><th>TOTAL</th><th>DATE</th><th>STATUS</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="admin-id">{order._id.substring(0, 8)}...</td>
                <td className="admin-name-cell">{order.userId?.name || "Deleted User"}</td>
                <td>₹{order.totalAmount.toFixed(2)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td><select className="admin-status-select" value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}><option value="Pending">Pending</option><option value="Shipped">Shipped</option><option value="Delivered">Delivered</option></select></td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan="5" className="admin-empty">No orders to display.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminOrders;
