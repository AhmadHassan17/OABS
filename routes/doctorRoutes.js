const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Get all doctors
router.get('/', doctorController.getDoctors);

// Get doctor by ID
router.get('/:id', doctorController.getDoctor);

// Add a new doctor
router.post('/', doctorController.addDoctor);

module.exports = router;
