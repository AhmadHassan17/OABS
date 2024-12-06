const express = require('express');
const router = express.Router();
const patientRecordController = require('../controllers/patientRecordController');

// Get all patient records
router.get('/', patientRecordController.getAllPatientRecords);

// Get patient records for a specific patient
router.get('/patient/:patientId', patientRecordController.getPatientRecordsForPatient);

// Get patient records for a specific doctor
router.get('/doctor/:doctorId', patientRecordController.getPatientRecordsForDoctor);

// Add a new patient record
router.post('/', patientRecordController.addPatientRecord);

// Update a patient record by record ID
router.put('/:recordId', patientRecordController.updatePatientRecord);

// Delete a patient record by record ID
router.delete('/:recordId', patientRecordController.deletePatientRecord);

module.exports = router;
