import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProductsLegacy } from '../services/productService';
import './ProductGrid.css';

const ProductGrid = ({ searchTerm = '', onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter(product => {
        const name = (product.name || '').toLowerCase();
        const search = searchTerm.toLowerCase().trim();
        return name.includes(search);
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductsLegacy();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      const sampleProducts = [
        { id: '1', name: 'Mô Hình Mobile Suit Gundam 45th Anniversary', price: 680000 },
        { id: '2', name: 'Mô Hình Hololive - Karasu - La+ Darkness', price: 550000 },
        { id: '3', name: 'Mô Hình Demon Slayer - Kimetsu no Yaiba', price: 600000 },
        { id: '4', name: 'Mô Hình Frieren: Beyond Journey\'s End', price: 690000 },
        { id: '5', name: 'Mô Hình Dragon Ball Z - Grandista Goku II', price: 500000 },
        { id: '6', name: 'Mô hình Date A Live - PenLife! - Kurumi', price: 340000 },
        { id: '7', name: 'Mô hình One Piece - Monkey D. Luffy', price: 450000 },
        { id: '8', name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM', price: 380000 },
        { id: '9', name: 'ACTION BASE 7 [CLEAR COLOR]', price: 120000 },
      ];
      setProducts(sampleProducts);
    } finally {
      setLoading(false);
    }
  };

  const displayProducts = searchTerm.trim() ? filteredProducts : products;
  const newProducts = displayProducts.slice(0, 9);
  const gundamProducts = displayProducts.filter(p => 
    p.name?.toLowerCase().includes('gundam') || 
    p.category?.toLowerCase() === 'gundam'
  ).slice(0, 6);

  return (
    <div className="product-sections">
      <section className="product-section">
        <div className="section-header">
          <h2 className="section-title">Sản phẩm mới</h2>
        </div>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Đang tải sản phẩm...</p>
          </div>
        ) : newProducts.length === 0 ? (
          <div className="empty-state">
            <p>Không tìm thấy sản phẩm nào với từ khóa "{searchTerm}"</p>
          </div>
        ) : (
          <div className="product-grid">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
            ))}
          </div>
        )}
      </section>

      <section className="product-section">
        <div className="section-header">
          <h2 className="section-title">Gundam</h2>
        </div>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : gundamProducts.length === 0 ? (
          <div className="product-grid">
            {newProducts.slice(0, 6).map(product => (
              <ProductCard key={`gundam-${product.id}`} product={product} onProductClick={onProductClick} />
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {gundamProducts.map(product => (
              <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductGrid;
