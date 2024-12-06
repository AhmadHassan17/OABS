const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// Get all billing records
router.get('/', billingController.getBillingRecords);

// Get a billing record by ID
router.get('/:id', billingController.getBillingRecord);

// Add a new billing record
router.post('/', billingController.addBillingRecord);

// Update a billing record by ID
router.put('/:id', billingController.updateBillingRecord);

// Delete a billing record by ID
router.delete('/:id', billingController.deleteBillingRecord);

module.exports = router;
