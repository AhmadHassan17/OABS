const departmentModel = require('../models/departmentModel');

// Get all departments
const getDepartments = (req, res) => {
  departmentModel.getAllDepartments((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch departments' });
    }
    res.json(results);
  });
};

// Get a single department by ID
const getDepartment = (req, res) => {
  const departmentId = req.params.id;
  departmentModel.getDepartmentById(departmentId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch department' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(result[0]);
  });
};

// Add a new department
const addDepartment = (req, res) => {
  const newDepartment = req.body;
  departmentModel.addDepartment(newDepartment, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add department' });
    }
    res.status(201).json({ message: 'Department added', departmentId: result.insertId });
  });
};

// Update department details
const updateDepartment = (req, res) => {
  const departmentId = req.params.id;
  const updatedFields = req.body;
  departmentModel.updateDepartment(departmentId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update department' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Department updated' });
  });
};

// Delete a department
const deleteDepartment = (req, res) => {
  const departmentId = req.params.id;
  departmentModel.deleteDepartment(departmentId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete department' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Department deleted' });
  });
};

module.exports = {
  getDepartments,
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
