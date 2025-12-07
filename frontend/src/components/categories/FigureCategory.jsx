import React from 'react';
import FigureLogo from '../FigureLogo';

const FigureCategory = ({ onCategoryClick }) => {
  const handleClick = () => {
    if (onCategoryClick) {
      onCategoryClick('Figure');
    }
  };

  return (
    <li 
      className="category-item"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <span className="category-icon">
        <FigureLogo size="small" />
      </span>
      <span className="category-name">Figure</span>
      <svg className="category-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </li>
  );
};

export default FigureCategory;

