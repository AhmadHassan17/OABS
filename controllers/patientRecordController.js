const patientRecordModel = require('../models/patientRecordModel');

// Get all patient records
const getAllPatientRecords = (req, res) => {
  patientRecordModel.getAllPatientRecords((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch patient records' });
    }
    res.json(result);
  });
};

// Get patient records by patient ID
const getPatientRecordsForPatient = (req, res) => {
  const patientId = req.params.patientId;
  patientRecordModel.getPatientRecordsByPatientId(patientId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch patient records for patient' });
    }
    res.json(result);
  });
};

// Get patient records by doctor ID
const getPatientRecordsForDoctor = (req, res) => {
  const doctorId = req.params.doctorId;
  patientRecordModel.getPatientRecordsByDoctorId(doctorId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch patient records for doctor' });
    }
    res.json(result);
  });
};

// Add a new patient record
const addPatientRecord = (req, res) => {
  const newRecord = req.body;
  patientRecordModel.addPatientRecord(newRecord, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add patient record' });
    }
    res.status(201).json({ message: 'Patient record added', recordId: result.insertId });
  });
};

// Update a patient record
const updatePatientRecord = (req, res) => {
  const recordId = req.params.recordId;
  const updatedFields = req.body;
  patientRecordModel.updatePatientRecord(recordId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update patient record' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient record not found' });
    }
    res.json({ message: 'Patient record updated' });
  });
};

// Delete a patient record
const deletePatientRecord = (req, res) => {
  const recordId = req.params.recordId;
  patientRecordModel.deletePatientRecord(recordId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete patient record' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient record not found' });
    }
    res.json({ message: 'Patient record deleted' });
  });
};

module.exports = {
  getAllPatientRecords,
  getPatientRecordsForPatient,
  getPatientRecordsForDoctor,
  addPatientRecord,
  updatePatientRecord,
  deletePatientRecord,
};
