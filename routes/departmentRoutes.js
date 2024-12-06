const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Get all departments
router.get('/', departmentController.getDepartments);

// Get a department by ID
router.get('/:id', departmentController.getDepartment);

// Add a new department
router.post('/', departmentController.addDepartment);

// Update a department by ID
router.put('/:id', departmentController.updateDepartment);

// Delete a department by ID
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
