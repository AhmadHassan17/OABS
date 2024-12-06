const connection = require('../db/connection');


// Get appointments by patient ID
const getAppointmentsByPatientId = (patientId, callback) => {
    connection.query('SELECT * FROM appointments WHERE patient_id = ?', [patientId], (err, results) => {
      if (err) {
        console.error('Error fetching appointments for patient:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  };
  
  // Get prescriptions by patient ID
  const getPrescriptionsByPatientId = (patientId, callback) => {
    connection.query('SELECT * FROM prescriptions WHERE patient_id = ?', [patientId], (err, results) => {
      if (err) {
        console.error('Error fetching prescriptions for patient:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  };
  
  // Cancel an appointment if no prescription exists
  const cancelAppointment = (appointmentId, callback) => {
    // First, check if there's a prescription linked to the appointment
    connection.query('SELECT * FROM prescriptions WHERE appointment_id = ?', [appointmentId], (err, result) => {
      if (err) {
        console.error('Error checking prescription status:', err);
        return callback(err, null);
      }
  
      if (result.length > 0) {
        // If there's a prescription, the appointment cannot be canceled
        return callback(new Error('Cannot cancel appointment with a prescribed medication.'));
      }
  
      // No prescription, so update the appointment status to 'Canceled'
      connection.query('UPDATE appointments SET status = "Canceled" WHERE appointment_id = ?', [appointmentId], (err, results) => {
        if (err) {
          console.error('Error canceling appointment:', err);
          return callback(err, null);
        }
        callback(null, results);
      });
    });
  };
  
  module.exports = {
    getAppointmentsByPatientId,
    getPrescriptionsByPatientId,
    cancelAppointment
  };