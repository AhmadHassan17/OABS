const connection = require('../db/connection');

// Get all clinic details
const getAllClinics = (callback) => {
  connection.query('SELECT * FROM ClinicDetails', (err, results) => {
    if (err) {
      console.error('Error fetching clinic details:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get clinic details by ID
const getClinicById = (clinicId, callback) => {
  connection.query('SELECT * FROM ClinicDetails WHERE clinic_id = ?', [clinicId], (err, result) => {
    if (err) {
      console.error('Error fetching clinic:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new clinic
const addClinic = (clinic, callback) => {
  const { name, address, contact_number, email, website } = clinic;
  connection.query(
    'INSERT INTO ClinicDetails (name, address, contact_number, email, website) VALUES (?, ?, ?, ?, ?)',
    [name, address, contact_number, email, website],
    (err, result) => {
      if (err) {
        console.error('Error adding clinic:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update clinic details
const updateClinic = (clinicId, updatedFields, callback) => {
  const { name, address, contact_number, email, website } = updatedFields;
  connection.query(
    'UPDATE ClinicDetails SET name = ?, address = ?, contact_number = ?, email = ?, website = ? WHERE clinic_id = ?',
    [name, address, contact_number, email, website, clinicId],
    (err, result) => {
      if (err) {
        console.error('Error updating clinic:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete a clinic
const deleteClinic = (clinicId, callback) => {
  connection.query('DELETE FROM ClinicDetails WHERE clinic_id = ?', [clinicId], (err, result) => {
    if (err) {
      console.error('Error deleting clinic:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getAllClinics,
  getClinicById,
  addClinic,
  updateClinic,
  deleteClinic,
};
