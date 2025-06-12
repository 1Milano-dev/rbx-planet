const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  level: {
    type: Number,
    default: 1
  },
  experience: {
    type: Number,
    default: 0
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  referralCode: {
    type: String,
    unique: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referrals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dailyBonus: {
    lastClaimed: {
      type: Date
    },
    streak: {
      type: Number,
      default: 0
    }
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  totalEarned: {
    type: Number,
    default: 0
  }
});

userSchema.methods.getNextLevelExp = function() {
  return Math.floor(100 * Math.pow(1.5, this.level - 1));
};

userSchema.methods.canClaimDailyBonus = function() {
  if (!this.dailyBonus.lastClaimed) return true;
  const lastClaimed = new Date(this.dailyBonus.lastClaimed);
  const now = new Date();
  return now.getDate() !== lastClaimed.getDate() || 
         now.getMonth() !== lastClaimed.getMonth() || 
         now.getFullYear() !== lastClaimed.getFullYear();
};

userSchema.methods.calculateDailyBonus = function() {
  const baseBonus = 10;
  const streakBonus = Math.min(this.dailyBonus.streak, 7) * 2;
  return baseBonus + streakBonus;
};

module.exports = mongoose.model('User', userSchema); 