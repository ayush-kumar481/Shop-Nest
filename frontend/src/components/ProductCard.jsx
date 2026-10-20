import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        <Link to={`/product/${product._id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
