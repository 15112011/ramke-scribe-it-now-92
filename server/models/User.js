const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'coach', 'admin'],
    default: 'user'
  },
  subscription: {
    plan: {
      type: String,
      enum: ['basic', 'professional', 'premium'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'expired', 'cancelled'],
      default: 'pending'
    },
    startDate: Date,
    endDate: Date,
    accessDays: {
      type: Number,
      default: 0
    }
  },
  goals: {
    type: String,
    required: true
  },
  paymentProof: {
    cloudinaryUrl: String,
    cloudinaryId: String,
    uploadedAt: Date
  },
  resources: {
    videos: [{
      title: String,
      url: String,
      assignedAt: { type: Date, default: Date.now }
    }],
    documents: [{
      title: String,
      url: String,
      type: { type: String, enum: ['training', 'diet'] },
      assignedAt: { type: Date, default: Date.now }
    }]
  },
  dailyUsage: {
    date: { type: String, default: () => new Date().toDateString() },
    trainingsAccessed: { type: Number, default: 0 },
    videosAccessed: { type: Number, default: 0 }
  },
  loginAttempts: {
    count: { type: Number, default: 0 },
    lastAttempt: Date,
    blockedUntil: Date
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if subscription is active
userSchema.methods.isSubscriptionActive = function() {
  return this.subscription.status === 'active' && 
         this.subscription.endDate && 
         new Date() <= this.subscription.endDate;
};

// Reset daily usage if new day
userSchema.methods.resetDailyUsageIfNeeded = function() {
  const today = new Date().toDateString();
  if (this.dailyUsage.date !== today) {
    this.dailyUsage = {
      date: today,
      trainingsAccessed: 0,
      videosAccessed: 0
    };
  }
};

module.exports = mongoose.model('User', userSchema);