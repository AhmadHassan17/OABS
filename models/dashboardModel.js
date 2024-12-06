// models/dashboardModel.js
const db = require('../db/connection');

const getDashboardStats = () => {
  return new Promise((resolve, reject) => {
    const stats = {};

    db.query(`
      SELECT COUNT(*) AS totalAppointments
      FROM appointments
    `, (err, results) => {
      if (err) {
        console.error('Error fetching total appointments:', err.message);
        return reject(err);
      }
      stats.totalAppointments = results[0]?.totalAppointments || 0;

      db.query(`
        SELECT IFNULL(SUM(amount), 0) AS totalPayments
        FROM billing
        WHERE payment_status = 'Paid'
      `, (err, results) => {
        if (err) {
          console.error('Error fetching total payments:', err.message);
          return reject(err);
        }
        stats.totalPayments = results[0]?.totalPayments || 0;

        db.query(`
          SELECT COUNT(*) AS totalDoctors
          FROM doctors
        `, (err, results) => {
          if (err) {
            console.error('Error fetching total doctors:', err.message);
            return reject(err);
          }
          stats.totalDoctors = results[0]?.totalDoctors || 0;

          // Return the final stats object
          resolve(stats);
        });
      });
    });
  });
};

module.exports = { getDashboardStats };
