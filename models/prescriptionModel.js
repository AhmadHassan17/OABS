const connection = require('../db/connection');

// Get all prescriptions
const getAllPrescriptions = (callback) => {
  connection.query('SELECT * FROM prescriptions', (err, results) => {
    if (err) {
      console.error('Error fetching prescriptions:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get prescription by ID
const getPrescriptionById = (prescriptionId, callback) => {
  connection.query('SELECT * FROM prescriptions WHERE prescription_id = ?', [prescriptionId], (err, result) => {
    if (err) {
      console.error('Error fetching prescription:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new prescription
const addPrescription = (prescription, callback) => {
  const { appointment_id, doctor_id, patient_id, date_issued, medication, dosage_instructions } = prescription;
  connection.query(
    'INSERT INTO prescriptions (appointment_id, doctor_id, patient_id, date_issued, medication, dosage_instructions) VALUES (?, ?, ?, ?, ?, ?)',
    [appointment_id, doctor_id, patient_id, date_issued, medication, dosage_instructions],
    (err, result) => {
      if (err) {
        console.error('Error adding prescription:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update a prescription by ID
const updatePrescription = (prescriptionId, updatedFields, callback) => {
  const { appointment_id, doctor_id, patient_id, date_issued, medication, dosage_instructions } = updatedFields;
  connection.query(
    'UPDATE prescriptions SET appointment_id = ?, doctor_id = ?, patient_id = ?, date_issued = ?, medication = ?, dosage_instructions = ? WHERE prescription_id = ?',
    [appointment_id, doctor_id, patient_id, date_issued, medication, dosage_instructions, prescriptionId],
    (err, result) => {
      if (err) {
        console.error('Error updating prescription:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete a prescription by ID
const deletePrescription = (prescriptionId, callback) => {
  connection.query('DELETE FROM prescriptions WHERE prescription_id = ?', [prescriptionId], (err, result) => {
    if (err) {
      console.error('Error deleting prescription:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getAllPrescriptions,
  getPrescriptionById,
  addPrescription,
  updatePrescription,
  deletePrescription,
};
