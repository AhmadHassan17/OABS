const connection = require('../db/connection');

// Get all feedback for a specific doctor or patient
const getFeedback = (callback) => {
  connection.query('SELECT * FROM feedback', (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get feedback by patient ID
const getFeedbackByPatientId = (patientId, callback) => {
  connection.query('SELECT * FROM feedback WHERE patient_id = ?', [patientId], (err, results) => {
    if (err) {
      console.error('Error fetching feedback for patient:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get feedback by doctor ID
const getFeedbackByDoctorId = (doctorId, callback) => {
  connection.query('SELECT * FROM feedback WHERE doctor_id = ?', [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching feedback for doctor:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get feedback by appointment ID
const getFeedbackByAppointmentId = (appointmentId, callback) => {
  connection.query('SELECT * FROM feedback WHERE appointment_id = ?', [appointmentId], (err, results) => {
    if (err) {
      console.error('Error fetching feedback for appointment:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add new feedback
const addFeedback = (feedback, callback) => {
  const { patient_id, doctor_id, appointment_id, rating, comments, feedback_date } = feedback;
  connection.query(
    'INSERT INTO feedback (patient_id, doctor_id, appointment_id, rating, comments, feedback_date) VALUES (?, ?, ?, ?, ?, ?)',
    [patient_id, doctor_id, appointment_id, rating, comments, feedback_date],
    (err, result) => {
      if (err) {
        console.error('Error adding feedback:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update feedback by feedback ID
const updateFeedback = (feedbackId, updatedFields, callback) => {
  const { rating, comments } = updatedFields;
  connection.query(
    'UPDATE feedback SET rating = ?, comments = ? WHERE feedback_id = ?',
    [rating, comments, feedbackId],
    (err, result) => {
      if (err) {
        console.error('Error updating feedback:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete feedback by feedback ID
const deleteFeedback = (feedbackId, callback) => {
  connection.query('DELETE FROM feedback WHERE feedback_id = ?', [feedbackId], (err, result) => {
    if (err) {
      console.error('Error deleting feedback:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getFeedback,
  getFeedbackByPatientId,
  getFeedbackByDoctorId,
  getFeedbackByAppointmentId,
  addFeedback,
  updateFeedback,
  deleteFeedback,
};
