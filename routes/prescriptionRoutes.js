const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

// Get all prescriptions
router.get('/', prescriptionController.getAllPrescriptions);

// Get a prescription by ID
router.get('/:prescriptionId', prescriptionController.getPrescriptionById);

// Add a new prescription
router.post('/', prescriptionController.addPrescription);

// Update a prescription by prescription ID
router.put('/:prescriptionId', prescriptionController.updatePrescription);

// Delete a prescription by prescription ID
router.delete('/:prescriptionId', prescriptionController.deletePrescription);

module.exports = router;
