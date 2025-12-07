import React, { useState, useEffect } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, category }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    manufacturer: filters?.manufacturer || [],
    productType: filters?.productType || [],
    gunpla: filters?.gunpla || []
  });

  const handleCheckboxChange = (filterCategory, value) => {
    const newFilters = { ...selectedFilters };
    if (newFilters[filterCategory].includes(value)) {
      newFilters[filterCategory] = newFilters[filterCategory].filter(item => item !== value);
    } else {
      newFilters[filterCategory] = [...newFilters[filterCategory], value];
    }
    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const showGunplaFilter = category === 'gundam' || category === 'bandai';
  const showManufacturerFilter = category !== 'figure';

  return (
    <aside className="filter-sidebar">
      {showManufacturerFilter && (
        <div className="filter-section">
          <h3 className="filter-title">Hãng sản xuất</h3>
          <div className="filter-options">
            {category === 'bandai' || category === 'gundam' ? (
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.manufacturer.includes('BANDAI')}
                  onChange={() => handleCheckboxChange('manufacturer', 'BANDAI')}
                />
                <span>BANDAI</span>
              </label>
            ) : category === 'hotwheel' ? (
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.manufacturer.includes('HOTWHEEL')}
                  onChange={() => handleCheckboxChange('manufacturer', 'HOTWHEEL')}
                />
                <span>HOTWHEEL</span>
              </label>
            ) : null}
          </div>
        </div>
      )}

      <div className="filter-section">
        <h3 className="filter-title">Loại Sản Phẩm</h3>
        <div className="filter-options">
          {category === 'bandai' || category === 'gundam' ? (
            <label className="filter-checkbox">
              <input 
                type="checkbox" 
                checked={selectedFilters.productType.includes('Model kit')}
                onChange={() => handleCheckboxChange('productType', 'Model kit')}
              />
              <span>Model kit</span>
            </label>
          ) : category === 'hotwheel' ? (
            <label className="filter-checkbox">
              <input 
                type="checkbox" 
                checked={selectedFilters.productType.includes('Die-cast')}
                onChange={() => handleCheckboxChange('productType', 'Die-cast')}
              />
              <span>Die-cast</span>
            </label>
          ) : category === 'figure' ? (
            <label className="filter-checkbox">
              <input 
                type="checkbox" 
                checked={selectedFilters.productType.includes('Figure')}
                onChange={() => handleCheckboxChange('productType', 'Figure')}
              />
              <span>Figure</span>
            </label>
          ) : null}
        </div>
      </div>

      {showGunplaFilter && (
        <div className="filter-section">
          <h3 className="filter-title">Gunpla</h3>
          <div className="filter-options">
            {['HG', 'RG', 'MG', 'SD'].map(grade => (
              <label key={grade} className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.gunpla.includes(grade)}
                  onChange={() => handleCheckboxChange('gunpla', grade)}
                />
                <span>{grade}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar;

