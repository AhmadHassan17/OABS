const billingModel = require('../models/billingModel');

// Get all billing records
const getBillingRecords = (req, res) => {
  billingModel.getAllBillingRecords((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch billing records' });
    }
    res.json(results);
  });
};

// Get a single billing record by ID
const getBillingRecord = (req, res) => {
  const billingId = req.params.id;
  billingModel.getBillingRecordById(billingId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch billing record' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.json(result[0]);
  });
};

// Add a new billing record
const addBillingRecord = (req, res) => {
  const newBilling = req.body;
  billingModel.addBillingRecord(newBilling, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add billing record' });
    }
    res.status(201).json({ message: 'Billing record added', billingId: result.insertId });
  });
};

// Update an existing billing record
const updateBillingRecord = (req, res) => {
  const billingId = req.params.id;
  const updatedFields = req.body;
  billingModel.updateBillingRecord(billingId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update billing record' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.json({ message: 'Billing record updated' });
  });
};

// Delete a billing record
const deleteBillingRecord = (req, res) => {
  const billingId = req.params.id;
  billingModel.deleteBillingRecord(billingId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete billing record' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.json({ message: 'Billing record deleted' });
  });
};

module.exports = {
  getBillingRecords,
  getBillingRecord,
  addBillingRecord,
  updateBillingRecord,
  deleteBillingRecord,
};
