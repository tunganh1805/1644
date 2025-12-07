import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useFavorite } from '../contexts/FavoriteContext';
import { getProductById, getProductsLegacy } from '../services/productService';
import './ProductDetailPage.css';

const ProductDetailPage = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();

  const getSampleProducts = () => {
    return [
      { id: '1', name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM(GQ)', price: 850000, image: '/GAIA.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: '2', name: 'RG 1/144 WING GUNDAM ZERO', price: 1100000, image: '/wing.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: '3', name: 'MG 1/100 RX-178 Gundam Mk-II', price: 950000, image: '/mkII.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: '4', name: 'HGUC 1/144 ZAKU II KAI', price: 280000, image: '/zaku.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: '5', name: 'RG 1/144 SAZABI', price: 1200000, image: '/sazabi.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: '7', name: 'RG 40 RX-78-2 Ver 2.0 1/144 MS Gundam', price: 950000, image: '/78-2.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: '11', name: 'MG 1/100 FREEDOM GUNDAM 2.0', price: 1500000, image: '/freedom.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: '12', name: 'SD GUNDAM EX-STANDARD Astray Red Frame', price: 160000, image: '/astray sd.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: 'hw1', name: 'Hot Wheels Koenigsegg Agera', price: 279000, image: '/koenigsegg.png', brand: 'Hot Wheels', manufacturer: 'Mattel' },
      { id: 'demo-1', name: 'Mô Hình Mobile Suit Gundam 45th Anniversary', price: 680000, brand: 'Bandai', manufacturer: 'Bandai' },
      { id: 'demo-2', name: 'Mô Hình Hololive - Karasu - La+ Darkness', price: 550000, brand: 'Hololive', manufacturer: 'Various' },
      { id: 'demo-3', name: 'Mô Hình Demon Slayer - Kimetsu no Yaiba', price: 600000, brand: 'Anime Figure', manufacturer: 'Various' },
      { id: 'demo-4', name: 'Mô Hình Frieren: Beyond Journey\'s End', price: 690000, brand: 'Anime Figure', manufacturer: 'Various' },
      { id: 'demo-5', name: 'Mô Hình Dragon Ball Z - Grandista Goku II', price: 500000, brand: 'Anime Figure', manufacturer: 'Various' },
      { id: 'demo-6', name: 'Mô hình Date A Live - PenLife! - Kurumi', price: 340000, brand: 'Anime Figure', manufacturer: 'Various' },
      { id: 'demo-7', name: 'Mô hình One Piece - Monkey D. Luffy', price: 450000, brand: 'Anime Figure', manufacturer: 'Various' },
      { id: 'demo-8', name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM', price: 380000, image: '/GAIA.png', brand: 'Bandai', manufacturer: 'Bandai' },
      { id: 'demo-9', name: 'ACTION BASE 7 [CLEAR COLOR]', price: 120000, brand: 'Bandai', manufacturer: 'Bandai' },
    ];
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get product by ID first
      if (productId && (productId.startsWith('demo-') || productId.startsWith('g-') || productId.startsWith('h-') || productId.startsWith('f-') || productId.startsWith('b-') || /^\d+$/.test(productId))) {
        // Sample product ID - get from sample data
        const allProducts = await getProductsLegacy();
        const apiData = Array.isArray(allProducts) ? allProducts : Array.isArray(allProducts?.data) ? allProducts.data : [];
        
        // Also check sample products
        const sampleProducts = getSampleProducts();
        const allProductsList = [...apiData, ...sampleProducts];
        
        const foundProduct = allProductsList.find(p => 
          (p._id === productId) || 
          (p.id === productId) ||
          (p._id?.toString() === productId) ||
          (p.id?.toString() === productId)
        );
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Sản phẩm không tồn tại');
        }
      } else if (productId) {
        // MongoDB ObjectId - fetch from API
        try {
          const response = await getProductById(productId);
          const productData = response?.data || response;
          setProduct(productData);
        } catch (apiError) {
          // Fallback to sample products
          const allProducts = await getProductsLegacy();
          const apiData = Array.isArray(allProducts) ? allProducts : Array.isArray(allProducts?.data) ? allProducts.data : [];
          const sampleProducts = getSampleProducts();
          const allProductsList = [...apiData, ...sampleProducts];
          
          const foundProduct = allProductsList.find(p => 
            (p._id === productId) || 
            (p.id === productId) ||
            (p._id?.toString() === productId) ||
            (p.id?.toString() === productId)
          );
          
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError('Sản phẩm không tồn tại');
          }
        }
      } else {
        setError('Không tìm thấy sản phẩm');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Không thể tải thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product);
    }
  };

  const getImageSrc = () => {
    if (product?.image) return product.image;
    if (product?.imageUrl) return product.imageUrl;
    if (product?.img) return product.img;
    return null;
  };

  const favoriteStatus = product ? isFavorite(product) : false;

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-loading">
          <div className="spinner"></div>
          <p>Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-error">
          <button className="back-button" onClick={onBack}>← Quay lại</button>
          <p>{error || 'Sản phẩm không tồn tại'}</p>
        </div>
      </div>
    );
  }

  const imageSrc = getImageSrc();
  const hasImage = imageSrc && imageSrc !== '';

  return (
    <div className="product-detail-page">
      <button className="back-button" onClick={onBack}>← Quay lại</button>
      
      <div className="product-detail-container">
        <div className="product-detail-image-section">
          <div className="product-detail-image-wrapper">
            {hasImage ? (
              <img 
                src={imageSrc} 
                alt={product.name || 'Sản phẩm'} 
                className="product-detail-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const placeholder = e.target.nextElementSibling;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="product-detail-placeholder" style={{ display: hasImage ? 'none' : 'flex' }}>
              <span className="product-emoji">🎮</span>
            </div>
            <button 
              className={`product-detail-favorite-btn ${favoriteStatus ? 'active' : ''}`}
              onClick={handleToggleFavorite}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={favoriteStatus ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="product-detail-info-section">
          <h1 className="product-detail-name">{product.name || product.model || product.title || 'Mô hình đồ chơi'}</h1>
          
          <div className="product-detail-price">
            {product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}
          </div>

          <div className="product-detail-brand-section">
            {product.brand && (
              <div className="product-detail-brand">
                <span className="product-detail-label">Hãng:</span>
                <span className="product-detail-value">{product.brand}</span>
              </div>
            )}
            {product.manufacturer && product.manufacturer !== product.brand && (
              <div className="product-detail-manufacturer">
                <span className="product-detail-label">Nhà sản xuất:</span>
                <span className="product-detail-value">{product.manufacturer}</span>
              </div>
            )}
          </div>

          {product.description && (
            <div className="product-detail-description">
              <h3>Mô tả sản phẩm</h3>
              <p>{product.description}</p>
            </div>
          )}

          {product.stock !== undefined && (
            <div className="product-detail-stock">
              <span className="product-detail-label">Tồn kho:</span>
              <span className={`product-detail-value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? `${product.stock} sản phẩm` : 'Hết hàng'}
              </span>
            </div>
          )}

          <div className="product-detail-actions">
            <button className="product-detail-add-cart-btn" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>

          {product.badges && product.badges.length > 0 && (
            <div className="product-detail-badges">
              {product.badges.map((badge, index) => (
                <div key={index} className={`product-detail-badge badge-${badge.type || 'default'}`}>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

