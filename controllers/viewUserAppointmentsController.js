
const viewUserAppointmentsModel = require('../models/viewUserAppointmentsModel');


// Get appointments by patient ID
const getAppointmentsByPatient = (req, res) => {
    const patientId = req.params.patientId;
    viewUserAppointmentsModel.getAppointmentsByPatientId(patientId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch appointments for patient' });
      }
      res.json(results);
    });
  };
  
  // Get prescriptions by patient ID
  const getPrescriptionsByPatient = (req, res) => {
    const patientId = req.params.patientId;
    viewUserAppointmentsModel.getPrescriptionsByPatientId(patientId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch prescriptions for patient' });
      }
      res.json(results);
    });
  };

  // Cancel an appointment
const cancelAppointment = (req, res) => {
    const appointmentId = req.params.id;
    viewUserAppointmentsModel.cancelAppointment(appointmentId, (err, result) => {
      if (err) {
        if (err.message === 'Cannot cancel appointment with a prescribed medication.') {
          return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Failed to cancel appointment' });
      }
      res.json({ message: 'Appointment canceled successfully' });
    });
  };
  
  module.exports = {
    getAppointmentsByPatient,
    getPrescriptionsByPatient,
    cancelAppointment
  };