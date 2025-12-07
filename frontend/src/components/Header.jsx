import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { useFavorite } from '../contexts/FavoriteContext';
import { getProductsLegacy } from '../services/productService';
import './Header.css';

const Header = ({ onNavigateToCart, onNavigateToFavorites, onNavigateHome, searchTerm, onSearchChange, onSearch, onNavigateToProducts }) => {
  const { getCartItemsCount } = useCart();
  const { getFavoritesCount } = useFavorite();
  const cartItemsCount = getCartItemsCount();
  const favoritesCount = getFavoritesCount();
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (searchTerm && searchTerm.trim().length > 0 && allProducts.length > 0) {
      const search = searchTerm.toLowerCase().trim();
      const filtered = allProducts.filter(product => {
        const name = (product.name || product.model || product.title || '').toLowerCase();
        const brand = (product.brand || product.manufacturer || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        return name.includes(search) || brand.includes(search) || description.includes(search);
      });
      setSearchResults(filtered.slice(0, 10)); // Limit to 10 results
      setShowSearchResults(filtered.length > 0);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm, allProducts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    if (showSearchResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showSearchResults]);

  const getSampleProducts = () => {
    return [
      { id: '1', name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM(GQ)', price: 850000, image: '/GAIA.png' },
      { id: '2', name: 'RG 1/144 WING GUNDAM ZERO', price: 1100000, image: '/wing.png' },
      { id: '3', name: 'MG 1/100 RX-178 Gundam Mk-II', price: 950000, image: '/mkII.png' },
      { id: '4', name: 'HGUC 1/144 ZAKU II KAI', price: 280000, image: '/zaku.png' },
      { id: '5', name: 'RG 1/144 SAZABI', price: 1200000, image: '/sazabi.png' },
      { id: '7', name: 'RG 40 RX-78-2 Ver 2.0 1/144 MS Gundam', price: 950000, image: '/78-2.png' },
      { id: '11', name: 'MG 1/100 FREEDOM GUNDAM 2.0', price: 1500000, image: '/freedom.png' },
      { id: '12', name: 'SD GUNDAM EX-STANDARD Astray Red Frame', price: 160000, image: '/astray sd.png' },
      { id: 'hw1', name: 'Hot Wheels Koenigsegg Agera', price: 279000, image: '/koenigsegg.png' },
      { id: 'demo-1', name: 'Mô Hình Mobile Suit Gundam 45th Anniversary', price: 680000 },
      { id: 'demo-2', name: 'Mô Hình Hololive - Karasu - La+ Darkness', price: 550000 },
      { id: 'demo-3', name: 'Mô Hình Demon Slayer - Kimetsu no Yaiba', price: 600000 },
      { id: 'demo-4', name: 'Mô Hình Frieren: Beyond Journey\'s End', price: 690000 },
      { id: 'demo-5', name: 'Mô Hình Dragon Ball Z - Grandista Goku II', price: 500000 },
      { id: 'demo-6', name: 'Mô hình Date A Live - PenLife! - Kurumi', price: 340000 },
      { id: 'demo-7', name: 'Mô hình One Piece - Monkey D. Luffy', price: 450000 },
      { id: 'demo-8', name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM', price: 380000 },
      { id: 'demo-9', name: 'ACTION BASE 7 [CLEAR COLOR]', price: 120000 },
    ];
  };

  const fetchAllProducts = async () => {
    try {
      const data = await getProductsLegacy();
      const apiData = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];
      
      const sampleProducts = getSampleProducts();
      
      // Combine API data with sample products
      if (apiData.length === 0) {
        setAllProducts(sampleProducts);
      } else {
        setAllProducts([...apiData, ...sampleProducts]);
      }
    } catch (error) {
      console.error('Error fetching products for search:', error);
      // Use sample products if API fails
      setAllProducts(getSampleProducts());
    }
  };

  const handleProductClick = (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowSearchResults(false);
    // Navigate to products page with search term
    // The searchTerm is already set in parent component, just trigger navigation
    if (onNavigateToProducts) {
      onNavigateToProducts();
    } else if (onSearch) {
      onSearch();
    }
  };

  const handleSearchChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch();
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch && searchTerm.trim()) {
      onSearch();
    }
  };

  const handleFavoritesClick = (e) => {
    e.preventDefault();
    if (onNavigateToFavorites) {
      onNavigateToFavorites();
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (onNavigateToCart) {
      onNavigateToCart();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-text">GEKU TOYS</span>
            <span className="logo-subtitle">FIGURE & HOBBY</span>
          </div>
        </div>
        
        <nav className="nav">
          <a
            href="/"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) {
                onNavigateHome();
              }
            }}
          >
            Trang chủ
          </a>
          <a href="#about" className="nav-link">Giới thiệu</a>
          <div className="nav-dropdown">
            <a href="#products" className="nav-link">
              Sản phẩm
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4.5l3 3 3-3"/>
              </svg>
            </a>
          </div>
          <a href="#news" className="nav-link">Tin tức</a>
          <a href="#contact" className="nav-link">Liên hệ</a>
        </nav>

        <div className="header-actions">
          <div className="search-container" ref={searchBoxRef}>
            <form className="search-box" onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Nhập tên sản phẩm cần tìm" 
                className="search-input"
                value={searchTerm || ''}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => {
                  if (searchTerm && searchTerm.trim().length > 0 && allProducts.length > 0) {
                    // Re-trigger search when focusing to show dropdown
                    const search = searchTerm.toLowerCase().trim();
                    const filtered = allProducts.filter(product => {
                      const name = (product.name || product.model || product.title || '').toLowerCase();
                      const brand = (product.brand || product.manufacturer || '').toLowerCase();
                      const description = (product.description || '').toLowerCase();
                      return name.includes(search) || brand.includes(search) || description.includes(search);
                    });
                    setSearchResults(filtered.slice(0, 10));
                    setShowSearchResults(filtered.length > 0);
                  }
                }}
                autoComplete="off"
              />
              <button type="submit" className="search-icon-btn" title="Tìm kiếm">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>
            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                <div className="search-results-header">
                  <span className="search-results-title">Sản phẩm ({searchResults.length})</span>
                </div>
                <div className="search-results-list">
                  {searchResults.map(product => {
                    const imageSrc = product.image || product.imageUrl || product.img || '';
                    const productName = product.name || product.model || product.title || 'Sản phẩm';
                    const productId = product._id || product.id;
                    return (
                      <div 
                        key={productId} 
                        className="search-result-item"
                        onClick={(e) => handleProductClick(product, e)}
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevent input blur
                        }}
                      >
                        <div className="search-result-image">
                          {imageSrc ? (
                            <img src={imageSrc} alt={productName} onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }} />
                          ) : null}
                          <div className="search-result-placeholder" style={{ display: imageSrc ? 'none' : 'flex' }}>
                            <span>🎮</span>
                          </div>
                        </div>
                        <div className="search-result-info">
                          <div className="search-result-name">{productName}</div>
                          {product.price && (
                            <div className="search-result-price">
                              {typeof product.price === 'number' ? product.price.toLocaleString('vi-VN') : product.price}₫
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          <button className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          <button className="icon-btn" onClick={handleFavoritesClick} title="Yêu thích">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {favoritesCount > 0 && (
              <span className="notification-badge">{favoritesCount}</span>
            )}
          </button>
          
          <button className="icon-btn" onClick={handleCartClick} title="Giỏ hàng">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartItemsCount > 0 && (
              <span className="notification-badge">{cartItemsCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
