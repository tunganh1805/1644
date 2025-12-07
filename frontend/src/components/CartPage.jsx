import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';

const CartPage = ({ onBackToHome }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart();
  const [orderNotes, setOrderNotes] = useState('');

  const handleQuantityChange = (cartItemId, newQuantity) => {
    const quantity = parseInt(newQuantity) || 1;
    updateQuantity(cartItemId, quantity);
  };

  const handleDecrement = (cartItemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(cartItemId, currentQuantity - 1);
    } else {
      removeFromCart(cartItemId);
    }
  };

  const handleIncrement = (cartItemId, currentQuantity) => {
    updateQuantity(cartItemId, currentQuantity + 1);
  };

  const getImageSrc = (product) => {
    if (product.image) return product.image;
    if (product.imageUrl) return product.imageUrl;
    if (product.img) return product.img;
    return null;
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toLocaleString('vi-VN');
    }
    return '0';
  };

  const total = getCartTotal();

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-section-header">
              <div className="cart-title-wrapper">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="cart-icon"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h1 className="cart-title">GIỎ HÀNG CỦA BẠN</h1>
              </div>
              <p className="cart-summary">
                Bạn đang có {getCartItemsCount()} sản phẩm trong giỏ hàng
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="empty-cart-icon"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p className="empty-cart-text">Giỏ hàng của bạn đang trống</p>
                <button className="continue-shopping-btn" onClick={onBackToHome}>
                  Tiếp tục mua hàng
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cartItems.map((item) => {
                    const imageSrc = getImageSrc(item);
                    const cartItemId = item.cartItemId || item._id || item.id;
                    const productId = item._id || item.id || item.productId;
                    const productName = item.name || item.model || item.title || 'Sản phẩm';
                    const productPrice = typeof item.price === 'number' ? item.price : 0;
                    const subtotal = productPrice * item.quantity;

                    return (
                      <div key={cartItemId} className="cart-item">
                        <div className="cart-item-image-container">
                          {imageSrc ? (
                            <img 
                              src={imageSrc} 
                              alt={productName}
                              className="cart-item-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                const placeholder = e.target.nextElementSibling;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className="cart-item-placeholder" 
                            style={{ display: imageSrc ? 'none' : 'flex' }}
                          >
                            <span className="cart-item-emoji">🎮</span>
                          </div>
                          <div className="cart-item-badges">
                            <div className="badge-circle badge-return">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              <span className="badge-text">ĐỔI TRẢ LỖI</span>
                            </div>
                            <div className="badge-circle badge-shipping">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              <span className="badge-text">SHIP HỎA TỐC</span>
                            </div>
                          </div>
                        </div>

                        <div className="cart-item-details">
                          <h3 className="cart-item-name">{productName}</h3>
                          <p className="cart-item-price">Giá: {formatPrice(productPrice)}₫</p>
                          
                          <div className="cart-item-quantity">
                            <label>Số lượng:</label>
                            <div className="quantity-controls">
                              <button
                                className="quantity-btn"
                                onClick={() => handleDecrement(cartItemId, item.quantity)}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(cartItemId, e.target.value)}
                                className="quantity-input"
                              />
                              <button
                                className="quantity-btn"
                                onClick={() => handleIncrement(cartItemId, item.quantity)}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <p className="cart-item-subtotal">
                            Thành tiền: <span className="subtotal-amount">{formatPrice(subtotal)}₫</span>
                          </p>
                        </div>

                        <button
                          className="remove-item-btn"
                          onClick={() => removeFromCart(cartItemId)}
                          title="Xóa sản phẩm"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="order-notes-section">
                  <h3 className="order-notes-title">Ghi chú đơn hàng</h3>
                  <textarea
                    className="order-notes-input"
                    placeholder="Nhập thông tin ghi chú của bạn..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows="4"
                  />
                </div>
              </>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="order-summary-section">
              <h2 className="order-summary-title">THÔNG TIN ĐƠN HÀNG</h2>
              <div className="order-summary-content">
                <div className="total-amount">
                  <span className="total-label">Tổng tiền:</span>
                  <span className="total-value">{formatPrice(total)}₫</span>
                </div>
                <p className="shipping-info">
                  Phí vận chuyển sẽ được tính ở trang thanh toán.
                </p>
                <p className="discount-info">
                  Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                </p>
                <div className="order-actions">
                  <button className="continue-shopping-btn" onClick={onBackToHome}>
                    Tiếp tục mua hàng
                  </button>
                  <button className="checkout-btn">
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

