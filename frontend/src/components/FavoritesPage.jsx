import React from 'react';
import { useFavorite } from '../contexts/FavoriteContext';
import ProductCard from './ProductCard';
import './FavoritesPage.css';

const FavoritesPage = ({ onBackToHome, onProductClick }) => {
  const { favorites } = useFavorite();

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          {onBackToHome && (
            <button className="back-to-home-btn" onClick={onBackToHome}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Về trang chủ</span>
            </button>
          )}
          <div className="favorites-title-section">
            <div className="favorites-title-wrapper">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2"
                className="favorites-icon"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <h1 className="favorites-title">SẢN PHẨM YÊU THÍCH</h1>
            </div>
            <p className="favorites-subtitle">
              Bạn có {favorites.length} sản phẩm trong danh sách yêu thích
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="empty-favorites-icon"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2 className="empty-favorites-title">Danh sách yêu thích trống</h2>
            <p className="empty-favorites-text">
              Bạn chưa có sản phẩm nào trong danh sách yêu thích. 
              Hãy khám phá và thêm các sản phẩm bạn yêu thích!
            </p>
            <button className="continue-shopping-btn" onClick={onBackToHome}>
              Tiếp tục mua hàng
            </button>
          </div>
        ) : (
          <div className="favorites-content">
            <div className="favorites-grid">
              {favorites.map((product) => (
                <ProductCard key={product.id || product._id} product={product} onProductClick={onProductClick} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

