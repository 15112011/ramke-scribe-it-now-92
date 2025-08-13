const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: String,
    ar: String
  },
  type: {
    type: String,
    enum: ['video', 'document'],
    required: true
  },
  category: {
    type: String,
    enum: ['training', 'diet', 'general'],
    default: 'general'
  },
  url: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accessLevel: {
    type: String,
    enum: ['basic', 'professional', 'premium', 'all'],
    default: 'all'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);