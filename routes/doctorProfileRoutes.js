const express = require('express');
const router = express.Router();
const doctorProfileController = require('../controllers/doctorProfileController');

// Get doctor profile by doctor ID
router.get('/:doctorId', doctorProfileController.getDoctorProfile);

// Add a new doctor profile
router.post('/', doctorProfileController.addDoctorProfile);

// Update a doctor profile by ID
router.put('/:profileId', doctorProfileController.updateDoctorProfile);

// Delete a doctor profile by ID
router.delete('/:profileId', doctorProfileController.deleteDoctorProfile);

module.exports = router;
