import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const res = await fetch(apiUrl("/api/products"), {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
        body: data,
      });
      const responseData = await res.json();

      if (res.ok) {
        alert("Product created successfully with Cloudinary Image URL!");
        navigate("/shop");
      } else {
        alert(responseData.message || "Error creating product");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-form-page">
      <header className="admin-form-heading"><p className="admin-eyebrow">Catalog</p><h1>Add new product</h1><p>Add an item and its details to your ShopNest catalog.</p></header>
      <form onSubmit={handleSubmit} className="admin-product-form">
        <input
          type="text"
          placeholder="Product Name"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="admin-input"
        />
        <textarea
          placeholder="Description"
          required
          rows="4"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="admin-input"
        />
        <input
          type="number"
          placeholder="Price"
          required
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="admin-input"
        />
        <input
          type="text"
          placeholder="Category"
          required
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="admin-input"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          required
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="admin-input"
        />

        <div className="admin-file-field">
          <label>
            Upload Product Image (Cloudinary)
          </label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            className="admin-file-input"
          />
        </div>

        <button type="submit" disabled={loading} className="btn admin-submit">
          {loading ? "Uploading & Creating..." : "Publish Product"}
        </button>
      </form>
    </main>
  );
};

export default AddProduct;
