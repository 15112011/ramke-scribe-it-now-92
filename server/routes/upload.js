const express = require('express');
const { uploadPaymentProof } = require('../config/cloudinary');
const User = require('../models/User');

const router = express.Router();

// Upload payment proof
router.post('/payment-proof/:userId', uploadPaymentProof.single('paymentProof'), async (req, res) => {
  try {
    const { userId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Update user with payment proof
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.paymentProof = {
      cloudinaryUrl: req.file.path,
      cloudinaryId: req.file.filename,
      uploadedAt: new Date()
    };

    await user.save();

    res.json({
      message: 'Payment proof uploaded successfully',
      paymentProof: user.paymentProof
    });
  } catch (error) {
    console.error('Upload payment proof error:', error);
    res.status(500).json({ error: 'Failed to upload payment proof' });
  }
});

module.exports = router;