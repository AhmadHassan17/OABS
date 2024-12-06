const patientModel = require('../models/patientModel');

// Get all patients
const getAllPatients = (req, res) => {
  patientModel.getAllPatients((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch patients' });
    }
    res.json(result);
  });
};

// Get a patient by ID
const getPatientById = (req, res) => {
  const patientId = req.params.patientId;
  patientModel.getPatientById(patientId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch patient' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(result[0]);
  });
};

// Add a new patient
const addPatient = (req, res) => {
  const newPatient = req.body;
  console.log("Received patient data:", newPatient); // Add this line for debugging
  patientModel.addPatient(newPatient, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add patient' });
    }
    res.status(201).json({ message: 'Patient added', patientId: result.insertId });
  });
};

// Update a patient
const updatePatient = (req, res) => {
  const patientId = req.params.patientId;
  const updatedFields = req.body;
  patientModel.updatePatient(patientId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update patient' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient updated' });
  });
};

// Delete a patient
const deletePatient = (req, res) => {
  const patientId = req.params.patientId;
  patientModel.deletePatient(patientId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete patient' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted' });
  });
};


const loginPatient = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  patientModel.getPatientByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to login" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const patient = result[0];
    if (patient.password !== password) { // For simplicity; ideally, use hashed passwords.
      return res.status(401).json({ error: "Invalid password" });
    }
    res.json({
      message: "Login successful",
      
      patient: {
        patient_id: patient.patient_id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
      },
    });
  });
};


module.exports = {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
  loginPatient,
};
