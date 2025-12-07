import React from 'react';
import './GundamLogo.css';

const GundamLogo = ({ size = 'medium' }) => {
  return (
    <img 
      src="/Screenshot 2025-11-25 140621.png"
      alt="Gundam Logo" 
      className={`gundam-logo gundam-logo-${size}`}
      loading="lazy"
    />
  );
};

export default GundamLogo;

