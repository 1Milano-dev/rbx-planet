const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['limited', 'premium', 'special', 'regular'],
    required: true
  },
  price: {
    robux: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  image: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  stock: {
    type: Number,
    default: -1 // -1 означает неограниченное количество
  },
  features: [{
    name: String,
    description: String,
    icon: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ShopItem', shopItemSchema); 