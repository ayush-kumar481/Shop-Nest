import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "", stock: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setFormData({ name: data.name, description: data.description, price: data.price, category: data.category, stock: data.stock });
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${user.token}` },
      body: data,
    });
    setLoading(false);
    if (res.ok) {
      alert("Product updated successfully!");
      navigate("/admin/products");
    }
  };

  return (
    <main className="admin-form-page">
      <header className="admin-form-heading"><p className="admin-eyebrow">Catalog</p><h1>Edit product</h1><p>Update the details for this catalog item.</p></header>
      <form onSubmit={handleSubmit} className="admin-product-form">
        <input className="admin-input" type="text" placeholder="Product Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <textarea className="admin-input" placeholder="Description" required rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        <input className="admin-input" type="number" placeholder="Price" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        <input className="admin-input" type="text" placeholder="Category" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
        <input className="admin-input" type="number" placeholder="Stock" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
        <div className="admin-file-field"><label>Replace image (optional)</label><input className="admin-file-input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} /></div>
        <button type="submit" disabled={loading} className="btn admin-submit">{loading ? "Updating…" : "Update product"}</button>
      </form>
    </main>
  );
};

export default EditProduct;
