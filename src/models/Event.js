const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
    enum: ['discount', 'bonus', 'special', 'holiday'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  discount: {
    type: Number,
    min: 0,
    max: 100
  },
  bonusMultiplier: {
    type: Number,
    min: 1
  },
  specialRewards: [{
    name: String,
    description: String,
    icon: String,
    robuxAmount: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Event', eventSchema); 