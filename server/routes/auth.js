const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register new user (subscription)
router.post('/register', async (req, res) => {
  try {
    const { email, name, phone, password, selectedPlan, goals } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      email,
      name,
      phone,
      password,
      subscription: {
        plan: selectedPlan,
        status: 'pending'
      },
      goals
    });

    await user.save();

    res.status(201).json({
      message: 'Registration successful. Awaiting coach approval.',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ error: 'Account is blocked' });
    }

    // Check login attempts
    if (user.loginAttempts.blockedUntil && new Date() < user.loginAttempts.blockedUntil) {
      const remainingTime = Math.ceil((user.loginAttempts.blockedUntil - new Date()) / 1000);
      return res.status(429).json({ 
        error: 'Too many login attempts',
        remainingTime
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      // Increment login attempts
      user.loginAttempts.count += 1;
      user.loginAttempts.lastAttempt = new Date();
      
      // Block for 1 minute after 3 failed attempts
      if (user.loginAttempts.count >= 3) {
        user.loginAttempts.blockedUntil = new Date(Date.now() + 60000); // 1 minute
        user.loginAttempts.count = 0;
      }
      
      await user.save();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    user.loginAttempts = {
      count: 0,
      lastAttempt: new Date(),
      blockedUntil: null
    };
    
    // Reset daily usage if needed
    user.resetDailyUsageIfNeeded();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
        dailyUsage: user.dailyUsage
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    user.resetDailyUsageIfNeeded();
    await user.save();
    
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
        resources: user.resources,
        dailyUsage: user.dailyUsage
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

// Coach login
router.post('/coach-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Simple coach authentication (in production, use proper user management)
    const COACH_CREDENTIALS = {
      username: 'omar_coach_2024',
      password: 'SecureCoachPass!2024'
    };

    if (username === COACH_CREDENTIALS.username && password === COACH_CREDENTIALS.password) {
      const token = jwt.sign(
        { userId: 'coach', role: 'coach' }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
      );
      
      res.json({
        token,
        user: {
          id: 'coach',
          username: 'omar_coach_2024',
          role: 'coach'
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid coach credentials' });
    }
  } catch (error) {
    console.error('Coach login error:', error);
    res.status(500).json({ error: 'Coach login failed' });
  }
});

module.exports = router;