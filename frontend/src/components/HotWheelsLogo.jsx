import React from 'react';
import './HotWheelsLogo.css';

const HotWheelsLogo = ({ size = 'medium' }) => {
  return (
    <img 
      src="/Screenshot 2025-11-25 135940.png"
      alt="Hot Wheels Logo" 
      className={`hotwheels-logo hotwheels-logo-${size}`}
      loading="lazy"
    />
  );
};

export default HotWheelsLogo;

