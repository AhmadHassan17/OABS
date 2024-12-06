const connection = require('../db/connection');

// Get all doctors
const getAllDoctors = (callback) => {
  connection.query('SELECT * FROM Doctors', (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get a doctor by ID
const getDoctorById = (doctorId, callback) => {
  connection.query('SELECT * FROM Doctors WHERE doctor_id = ?', [doctorId], (err, result) => {
    if (err) {
      console.error('Error fetching doctor:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new doctor
const addDoctor = (doctor, callback) => {
  const { clinic_id, first_name, last_name, department_id, contact_number, email } = doctor;
  connection.query(
    'INSERT INTO Doctors (clinic_id, first_name, last_name, department_id, contact_number, email) VALUES (?, ?, ?, ?, ?, ?)',
    [clinic_id, first_name, last_name, department_id, contact_number, email],
    (err, result) => {
      if (err) {
        console.error('Error adding doctor:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  addDoctor,
};
