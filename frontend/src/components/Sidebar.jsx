import React from 'react';
import {
  GundamCategory,
  HotwheelCategory,
  FigureCategory,
  BandaiCategory
} from './categories';
import './Sidebar.css';

const Sidebar = ({ onCategoryClick }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>DANH MỤC SẢN PHẨM</h2>
      </div>
      <ul className="category-list">
        <GundamCategory onCategoryClick={onCategoryClick} />
        <HotwheelCategory onCategoryClick={onCategoryClick} />
        <FigureCategory onCategoryClick={onCategoryClick} />
        <BandaiCategory onCategoryClick={onCategoryClick} />
      </ul>
      <button className="view-more-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Xem thêm</span>
      </button>
    </aside>
  );
};

export default Sidebar;

