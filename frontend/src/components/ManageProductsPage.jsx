import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import './ManageProductsPage.css';

const ManageProductsPage = ({ onBack }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: '',
    description: '',
    manufacturer: '',
    brand: '',
    category: '',
    productType: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const sampleProducts = [
      { id: 'demo-1', name: 'Mô Hình Mobile Suit Gundam 45th Anniversary', price: 680000 },
      { id: 'demo-2', name: 'Mô Hình Hololive - Karasu - La+ Darkness', price: 550000 },
      { id: 'demo-3', name: 'Mô Hình Demon Slayer - Kimetsu no Yaiba', price: 600000 },
      { id: 'demo-4', name: 'Mô Hình Frieren: Beyond Journey\'s End', price: 690000 },
      { id: 'demo-5', name: 'Mô Hình Dragon Ball Z - Grandista Goku II', price: 500000 },
      { id: 'demo-6', name: 'Mô hình Date A Live - PenLife! - Kurumi', price: 340000 },
      { id: 'demo-7', name: 'Mô hình One Piece - Monkey D. Luffy', price: 450000 },
      { id: 'demo-8', name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM', price: 380000 },
      { id: 'demo-9', name: 'ACTION BASE 7 [CLEAR COLOR]', price: 120000 },

      { id: 'g-1', name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM(GQ)', price: 850000, image: '/GAIA.png' },
      { id: 'g-2', name: 'RG 1/144 WING GUNDAM ZERO', price: 1100000, image: '/wing.png' },
      { id: 'g-3', name: 'MG 1/100 RX-178 Gundam Mk-II', price: 950000, image: '/mkII.png' },
      { id: 'g-4', name: 'HGUC 1/144 ZAKU II KAI', price: 280000, image: '/zaku.png' },
      { id: 'g-5', name: 'RG 1/144 SAZABI', price: 1200000, image: '/sazabi.png' },
      { id: 'g-6', name: 'RG 40 RX-78-2 Ver 2.0 1/144 MS Gundam', price: 950000, image: '/78-2.png' },
      { id: 'g-7', name: 'MG 1/100 FREEDOM GUNDAM 2.0', price: 1500000, image: '/freedom.png' },
      { id: 'g-8', name: 'SD GUNDAM EX-STANDARD Astray Red Frame', price: 160000, image: '/astray sd.png' },

      { id: 'h-1', name: 'Hot Wheels Koenigsegg Agera', price: 279000, image: '/koenigsegg.png' },
      { id: 'h-2', name: 'Hot Wheels Premium Car 2', price: 280000 },
      { id: 'h-3', name: 'Hot Wheels Premium Car 3', price: 300000 },
      { id: 'h-4', name: 'Hot Wheels Premium Car 4', price: 320000 },

      { id: 'f-1', name: 'Anime Figure 1', price: 1200000 },
      { id: 'f-2', name: 'Anime Figure 2', price: 1500000 },
      { id: 'f-3', name: 'Anime Figure 3', price: 1800000 },
      { id: 'f-4', name: 'Anime Figure 4', price: 2000000 },

      { id: 'b-1', name: 'Bandai Model Kit 1', price: 500000 },
      { id: 'b-2', name: 'Bandai Model Kit 2', price: 600000 },
      { id: 'b-3', name: 'Bandai Model Kit 3', price: 700000 },
      { id: 'b-4', name: 'Bandai Model Kit 4', price: 800000 },
    ];

    try {
      setLoading(true);
      const response = await getAllProducts();
      const apiData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      if (apiData.length === 0) {
        setProducts(sampleProducts);
      } else {
        setProducts([...apiData, ...sampleProducts]);
      }
    } catch (error) {
      console.error('Error fetching products for manage page:', error);
      setProducts(sampleProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      stock: '',
      image: '',
      description: '',
      manufacturer: '',
      brand: '',
      category: '',
      productType: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price != null ? product.price : '',
      stock: product.stock != null ? product.stock : '',
      image: product.image || '',
      description: product.description || '',
      manufacturer: product.manufacturer || '',
      brand: product.brand || '',
      category: product.category || '',
      productType: product.productType || ''
    });
  };

  const handleDelete = async (product) => {
    const key = product._id || product.id;
    try {
      const confirmDelete = window.confirm(`Bạn có chắc muốn xoá sản phẩm "${product.name}"?`);
      if (!confirmDelete) return;

      if (product._id) {
        await deleteProduct(product._id);
        await fetchProducts();
      } else {
        setProducts((prev) => prev.filter((p) => (p._id || p.id) !== key));
      }

      if (editingProduct && (editingProduct._id || editingProduct.id) === key) {
        resetForm();
      }
      setSelectedIds((prev) => prev.filter((id) => id !== key));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Không thể xoá sản phẩm. Vui lòng thử lại.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: formData.price !== '' ? Number(formData.price) : 0,
        stock: formData.stock !== '' ? Number(formData.stock) : 0
      };

      if (editingProduct && editingProduct._id) {
        await updateProduct(editingProduct._id, payload);
      } else {
        await createProduct(payload);
      }

      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Không thể lưu sản phẩm. Vui lòng kiểm tra lại dữ liệu.');
    }
  };

  const toggleSelectProduct = (productId) => {
    setSelectedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để xoá.');
      return;
    }

    const confirmDelete = window.confirm(`Bạn có chắc muốn xoá ${selectedIds.length} sản phẩm đã chọn?`);
    if (!confirmDelete) return;

    try {
      for (const id of selectedIds) {
        const product = products.find(
          (p) => p._id === id || p.id === id
        );
        if (!product) continue;

        if (product._id) {
          await deleteProduct(product._id);
        } else {
          setProducts((prev) =>
            prev.filter((p) => (p._id || p.id) !== id)
          );
        }
      }

      if (editingProduct && selectedIds.includes(editingProduct._id || editingProduct.id)) {
        resetForm();
      }

      setSelectedIds([]);
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting selected products:', error);
      alert('Không thể xoá các sản phẩm đã chọn. Vui lòng thử lại.');
    }
  };

  const filteredProducts = products.filter((product) => {
    const name = (product.name || '').toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="manage-products-page">
      <div className="manage-products-header">
        <button className="manage-back-btn" onClick={onBack}>
          ← Về trang sản phẩm
        </button>
        <h1>Quản lý sản phẩm</h1>
      </div>

      <div className="manage-layout">
        <div className="manage-form-section">
          <h2>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <form className="manage-form" onSubmit={handleSubmit}>
            <div className="manage-form-row">
              <label>
                Tên sản phẩm
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </label>
            </div>
            <div className="manage-form-row">
              <label>
                Giá
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  min="0"
                  required
                />
              </label>
              <label>
                Số lượng (stock)
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleFormChange}
                  min="0"
                />
              </label>
            </div>

            <div className="manage-form-row">
              <label>
                Ảnh (URL)
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                />
              </label>
            </div>

            <div className="manage-form-row">
              <label>
                Hãng sản xuất
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Thương hiệu
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleFormChange}
                />
              </label>
            </div>

            <div className="manage-form-row">
              <label>
                Danh mục
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  placeholder="gundam / hotwheel / figure / bandai..."
                />
              </label>
              <label>
                Loại sản phẩm
                <input
                  type="text"
                  name="productType"
                  value={formData.productType}
                  onChange={handleFormChange}
                />
              </label>
            </div>

            <div className="manage-form-row">
              <label>
                Mô tả
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                />
              </label>
            </div>

            <div className="manage-form-actions">
              <button type="button" className="manage-btn secondary" onClick={resetForm}>
                Làm mới
              </button>
              <button type="submit" className="manage-btn primary">
                {editingProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
              </button>
            </div>
          </form>
        </div>

        <div className="manage-list-section">
          <div className="manage-list-header">
            <h2>Danh sách sản phẩm</h2>
            <div className="manage-list-actions">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="manage-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                className="manage-btn small danger"
                onClick={handleDeleteSelected}
              >
                Xóa đã chọn
              </button>
            </div>
          </div>
          {loading ? (
            <p>Đang tải sản phẩm...</p>
          ) : filteredProducts.length === 0 ? (
            <p>Chưa có sản phẩm nào.</p>
          ) : (
            <div className="manage-products-list">
              {filteredProducts.map((product) => {
                const imageSrc =
                  product.image || product.imageUrl || product.img || null;
                const initials =
                  (product.name || 'SP')
                    .trim()
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();

                return (
                  <div key={product._id || product.id} className="manage-product-row">
                    <div className="manage-product-left">
                      <div className="manage-product-thumb">
                        {imageSrc ? (
                          <img src={imageSrc} alt={product.name || 'Sản phẩm'} />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <div className="manage-product-info">
                        <div className="manage-product-name">
                          {product.name || 'Sản phẩm'}
                        </div>
                        <div className="manage-product-meta">
                          {product.price
                            ? `${product.price.toLocaleString('vi-VN')}₫`
                            : 'Giá: Liên hệ'}
                          {typeof product.stock === 'number' && (
                            <span className="manage-product-stock">
                              {` • Số lượng: ${product.stock}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="manage-product-right">
                      <label className="manage-product-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product._id || product.id)}
                          onChange={() => toggleSelectProduct(product._id || product.id)}
                        />
                        <span>Chọn</span>
                      </label>
                      <div className="manage-product-actions">
                        <button
                          type="button"
                          className="manage-btn small"
                          onClick={() => handleEdit(product)}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="manage-btn small danger"
                          onClick={() => handleDelete(product)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProductsPage;


