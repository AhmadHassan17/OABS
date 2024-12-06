const doctorProfileModel = require('../models/doctorProfileModel');

// Get doctor profile by doctor ID
const getDoctorProfile = (req, res) => {
  const doctorId = req.params.doctorId;
  console.log("Doctor ID received:", doctorId); // Debugging line
  doctorProfileModel.getDoctorProfileByDoctorId(doctorId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch doctor profile' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    res.json(result[0]);
  });
};

// Add a new doctor profile
const addDoctorProfile = (req, res) => {
  const newDoctorProfile = req.body;
  doctorProfileModel.addDoctorProfile(newDoctorProfile, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add doctor profile' });
    }
    res.status(201).json({ message: 'Doctor profile added', profileId: result.insertId });
  });
};

// Update doctor profile
const updateDoctorProfile = (req, res) => {
  const profileId = req.params.profileId;
  const updatedFields = req.body;
  doctorProfileModel.updateDoctorProfile(profileId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update doctor profile' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    res.json({ message: 'Doctor profile updated' });
  });
};

// Delete doctor profile
const deleteDoctorProfile = (req, res) => {
  const profileId = req.params.profileId;
  doctorProfileModel.deleteDoctorProfile(profileId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete doctor profile' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    res.json({ message: 'Doctor profile deleted' });
  });
};

module.exports = {
  getDoctorProfile,
  addDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
};
