const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Get all feedback
router.get('/', feedbackController.getAllFeedback);

// Get feedback for a specific patient
router.get('/patient/:patientId', feedbackController.getFeedbackForPatient);

// Get feedback for a specific doctor
router.get('/doctor/:doctorId', feedbackController.getFeedbackForDoctor);

// Get feedback for a specific appointment
router.get('/appointment/:appointmentId', feedbackController.getFeedbackForAppointment);

// Add new feedback
router.post('/', feedbackController.addFeedback);

// Update feedback by feedback ID
router.put('/:feedbackId', feedbackController.updateFeedback);

// Delete feedback by feedback ID
router.delete('/:feedbackId', feedbackController.deleteFeedback);

module.exports = router;
