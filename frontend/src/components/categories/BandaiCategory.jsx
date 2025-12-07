import React from 'react';
import BandaiLogo from '../BandaiLogo';

const BandaiCategory = ({ onCategoryClick }) => {
  const handleClick = () => {
    if (onCategoryClick) {
      onCategoryClick('Bandai');
    }
  };

  return (
    <li 
      className="category-item"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <span className="category-icon">
        <BandaiLogo size="small" />
      </span>
      <span className="category-name">Bandai</span>
      <svg className="category-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </li>
  );
};

export default BandaiCategory;

