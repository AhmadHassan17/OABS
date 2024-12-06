const connection = require('../db/connection');

// Get all billing records
const getAllBillingRecords = (callback) => {
  connection.query('SELECT * FROM Billing', (err, results) => {
    if (err) {
      console.error('Error fetching billing records:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get a billing record by ID
const getBillingRecordById = (billingId, callback) => {
  connection.query('SELECT * FROM Billing WHERE billing_id = ?', [billingId], (err, result) => {
    if (err) {
      console.error('Error fetching billing record:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new billing record
const addBillingRecord = (billing, callback) => {
  const { appointment_id, patient_id, amount, payment_date, payment_status } = billing;
  connection.query(
    'INSERT INTO Billing (appointment_id, patient_id, amount, payment_date, payment_status) VALUES (?, ?, ?, ?, ?)',
    [appointment_id, patient_id, amount, payment_date, payment_status],
    (err, result) => {
      if (err) {
        console.error('Error adding billing record:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update an existing billing record
const updateBillingRecord = (billingId, updatedFields, callback) => {
  const { amount, payment_date, payment_status } = updatedFields;
  connection.query(
    'UPDATE Billing SET amount = ?, payment_date = ?, payment_status = ? WHERE billing_id = ?',
    [amount, payment_date, payment_status, billingId],
    (err, result) => {
      if (err) {
        console.error('Error updating billing record:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete a billing record
const deleteBillingRecord = (billingId, callback) => {
  connection.query('DELETE FROM Billing WHERE billing_id = ?', [billingId], (err, result) => {
    if (err) {
      console.error('Error deleting billing record:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getAllBillingRecords,
  getBillingRecordById,
  addBillingRecord,
  updateBillingRecord,
  deleteBillingRecord,
};
