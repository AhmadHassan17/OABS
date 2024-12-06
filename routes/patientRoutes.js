const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Login route
router.post('/login', patientController.loginPatient);

// Get all patients
router.get('/', patientController.getAllPatients);

// Get a patient by ID
router.get('/:patientId', patientController.getPatientById);

// Add a new patient
router.post('/', patientController.addPatient);



// Update a patient by patient ID
router.put('/:patientId', patientController.updatePatient);

// Delete a patient by patient ID
router.delete('/:patientId', patientController.deletePatient);

module.exports = router;
