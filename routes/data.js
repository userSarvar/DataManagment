const express = require('express');
const jwt = require('jsonwebtoken');
const Data = require('../models/Data');
const User = require('../models/User');

const router = express.Router();

// Middleware to check role
function checkRole(roles) {
  return async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!roles.includes(user.role)) return res.status(403).json({ error: 'Access denied' });
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// Create data
router.post('/', checkRole(['Promoter', 'Supervisor']), async (req, res) => {
  const { data } = req.body;
  try {
    const newData = new Data({ ...data, createdBy: req.user._id });
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get data by role
router.get('/', checkRole(['Regional Manager', 'HR', 'Retail Coordinator']), async (req, res) => {
  try {
    const data = await Data.find({ category: req.user.role });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
