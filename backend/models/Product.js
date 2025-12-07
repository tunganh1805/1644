const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  manufacturer: {
    type: String,
    default: ''
  },
  brand: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  productType: {
    type: String,
    default: ''
  },
  badges: [{
    text: String,
    type: String
  }],
  stock: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

productSchema.index({ name: 'text', manufacturer: 'text', brand: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

