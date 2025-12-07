import React from 'react';
import './FigureLogo.css';

const FigureLogo = ({ size = 'medium' }) => {
  return (
    <img 
      src="/Screenshot 2025-11-25 140504.png"
      alt="Figure Logo" 
      className={`figure-logo figure-logo-${size}`}
      loading="lazy"
    />
  );
};

export default FigureLogo;

