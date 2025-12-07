import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useFavorite } from '../contexts/FavoriteContext';
import './ProductCard.css';

const ProductCard = ({ product, onProductClick }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();
  const favoriteStatus = isFavorite(product);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };
  
  const getImageSrc = () => {
    if (product.image) return product.image;
    if (product.imageUrl) return product.imageUrl;
    if (product.img) return product.img;
    return null;
  };

  const imageSrc = getImageSrc();
  const hasImage = imageSrc && imageSrc !== '';

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: onProductClick ? 'pointer' : 'default' }}>
      <div className="product-image-container">
        {hasImage ? (
          <img 
            src={imageSrc} 
            alt={product.name || product.model || 'Sản phẩm'} 
            className="product-image-img"
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = e.target.nextElementSibling;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="product-placeholder" style={{ display: hasImage ? 'none' : 'flex' }}>
          <span className="product-emoji">🎮</span>
        </div>
        <button 
          className={`favorite-btn ${favoriteStatus ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={favoriteStatus ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <div className="product-logo">
          <span className="product-logo-text">GEKU TOYS</span>
          <span className="product-logo-subtitle">FIGURE & HOBBY</span>
        </div>
        <div className="product-badges">
          {product.badges && product.badges.map((badge, index) => (
            <div key={index} className={`badge-circle badge-${badge.type || 'default'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="badge-text">{badge.text}</span>
            </div>
          ))}
          {!product.badges && (
            <>
              <div className="badge-circle badge-return">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="badge-text">ĐỔI TRẢ LỖI NSX</span>
              </div>
              <div className="badge-circle badge-shipping">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="badge-text">SHIP HỎA TỐC</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name || product.model || product.title || 'Mô hình đồ chơi'}</h3>
        <p className="product-price">
          {product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}
        </p>
        <button className="product-btn" onClick={handleAddToCart}>Thêm vào giỏ</button>
      </div>
    </div>
  );
};

export default ProductCard;
