const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');


// Get all appointments
router.get('/', appointmentController.getAppointments);


// Filter appointments by patient ID and date
router.get('/filter', appointmentController.filterAppointments);

// Get an appointment by ID
router.get('/:id', appointmentController.getAppointment);

// Add a new appointment
router.post('/', appointmentController.addAppointment);

// Update an appointment by ID
router.put('/:id', appointmentController.updateAppointment);

// Delete an appointment by ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
