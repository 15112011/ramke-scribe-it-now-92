const express = require('express');
const User = require('../models/User');
const { uploadPaymentProof } = require('../config/cloudinary');
const { authenticateToken, requireActiveSubscription } = require('../middleware/auth');

const router = express.Router();

// Submit subscription request with payment proof
router.post('/submit', uploadPaymentProof.single('paymentProof'), async (req, res) => {
  try {
    const { email, name, phone, password, selectedPlan, goals } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create user with payment proof
    const user = new User({
      email,
      name,
      phone,
      password,
      subscription: {
        plan: selectedPlan,
        status: 'pending'
      },
      goals,
      paymentProof: req.file ? {
        cloudinaryUrl: req.file.path,
        cloudinaryId: req.file.filename,
        uploadedAt: new Date()
      } : undefined
    });

    await user.save();

    res.status(201).json({
      message: 'Subscription request submitted successfully',
      requestId: user._id
    });
  } catch (error) {
    console.error('Subscription submission error:', error);
    res.status(500).json({ error: 'Failed to submit subscription request' });
  }
});

// Get user's resources
router.get('/my-resources', authenticateToken, requireActiveSubscription, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Reset daily usage if needed
    user.resetDailyUsageIfNeeded();
    await user.save();

    res.json({
      resources: user.resources,
      dailyUsage: user.dailyUsage,
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Failed to get resources' });
  }
});

// Access resource (with daily limits)
router.post('/access-resource', authenticateToken, requireActiveSubscription, async (req, res) => {
  try {
    const { resourceType } = req.body; // 'training' or 'video'
    const user = await User.findById(req.user._id);

    // Reset daily usage if needed
    user.resetDailyUsageIfNeeded();

    // Check daily limits
    const limits = { training: 5, video: 1 };
    const currentUsage = resourceType === 'training' ? 
      user.dailyUsage.trainingsAccessed : 
      user.dailyUsage.videosAccessed;

    if (currentUsage >= limits[resourceType]) {
      return res.status(429).json({ 
        error: `Daily limit reached for ${resourceType}`,
        limit: limits[resourceType],
        current: currentUsage
      });
    }

    // Update usage
    if (resourceType === 'training') {
      user.dailyUsage.trainingsAccessed += 1;
    } else {
      user.dailyUsage.videosAccessed += 1;
    }

    await user.save();

    res.json({
      message: 'Resource access granted',
      dailyUsage: user.dailyUsage
    });
  } catch (error) {
    console.error('Resource access error:', error);
    res.status(500).json({ error: 'Failed to access resource' });
  }
});

module.exports = router;