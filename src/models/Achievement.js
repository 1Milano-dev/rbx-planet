const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  reward: {
    robux: {
      type: Number,
      default: 0
    }
  },
  condition: {
    type: {
      type: String,
      enum: ['purchase', 'referral', 'login', 'level'],
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('Achievement', achievementSchema); 