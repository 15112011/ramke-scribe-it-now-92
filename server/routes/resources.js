const express = require('express');
const Resource = require('../models/Resource');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all resources (coach only)
router.get('/', authenticateToken, requireRole(['coach', 'admin']), async (req, res) => {
  try {
    const { type, category } = req.query;
    
    let filter = { isActive: true };
    if (type) filter.type = type;
    if (category) filter.category = category;

    const resources = await Resource.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ resources });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Failed to get resources' });
  }
});

// Create new resource
router.post('/', authenticateToken, requireRole(['coach', 'admin']), async (req, res) => {
  try {
    const { title, description, type, category, url, accessLevel } = req.body;

    const resource = new Resource({
      title,
      description,
      type,
      category,
      url,
      accessLevel,
      createdBy: req.user._id
    });

    await resource.save();

    res.status(201).json({
      message: 'Resource created successfully',
      resource
    });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

// Update resource
router.put('/:resourceId', authenticateToken, requireRole(['coach', 'admin']), async (req, res) => {
  try {
    const { resourceId } = req.params;
    const updates = req.body;

    const resource = await Resource.findByIdAndUpdate(
      resourceId,
      updates,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({
      message: 'Resource updated successfully',
      resource
    });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ error: 'Failed to update resource' });
  }
});

// Delete resource
router.delete('/:resourceId', authenticateToken, requireRole(['coach', 'admin']), async (req, res) => {
  try {
    const { resourceId } = req.params;

    const resource = await Resource.findByIdAndUpdate(
      resourceId,
      { isActive: false },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});

module.exports = router;