// controllers/dashboardController.js
const dashboardModel = require('../models/dashboardModel');

const getStats = async (req, res) => {
  try {
    const stats = await dashboardModel.getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error in dashboardController:', error); // Logs to terminal
    res.status(500).json({ message: 'Failed to load dashboard stats.' });
  }
};

module.exports = { getStats };
