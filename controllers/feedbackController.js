const feedbackModel = require('../models/feedbackModel');

// Get all feedback
const getAllFeedback = (req, res) => {
  feedbackModel.getFeedback((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch feedback' });
    }
    res.json(result);
  });
};

// Get feedback by patient ID
const getFeedbackForPatient = (req, res) => {
  const patientId = req.params.patientId;
  feedbackModel.getFeedbackByPatientId(patientId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch feedback for patient' });
    }
    res.json(result);
  });
};

// Get feedback by doctor ID
const getFeedbackForDoctor = (req, res) => {
  const doctorId = req.params.doctorId;
  feedbackModel.getFeedbackByDoctorId(doctorId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch feedback for doctor' });
    }
    res.json(result);
  });
};

// Get feedback by appointment ID
const getFeedbackForAppointment = (req, res) => {
  const appointmentId = req.params.appointmentId;
  feedbackModel.getFeedbackByAppointmentId(appointmentId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch feedback for appointment' });
    }
    res.json(result);
  });
};

// Add new feedback
const addFeedback = (req, res) => {
  const newFeedback = req.body;
  feedbackModel.addFeedback(newFeedback, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add feedback' });
    }
    res.status(201).json({ message: 'Feedback added', feedbackId: result.insertId });
  });
};

// Update feedback
const updateFeedback = (req, res) => {
  const feedbackId = req.params.feedbackId;
  const updatedFields = req.body;
  feedbackModel.updateFeedback(feedbackId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update feedback' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback updated' });
  });
};

// Delete feedback
const deleteFeedback = (req, res) => {
  const feedbackId = req.params.feedbackId;
  feedbackModel.deleteFeedback(feedbackId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete feedback' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted' });
  });
};

module.exports = {
  getAllFeedback,
  getFeedbackForPatient,
  getFeedbackForDoctor,
  getFeedbackForAppointment,
  addFeedback,
  updateFeedback,
  deleteFeedback,
};
