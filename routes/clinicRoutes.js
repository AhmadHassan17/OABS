const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

// Get all clinics
router.get('/', clinicController.getClinics);

// Get a clinic by ID
router.get('/:id', clinicController.getClinic);

// Add a new clinic
router.post('/', clinicController.addClinic);

// Update a clinic by ID
router.put('/:id', clinicController.updateClinic);

// Delete a clinic by ID
router.delete('/:id', clinicController.deleteClinic);

module.exports = router;
