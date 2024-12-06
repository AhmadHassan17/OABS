const express = require('express');
const router = express.Router();
const timeslotController = require('../controllers/timeslotController');

// Get timeslots by doctor ID - Place this BEFORE the route with :timeslotId
router.get('/doctor/:doctorId', timeslotController.getTimeslotsByDoctorId);

// Get all timeslots
router.get('/', timeslotController.getAllTimeslots);

// Get a timeslot by ID
router.get('/:timeslotId', timeslotController.getTimeslotById);

// Add a new timeslot
router.post('/', timeslotController.addTimeslot);

// Update a timeslot by timeslot ID
router.put('/:timeslotId', timeslotController.updateTimeslot);

// Delete a timeslot by timeslot ID
router.delete('/:timeslotId', timeslotController.deleteTimeslot);

module.exports = router;
