import React, { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductsPage from './components/ProductsPage';
import ManageProductsPage from './components/ManageProductsPage';
import CartPage from './components/CartPage';
import FavoritesPage from './components/FavoritesPage';
import ProductDetailPage from './components/ProductDetailPage';
import SocialSidebar from './components/SocialSidebar';
import './App.css';

const categoryNames = {
  'gundam': 'Gundam',
  'hotwheel': 'Hot Wheels',
  'figure': 'Figure',
  'bandai': 'Bandai'
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      const path = window.location.pathname;
      if (path === '/cart') {
        setCurrentPage('cart');
        setSelectedCategory(null);
        setSelectedProductId(null);
      } else if (path === '/favorites') {
        setCurrentPage('favorites');
        setSelectedCategory(null);
        setSelectedProductId(null);
      } else if (path === '/manage-products') {
        setCurrentPage('manageProducts');
        setSelectedProductId(null);
      } else if (path.startsWith('/product/')) {
        const productId = path.replace('/product/', '');
        setSelectedProductId(productId);
        setCurrentPage('productDetail');
      } else if (path.startsWith('/category/')) {
        const category = path.replace('/category/', '').toLowerCase();
        if (categoryNames[category]) {
          setSelectedCategory(category);
          setCurrentPage('products');
          setSelectedProductId(null);
        }
      } else {
        setCurrentPage('home');
        setSelectedCategory(null);
        setSelectedProductId(null);
      }
    };

    const path = window.location.pathname;
    if (path === '/cart') {
      setCurrentPage('cart');
      setSelectedCategory(null);
      setSelectedProductId(null);
    } else if (path === '/favorites') {
      setCurrentPage('favorites');
      setSelectedCategory(null);
      setSelectedProductId(null);
    } else if (path === '/manage-products') {
      setCurrentPage('manageProducts');
      setSelectedProductId(null);
    } else if (path.startsWith('/product/')) {
      const productId = path.replace('/product/', '');
      setSelectedProductId(productId);
      setCurrentPage('productDetail');
    } else if (path.startsWith('/category/')) {
      const category = path.replace('/category/', '').toLowerCase();
      if (categoryNames[category]) {
        setSelectedCategory(category);
        setCurrentPage('products');
        setSelectedProductId(null);
      }
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (currentPage === 'cart') {
      document.title = 'Giỏ hàng - GEKU TOYS';
      window.history.pushState({ page: 'cart' }, '', '/cart');
    } else if (currentPage === 'favorites') {
      document.title = 'Sản phẩm yêu thích - GEKU TOYS';
      window.history.pushState({ page: 'favorites' }, '', '/favorites');
    } else if (currentPage === 'manageProducts') {
      document.title = 'Quản lý sản phẩm - GEKU TOYS';
      window.history.pushState({ page: 'manageProducts' }, '', '/manage-products');
    } else if (currentPage === 'productDetail' && selectedProductId) {
      document.title = 'Chi tiết sản phẩm - GEKU TOYS';
      window.history.pushState({ productId: selectedProductId }, '', `/product/${selectedProductId}`);
    } else if (currentPage === 'products' && selectedCategory) {
      const categoryName = categoryNames[selectedCategory] || selectedCategory;
      document.title = `${categoryName} - GEKU TOYS`;
      const newUrl = `/category/${selectedCategory}`;
      window.history.pushState({ category: selectedCategory }, '', newUrl);
    } else {
      document.title = 'GEKU TOYS - Figure & Hobby';
      window.history.pushState({}, '', '/');
    }
  }, [currentPage, selectedCategory, selectedProductId]);

  const handleProductClick = (product) => {
    const productId = product._id || product.id;
    if (productId) {
      setSelectedProductId(productId);
      setCurrentPage('productDetail');
    }
  };

  const handleCategoryClick = (category) => {
    if (category === 'Bandai' || category === 'bandai' || 
        category === 'Gundam' || category === 'gundam' ||
        category === 'Hotwheel' || category === 'hotwheel' ||
        category === 'Figure' || category === 'figure') {
      setSelectedCategory(category.toLowerCase());
      setCurrentPage('products');
    } else {
      setCurrentPage('home');
      setSelectedCategory(null);
    }
  };

  return (
    <CartProvider>
      <FavoriteProvider>
        <div className="App">
          <Header 
            onNavigateHome={() => {
              setCurrentPage('home');
              setSelectedCategory(null);
              setSearchTerm('');
            }}
            onNavigateToCart={() => setCurrentPage('cart')}
            onNavigateToFavorites={() => setCurrentPage('favorites')}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={() => {
              if (searchTerm.trim()) {
                setCurrentPage('products');
                setSelectedCategory(null);
              }
            }}
            onNavigateToProducts={() => {
              if (searchTerm.trim()) {
                setCurrentPage('products');
                setSelectedCategory(null);
              }
            }}
          />
        {currentPage === 'cart' ? (
          <CartPage 
            onBackToHome={() => {
              setCurrentPage('home');
              setSelectedCategory(null);
            }}
          />
        ) : currentPage === 'favorites' ? (
          <FavoritesPage 
            onBackToHome={() => {
              setCurrentPage('home');
              setSelectedCategory(null);
            }}
            onProductClick={handleProductClick}
          />
        ) : currentPage === 'productDetail' ? (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => {
              setSelectedProductId(null);
              if (selectedCategory) {
                setCurrentPage('products');
              } else {
                setCurrentPage('home');
              }
            }}
          />
        ) : currentPage === 'home' ? (
          <div className="main-container">
            <Sidebar onCategoryClick={handleCategoryClick} />
            <div className="main-content">
              <Hero
                onOpenCreateProduct={() => {
                  setCurrentPage('manageProducts');
                }}
              />
              <ProductGrid searchTerm={searchTerm} onProductClick={handleProductClick} />
            </div>
          </div>
        ) : currentPage === 'manageProducts' ? (
          <ManageProductsPage
            onBack={() => {
              if (selectedCategory) {
                setCurrentPage('products');
              } else {
                setCurrentPage('home');
              }
            }}
          />
        ) : (
          <ProductsPage 
            category={selectedCategory} 
            searchTerm={searchTerm}
            onProductClick={handleProductClick}
            onBackToHome={() => {
              setCurrentPage('home');
              setSelectedCategory(null);
              setSearchTerm('');
            }}
            onOpenCreateProduct={() => {
              setCurrentPage('manageProducts');
            }}
          />
        )}
        <SocialSidebar />
        </div>
      </FavoriteProvider>
    </CartProvider>
  );
}

export default App;
