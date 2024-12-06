const connection = require('../db/connection');

// Get doctor profile by doctor ID
const getDoctorProfileByDoctorId = (doctorId, callback) => {
  connection.query('SELECT * FROM doctorprofile WHERE doctor_id = ?', [doctorId], (err, result) => {
    if (err) {
      console.error('Error fetching doctor profile:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new doctor profile
const addDoctorProfile = (doctorProfile, callback) => {
  const { doctor_id, bio, experience, specialization } = doctorProfile;
  connection.query(
    'INSERT INTO doctorprofile (doctor_id, bio, experience, specialization) VALUES (?, ?, ?, ?)',
    [doctor_id, bio, experience, specialization],
    (err, result) => {
      if (err) {
        console.error('Error adding doctor profile:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update doctor profile
const updateDoctorProfile = (profileId, updatedFields, callback) => {
  const { bio, experience, specialization } = updatedFields;
  connection.query(
    'UPDATE doctorprofile SET bio = ?, experience = ?, specialization = ? WHERE profile_id = ?',
    [bio, experience, specialization, profileId],
    (err, result) => {
      if (err) {
        console.error('Error updating doctor profile:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete doctor profile
const deleteDoctorProfile = (profileId, callback) => {
  connection.query('DELETE FROM doctorprofile WHERE profile_id = ?', [profileId], (err, result) => {
    if (err) {
      console.error('Error deleting doctor profile:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getDoctorProfileByDoctorId,
  addDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
};
