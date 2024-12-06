const clinicModel = require('../models/clinicModel');

// Get all clinics
const getClinics = (req, res) => {
  clinicModel.getAllClinics((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch clinic details' });
    }
    res.json(results);
  });
};

// Get a single clinic by ID
const getClinic = (req, res) => {
  const clinicId = req.params.id;
  clinicModel.getClinicById(clinicId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch clinic' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    res.json(result[0]);
  });
};

// Add a new clinic
const addClinic = (req, res) => {
  const newClinic = req.body;
  clinicModel.addClinic(newClinic, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add clinic' });
    }
    res.status(201).json({ message: 'Clinic added', clinicId: result.insertId });
  });
};

// Update a clinic
const updateClinic = (req, res) => {
  const clinicId = req.params.id;
  const updatedFields = req.body;
  clinicModel.updateClinic(clinicId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update clinic' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    res.json({ message: 'Clinic updated' });
  });
};

// Delete a clinic
const deleteClinic = (req, res) => {
  const clinicId = req.params.id;
  clinicModel.deleteClinic(clinicId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete clinic' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    res.json({ message: 'Clinic deleted' });
  });
};

module.exports = {
  getClinics,
  getClinic,
  addClinic,
  updateClinic,
  deleteClinic,
};
