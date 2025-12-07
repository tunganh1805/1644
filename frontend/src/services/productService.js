import api from './api';

/**
 * Product Service - Handles all product-related API calls
 * This service layer separates API logic from components (Controller pattern)
 */

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product (soft delete)
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Legacy endpoints (for backward compatibility)
export const getProductsLegacy = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching products (legacy):', error);
    throw error;
  }
};

export const createProductLegacy = async (productData) => {
  try {
    const response = await api.post('/add', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product (legacy):', error);
    throw error;
  }
};

export const updateProductLegacy = async (id, productData) => {
  try {
    const response = await api.put(`/update/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product (legacy):', error);
    throw error;
  }
};

export const deleteProductLegacy = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product (legacy):', error);
    throw error;
  }
};

