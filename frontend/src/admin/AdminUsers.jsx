import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/auth/users", { headers: { Authorization: `Bearer ${user.token}` } });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    };
    fetchUsers();
  }, [user]);

  return (
    <main className="admin-table-page">
      <header className="admin-table-heading"><div><p className="admin-eyebrow">Accounts</p><h1>Users directory</h1><p>Browse the accounts registered with ShopNest.</p></div></header>
      <div className="admin-table-wrap">
        <table className="admin-data-table">
          <thead><tr><th>ID</th><th>NAME</th><th>EMAIL</th><th>ROLE</th><th>JOINED</th></tr></thead>
          <tbody>
            {users.map((account) => (
              <tr key={account._id}>
                <td className="admin-id">{account._id.substring(0, 8)}...</td>
                <td className="admin-name-cell">{account.name}</td>
                <td>{account.email}</td>
                <td><span className={`admin-role ${account.role === "admin" ? "is-admin" : ""}`}>{account.role.toUpperCase()}</span></td>
                <td>{new Date(account.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan="5" className="admin-empty">No users to display.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminUsers;
