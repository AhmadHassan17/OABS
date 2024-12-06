const appointmentModel = require('../models/appointmentModel');

// Get all appointments
const getAppointments = (req, res) => {
  appointmentModel.getAllAppointments((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch appointments' });
    }
    res.json(results);
  });
};

// Get a single appointment by ID
const getAppointment = (req, res) => {
  const appointmentId = req.params.id;
  appointmentModel.getAppointmentById(appointmentId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch appointment' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(result[0]);
  });
};

// Add a new appointment
const addAppointment = (req, res) => {
  const newAppointment = req.body;
  appointmentModel.addAppointment(newAppointment, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add appointment' });
    }
    res.status(201).json({ message: 'Appointment added', appointmentId: result.insertId });
  });
};

// Update an existing appointment
const updateAppointment = (req, res) => {
  const appointmentId = req.params.id;
  const updatedFields = req.body;
  appointmentModel.updateAppointment(appointmentId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update appointment' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment updated' });
  });
};

// Delete an appointment
const deleteAppointment = (req, res) => {
  const appointmentId = req.params.id;
  appointmentModel.deleteAppointment(appointmentId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete appointment' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted' });
  });
};

// Filter appointments by patient ID and date
const filterAppointments = (req, res) => {
  const { patientId, appointmentDate } = req.query;

  appointmentModel.filterAppointments(patientId, appointmentDate, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to filter appointments' });
    }
    res.json(results);
  });
};

module.exports = {
  // Other functions...
  filterAppointments,
};




module.exports = {
  getAppointments,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  filterAppointments,
};
