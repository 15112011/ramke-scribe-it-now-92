const express = require('express');
const User = require('../models/User');
const Resource = require('../models/Resource');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Middleware to ensure coach access
const requireCoach = requireRole(['coach', 'admin']);

// Get all subscription requests
router.get('/requests', authenticateToken, requireCoach, async (req, res) => {
  try {
    const { status = 'all', page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (status !== 'all') {
      filter['subscription.status'] = status;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      requests: users,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ error: 'Failed to get subscription requests' });
  }
});

// Approve subscription request
router.post('/approve/:userId', authenticateToken, requireCoach, async (req, res) => {
  try {
    const { userId } = req.params;
    const { accessDays, customPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate end date
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + accessDays);

    // Update user subscription
    user.subscription.status = 'active';
    user.subscription.startDate = startDate;
    user.subscription.endDate = endDate;
    user.subscription.accessDays = accessDays;

    // Update password if provided
    if (customPassword) {
      user.password = customPassword;
    }

    await user.save();

    res.json({
      message: 'Subscription approved successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        subscription: user.subscription
      }
    });
  } catch (error) {
    console.error('Approve subscription error:', error);
    res.status(500).json({ error: 'Failed to approve subscription' });
  }
});

// Reject subscription request
router.post('/reject/:userId', authenticateToken, requireCoach, async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.subscription.status = 'cancelled';
    await user.save();

    res.json({
      message: 'Subscription request rejected',
      reason
    });
  } catch (error) {
    console.error('Reject subscription error:', error);
    res.status(500).json({ error: 'Failed to reject subscription' });
  }
});

// Block user
router.post('/block/:userId', authenticateToken, requireCoach, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isBlocked = true;
    user.subscription.status = 'cancelled';
    await user.save();

    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error('Block user error:', error);
    res.status(500).json({ error: 'Failed to block user' });
  }
});

// Assign resources to user
router.post('/assign-resources/:userId', authenticateToken, requireCoach, async (req, res) => {
  try {
    const { userId } = req.params;
    const { videos, documents } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add new resources
    if (videos && videos.length > 0) {
      user.resources.videos.push(...videos.map(video => ({
        title: video.title,
        url: video.url,
        assignedAt: new Date()
      })));
    }

    if (documents && documents.length > 0) {
      user.resources.documents.push(...documents.map(doc => ({
        title: doc.title,
        url: doc.url,
        type: doc.type,
        assignedAt: new Date()
      })));
    }

    await user.save();

    res.json({
      message: 'Resources assigned successfully',
      resources: user.resources
    });
  } catch (error) {
    console.error('Assign resources error:', error);
    res.status(500).json({ error: 'Failed to assign resources' });
  }
});

// Get dashboard stats
router.get('/dashboard-stats', authenticateToken, requireCoach, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const pendingRequests = await User.countDocuments({ 'subscription.status': 'pending' });
    const activeSubscriptions = await User.countDocuments({ 'subscription.status': 'active' });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    // Get recent activity
    const recentUsers = await User.find()
      .select('name email subscription.plan createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        pendingRequests,
        activeSubscriptions,
        blockedUsers
      },
      recentActivity: recentUsers
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
});

module.exports = router;