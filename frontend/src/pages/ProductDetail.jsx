import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ productId: product._id, name: product.name, price: product.price, imageUrl: product.imageUrl, qty: 1 }));
    alert("Successfully added to your cart!");
  };

  if (loading) return <p className="page-state">Loading product…</p>;
  if (!product) return <p className="page-state page-state-error">Product not found.</p>;

  return (
    <main className="product-detail-wrapper">
      <nav className="product-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{product.category}</span><span>/</span><strong>{product.name}</strong>
      </nav>
      <section className="product-detail">
        <div className="detail-image-container"><img src={Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl} alt={product.name} className="detail-image" /></div>
        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">₹{product.price.toFixed(2)}</p>
          <div className="detail-description"><h2>Product description</h2><p>{product.description}</p></div>
          <button onClick={handleAddToCart} className="btn detail-add-button">Add to shopping cart</button>
          <p className={`detail-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.stock > 0 ? `In stock · ${product.stock} units available` : "Temporarily out of stock"}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
