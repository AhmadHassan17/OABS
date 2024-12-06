// test.js
const db = require('../../db/connection'); // Adjust the path if needed
const { getDashboardStats } = require('../../models/dashboardModel'); // Adjust the path if needed

const testGetDashboardStats = () => {
  getDashboardStats((err, stats) => {
    if (err) {
      console.error('Error fetching dashboard stats:', err);
    } else {
      console.log('Dashboard Stats:', stats);
    }
    db.end(); // Close the DB connection
  });
};

testGetDashboardStats();