const doctorModel = require('../models/doctorModel');

// Get all doctors
const getDoctors = (req, res) => {
  doctorModel.getAllDoctors((err, doctors) => {
    if (err) {
      return res.status(500).send('Error fetching doctors');
    }
    res.json(doctors);
  });
};

// Get doctor by ID
const getDoctor = (req, res) => {
  const doctorId = req.params.id;
  doctorModel.getDoctorById(doctorId, (err, doctor) => {
    if (err) {
      return res.status(500).send('Error fetching doctor');
    }
    res.json(doctor);
  });
};

// Add a new doctor
const addDoctor = (req, res) => {
  const doctor = req.body;
  doctorModel.addDoctor(doctor, (err, result) => {
    if (err) {
      return res.status(500).send('Error adding doctor');
    }
    res.status(201).json(result);
  });
};

module.exports = {
  getDoctors,
  getDoctor,
  addDoctor,
};
