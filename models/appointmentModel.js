const connection = require('../db/connection');

// Get all appointments
const getAllAppointments = (callback) => {
  connection.query('SELECT * FROM appointments', (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get an appointment by ID
const getAppointmentById = (appointmentId, callback) => {
  connection.query('SELECT * FROM appointments WHERE appointment_id = ?', [appointmentId], (err, result) => {
    if (err) {
      console.error('Error fetching appointment:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new appointment
const addAppointment = (appointment, callback) => {
  const { doctor_id, patient_id, appointment_date, timeslot_id, status, notes } = appointment;
  connection.query(
    'INSERT INTO appointments (doctor_id, patient_id, appointment_date, timeslot_id, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
    [doctor_id, patient_id, appointment_date, timeslot_id, status, notes],
    (err, result) => {
      if (err) {
        console.error('Error adding appointment:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update an appointment
const updateAppointment = (appointmentId, updatedFields, callback) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updatedFields)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }
  values.push(appointmentId);

  connection.query(
    `UPDATE appointments SET ${fields.join(', ')} WHERE appointment_id = ?`,
    values,
    (err, result) => {
      if (err) {
        console.error('Error updating appointment:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete an appointment
const deleteAppointment = (appointmentId, callback) => {
  connection.query('DELETE FROM appointments WHERE appointment_id = ?', [appointmentId], (err, result) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};


// Filter appointments by patient ID and date
const filterAppointments = (patientId, appointmentDate, callback) => {
  const filters = [];
  const values = [];

  if (patientId) {
    filters.push('patient_id = ?');
    values.push(patientId);
  }

  if (appointmentDate) {
    filters.push('appointment_date = ?');
    values.push(appointmentDate);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const query = `SELECT * FROM appointments ${whereClause}`;

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error filtering appointments:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};






module.exports = {
  getAllAppointments,
  getAppointmentById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  filterAppointments,
  
};
