import React from 'react';
import './Hero.css';

const Hero = ({ onOpenCreateProduct }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <img 
          src="/logoweb.jpg" 
          alt="GEKU TOYS - SHOP MÔ HÌNH" 
          className="hero-logo-image"
        />
        <button
          className="hero-add-product-btn"
          onClick={() => {
            if (onOpenCreateProduct) onOpenCreateProduct();
          }}
        >
          + Thêm sản phẩm
        </button>
      </div>
    </section>
  );
};

export default Hero;
