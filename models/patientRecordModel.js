const connection = require('../db/connection');

// Get all patient records
const getAllPatientRecords = (callback) => {
  connection.query('SELECT * FROM patientrecords', (err, results) => {
    if (err) {
      console.error('Error fetching patient records:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get patient records by patient ID
const getPatientRecordsByPatientId = (patientId, callback) => {
  connection.query('SELECT * FROM patientrecords WHERE patient_id = ?', [patientId], (err, results) => {
    if (err) {
      console.error('Error fetching patient records for patient:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get patient records by doctor ID
const getPatientRecordsByDoctorId = (doctorId, callback) => {
  connection.query('SELECT * FROM patientrecords WHERE doctor_id = ?', [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching patient records for doctor:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new patient record
const addPatientRecord = (record, callback) => {
  const { patient_id, doctor_id, record_date, notes, diagnosis, treatment } = record;
  connection.query(
    'INSERT INTO patientrecords (patient_id, doctor_id, record_date, notes, diagnosis, treatment) VALUES (?, ?, ?, ?, ?, ?)',
    [patient_id, doctor_id, record_date, notes, diagnosis, treatment],
    (err, result) => {
      if (err) {
        console.error('Error adding patient record:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update a patient record by record ID
const updatePatientRecord = (recordId, updatedFields, callback) => {
  const { notes, diagnosis, treatment } = updatedFields;
  connection.query(
    'UPDATE patientrecords SET notes = ?, diagnosis = ?, treatment = ? WHERE record_id = ?',
    [notes, diagnosis, treatment, recordId],
    (err, result) => {
      if (err) {
        console.error('Error updating patient record:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete a patient record by record ID
const deletePatientRecord = (recordId, callback) => {
  connection.query('DELETE FROM patientrecords WHERE record_id = ?', [recordId], (err, result) => {
    if (err) {
      console.error('Error deleting patient record:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getAllPatientRecords,
  getPatientRecordsByPatientId,
  getPatientRecordsByDoctorId,
  addPatientRecord,
  updatePatientRecord,
  deletePatientRecord,
};
