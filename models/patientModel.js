const connection = require('../db/connection');

// Get all patients
const getAllPatients = (callback) => {
  connection.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get patient by ID
const getPatientById = (patientId, callback) => {
  connection.query('SELECT * FROM patients WHERE patient_id = ?', [patientId], (err, result) => {
    if (err) {
      console.error('Error fetching patient:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new patient
const addPatient = (patient, callback) => {
  const { first_name, last_name, date_of_birth, gender, contact_number, email, address, password } = patient;
  connection.query(
    'INSERT INTO patients (first_name, last_name, date_of_birth, gender, contact_number, email, address, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [first_name, last_name, date_of_birth, gender, contact_number, email, address, password],
    (err, result) => {
      if (err) {
        console.error('Error adding patient:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update patient by ID
const updatePatient = (patientId, updatedFields, callback) => {
  const { first_name, last_name, date_of_birth, gender, contact_number, email, address, password } = updatedFields;
  connection.query(
    'UPDATE patients SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, contact_number = ?, email = ?, address = ?, password = ? WHERE patient_id = ?',
    [first_name, last_name, date_of_birth, gender, contact_number, email, address, password, patientId],
    (err, result) => {
      if (err) {
        console.error('Error updating patient:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete patient by ID
const deletePatient = (patientId, callback) => {
  connection.query('DELETE FROM patients WHERE patient_id = ?', [patientId], (err, result) => {
    if (err) {
      console.error('Error deleting patient:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getPatientByEmail = (email, callback) => {
  connection.query('SELECT * FROM patients WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error fetching patient by email:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};



module.exports = {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
  getPatientByEmail,
};
