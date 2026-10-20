import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you strictly sure you want to delete this?")) {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) setProducts(products.filter((product) => product._id !== id));
    }
  };

  return (
    <main className="admin-table-page">
      <header className="admin-table-heading">
        <div><p className="admin-eyebrow">Catalog</p><h1>Manage products</h1><p>Review and update the items in your store.</p></div>
        <Link to="/admin/add-product" className="btn">+ Add Product</Link>
      </header>
      <div className="admin-table-wrap">
        <table className="admin-data-table">
          <thead><tr><th>ID</th><th>NAME</th><th>PRICE</th><th>CATEGORY</th><th>STOCK</th><th>ACTIONS</th></tr></thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="admin-id">{product._id.substring(0, 8)}...</td>
                <td className="admin-name-cell">{product.name}</td>
                <td>₹{product.price.toFixed(2)}</td><td>{product.category}</td><td>{product.stock}</td>
                <td className="admin-actions-cell">
                  <Link to={`/admin/edit-product/${product._id}`} className="admin-edit-link">Edit</Link>
                  <button onClick={() => handleDelete(product._id)} className="admin-delete-button">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan="6" className="admin-empty">No products to display.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminProducts;
