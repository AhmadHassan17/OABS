const connection = require('../db/connection');

// Get all timeslots
const getAllTimeslots = (callback) => {
  connection.query('SELECT * FROM timeslots', (err, results) => {
    if (err) {
      console.error('Error fetching timeslots:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get timeslot by ID
const getTimeslotById = (timeslotId, callback) => {
  connection.query('SELECT * FROM timeslots WHERE timeslot_id = ?', [timeslotId], (err, result) => {
    if (err) {
      console.error('Error fetching timeslot:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new timeslot
const addTimeslot = (timeslot, callback) => {
  const { doctor_id, day_of_week, start_time, end_time } = timeslot;
  connection.query(
    'INSERT INTO timeslots (doctor_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)',
    [doctor_id, day_of_week, start_time, end_time],
    (err, result) => {
      if (err) {
        console.error('Error adding timeslot:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update a timeslot by ID
const updateTimeslot = (timeslotId, updatedFields, callback) => {
  const { doctor_id, day_of_week, start_time, end_time } = updatedFields;
  connection.query(
    'UPDATE timeslots SET doctor_id = ?, day_of_week = ?, start_time = ?, end_time = ? WHERE timeslot_id = ?',
    [doctor_id, day_of_week, start_time, end_time, timeslotId],
    (err, result) => {
      if (err) {
        console.error('Error updating timeslot:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete a timeslot by ID
const deleteTimeslot = (timeslotId, callback) => {
  connection.query('DELETE FROM timeslots WHERE timeslot_id = ?', [timeslotId], (err, result) => {
    if (err) {
      console.error('Error deleting timeslot:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Get timeslots by doctor ID
const getTimeslotsByDoctorId = (doctorId, callback) => {
  connection.query('SELECT * FROM timeslots WHERE doctor_id = ?', [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching timeslots:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};


module.exports = {
  getAllTimeslots,
  getTimeslotById,
  addTimeslot,
  updateTimeslot,
  deleteTimeslot,
  getTimeslotsByDoctorId
};
