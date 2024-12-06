const express = require('express');
const router = express.Router();
const viewUserAppointmentsController = require('../controllers/viewUserAppointmentsController');


// Get appointments by patient ID
router.get('/patient/:patientId', viewUserAppointmentsController.getAppointmentsByPatient);

// Get prescriptions by patient ID
router.get('/prescriptions/:patientId', viewUserAppointmentsController.getPrescriptionsByPatient);

// Cancel an appointment by ID
router.put('/cancel/:id', viewUserAppointmentsController.cancelAppointment);

module.exports = router;