const prescriptionModel = require('../models/prescriptionModel');

// Get all prescriptions
const getAllPrescriptions = (req, res) => {
  prescriptionModel.getAllPrescriptions((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch prescriptions' });
    }
    res.json(result);
  });
};

// Get a prescription by ID
const getPrescriptionById = (req, res) => {
  const prescriptionId = req.params.prescriptionId;
  prescriptionModel.getPrescriptionById(prescriptionId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch prescription' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(result[0]);
  });
};

// Add a new prescription
const addPrescription = (req, res) => {
  const newPrescription = req.body;
  prescriptionModel.addPrescription(newPrescription, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add prescription' });
    }
    res.status(201).json({ message: 'Prescription added', prescriptionId: result.insertId });
  });
};

// Update a prescription
const updatePrescription = (req, res) => {
  const prescriptionId = req.params.prescriptionId;
  const updatedFields = req.body;
  prescriptionModel.updatePrescription(prescriptionId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update prescription' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json({ message: 'Prescription updated' });
  });
};

// Delete a prescription
const deletePrescription = (req, res) => {
  const prescriptionId = req.params.prescriptionId;
  prescriptionModel.deletePrescription(prescriptionId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete prescription' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json({ message: 'Prescription deleted' });
  });
};

module.exports = {
  getAllPrescriptions,
  getPrescriptionById,
  addPrescription,
  updatePrescription,
  deletePrescription,
};
