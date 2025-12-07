import React, { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';
import { getProductsLegacy } from '../services/productService';
import './ProductsPage.css';

const ProductsPage = ({ category = 'bandai', onBackToHome, onOpenCreateProduct, searchTerm = '', onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [filters, setFilters] = useState({
    manufacturer: [],
    productType: [],
    gunpla: []
  });

  const categoryDisplayNames = {
    'gundam': 'Gundam',
    'hotwheel': 'Hot Wheels',
    'figure': 'Figure',
    'bandai': 'Bandai'
  };

  useEffect(() => {
    fetchProducts();
  }, [category, searchTerm]);

  useEffect(() => {
    if (category) {
      const categoryName = categoryDisplayNames[category] || category;
      document.title = `${categoryName} - GEKU TOYS`;
    }
  }, [category]);

  useEffect(() => {
    applyFilters();
  }, [products, filters, sortBy, category, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductsLegacy();
      const apiData = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      // Get all sample products (not just for current category) for search functionality
      const allSampleProducts = [
        ...getSampleProducts('gundam'),
        ...getSampleProducts('hotwheel'),
        ...getSampleProducts('figure'),
        ...getSampleProducts('bandai')
      ];
      
      // Remove duplicates based on id
      const uniqueSampleProducts = allSampleProducts.filter((product, index, self) =>
        index === self.findIndex(p => (p.id || p._id) === (product.id || product._id))
      );

      if (apiData.length === 0) {
        setProducts(uniqueSampleProducts);
      } else {
        // Combine and remove duplicates
        const combined = [...apiData, ...uniqueSampleProducts];
        const unique = combined.filter((product, index, self) =>
          index === self.findIndex(p => (p._id || p.id) === (product._id || product.id))
        );
        setProducts(unique);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Get all sample products for search
      const allSampleProducts = [
        ...getSampleProducts('gundam'),
        ...getSampleProducts('hotwheel'),
        ...getSampleProducts('figure'),
        ...getSampleProducts('bandai')
      ];
      const uniqueSampleProducts = allSampleProducts.filter((product, index, self) =>
        index === self.findIndex(p => (p.id || p._id) === (product.id || product._id))
      );
      setProducts(uniqueSampleProducts);
    } finally {
      setLoading(false);
    }
  };

  const getSampleProducts = (categoryName) => {
    const category = categoryName?.toLowerCase();
    
    if (category === 'gundam') {
      return [
      {
        id: '1',
        name: 'HG 1/144 GAIA’S/ORTEGA’S RICK DOM(GQ)',
        price: 850000,
        image: '/GAIA.png',
        badges: [
          { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
          { text: 'SHIP HỎA TỐC', type: 'shipping' }
        ]
      },
      {
        id: '2',
        name: 'RG 1/144 WING GUNDAM ZERO',
        price: 1100000,
        image: '/wing.png',
        badges: [
          { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
          { text: 'SHIP HỎA TỐC', type: 'shipping' }
        ]
      },
      {
        id: '3',
        name: 'MG 1/100 RX-178 Gundam Mk-II',
        price: 950000,
        image: '/mkII.png',
        badges: [
          { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
          { text: 'SHIP HỎA TỐC', type: 'shipping' }
        ]
      },
      {
        id: '4',
        name: 'HGUC 1/144 ZAKU II KAI',
        price: 280000,
        image: '/zaku.png',
        badges: [
          { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
          { text: 'SHIP HỎA TỐC', type: 'shipping' }
        ]
      },
      {
        id: '5',
        name: 'RG 1/144 SAZABI',
        price: 1200000,
        image: '/sazabi.png',
        badges: [
          { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
          { text: 'SHIP HỎA TỐC', type: 'shipping' }
        ]
      },
      {
        id: '7',
        name: 'RG 40 RX-78-2 Ver 2.0 1/144 MS Gundam',
        price: 950000,
        image: '/78-2.png',
        badges: [
          { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
          { text: 'SHIP HỎA TỐC', type: 'shipping' }
        ]
      },
      {
        id: '11',
        name: 'MG 1/100 FREEDOM GUNDAM 2.0',
        price: 1500000,
        image: '/freedom.png',
        badges: [
          { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
          { text: 'SHIP HỎA TỐC', type: 'shipping' }
        ]
      },
      {
        id: '12',
        name: 'SD GUNDAM EX-STANDARD Astray Red Frame',
        price: 160000,
        image: '/astray sd.png',
        badges: [
          { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
          { text: 'SHIP HỎA TỐC', type: 'shipping' }
        ]
      }
      ];
    }
    
    if (category === 'hotwheel') {
      return [
        {
          id: 'hw1',
          name: 'Hot Wheels Koenigsegg Agera',
          price: 279000,
          image: '/koenigsegg.png',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'hw2',
          name: 'Hot Wheels Premium Car 2',
          price: 280000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'hw3',
          name: 'Hot Wheels Premium Car 3',
          price: 300000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'hw4',
          name: 'Hot Wheels Premium Car 4',
          price: 320000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        }
      ];
    }
    
    if (category === 'figure') {
      return [
        {
          id: 'fig1',
          name: 'Anime Figure 1',
          price: 1200000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'fig2',
          name: 'Anime Figure 2',
          price: 1500000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'fig3',
          name: 'Anime Figure 3',
          price: 1800000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'fig4',
          name: 'Anime Figure 4',
          price: 2000000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        }
      ];
    }
    
    if (category === 'bandai') {
      return [
        {
          id: 'bd1',
          name: 'Bandai Model Kit 1',
          price: 500000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'bd2',
          name: 'Bandai Model Kit 2',
          price: 600000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'bd3',
          name: 'Bandai Model Kit 3',
          price: 700000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        },
        {
          id: 'bd4',
          name: 'Bandai Model Kit 4',
          price: 800000,
          image: '',
          badges: [
            { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
            { text: 'SHIP HỎA TỐC', type: 'shipping' }
          ]
        }
      ];
    }
    
    return [];
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filtered.length === 0) {
      setFilteredProducts([]);
      return;
    }

    // Apply search filter first
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const name = (p.name || p.model || p.title || '').toLowerCase();
        const brand = (p.brand || p.manufacturer || '').toLowerCase();
        const description = (p.description || '').toLowerCase();
        return name.includes(search) || brand.includes(search) || description.includes(search);
      });
    }

    const isSampleData = filtered.length > 0 && filtered.some(p => 
      !p.image || 
      p.image === '' ||
      p.image?.includes('placeholder') || 
      p.image?.includes('via.placeholder')
    );
    
    const hasActiveFilters = filters.manufacturer.length > 0 || filters.productType.length > 0;
    
    if (category && !isSampleData && hasActiveFilters) {
      const categoryUpper = category.toUpperCase();
      filtered = filtered.filter(p => {
        const name = (p.name || p.model || p.title || '').toUpperCase();
        const brand = (p.brand || p.manufacturer || '').toUpperCase();
        const cat = (p.category || '').toUpperCase();
        
        if (categoryUpper === 'BANDAI') {
          return name.includes('BANDAI') || brand.includes('BANDAI') || 
                 name.includes('GUNDAM') || name.includes('GUNPLA') ||
                 name.includes('HG') || name.includes('RG') || name.includes('MG') || name.includes('SD');
        } else if (categoryUpper === 'GUNDAM') {
          return name.includes('GUNDAM') || name.includes('GUNPLA') || 
                 brand.includes('BANDAI') ||
                 name.includes('HG') || name.includes('RG') || name.includes('MG') || name.includes('SD') ||
                 name.includes('ZAKU') || name.includes('SAZABI');
        } else if (categoryUpper === 'HOTWHEEL') {
          return name.includes('HOTWHEEL') || name.includes('HOT WHEEL') ||
                 brand.includes('HOTWHEEL');
        } else if (categoryUpper === 'FIGURE') {
          return name.includes('FIGURE') || cat.includes('FIGURE') ||
                 (!name.includes('GUNDAM') && !name.includes('BANDAI') && !name.includes('HOTWHEEL'));
        }
        return true;
      });
    }

    if (filters.manufacturer.length > 0) {
      if (isSampleData) {
      } else {
        filtered = filtered.filter(p => 
          filters.manufacturer.some(m => 
            p.manufacturer?.toUpperCase().includes(m) ||
            p.brand?.toUpperCase().includes(m) ||
            (p.name || '').toUpperCase().includes(m)
          )
        );
      }
    }

    if (filters.productType.length > 0) {
      if (isSampleData) {
      } else {
        filtered = filtered.filter(p =>
          filters.productType.some(type =>
            p.category?.toLowerCase().includes(type.toLowerCase()) ||
            (p.name || '').toLowerCase().includes(type.toLowerCase())
          )
        );
      }
    }

    if (filters.gunpla.length > 0) {
      filtered = filtered.filter(p => {
        const name = (p.name || p.model || p.title || '').toUpperCase();
        const category = (p.category || '').toUpperCase();
        const fullText = `${name} ${category}`.trim();
        
        return filters.gunpla.some(grade => {
          const gradeUpper = grade.toUpperCase();
          
          const patterns = [
            new RegExp(`\\b${gradeUpper}\\b`, 'i'),
            new RegExp(`${gradeUpper}\\s+`, 'i'),
            new RegExp(`${gradeUpper}UC`, 'i'),
            new RegExp(`${gradeUpper}CE`, 'i'),
            new RegExp(`^${gradeUpper}\\s`, 'i'),
          ];
          
          return patterns.some(pattern => pattern.test(fullText));
        });
      });
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };





  return (
    <div className="products-page">
      <div className="products-container">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} category={category} />
        
        <div className="products-content">
          <div className="products-header">
            <div className="display-options">
              <span className="display-label">Hiển thị</span>
              <div className="display-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot dot-active"></span>
              </div>
            </div>
            <div className="sort-options">
              <span className="sort-label">Sắp xếp theo</span>
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Mặc định</option>
                <option value="price-low">Giá: Thấp đến cao</option>
                <option value="price-high">Giá: Cao đến thấp</option>
                <option value="name">Tên: A-Z</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Đang tải sản phẩm...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>Không tìm thấy sản phẩm nào</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id || product._id} product={product} onProductClick={onProductClick} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

