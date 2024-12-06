const timeslotModel = require('../models/timeslotModel');

// Get all timeslots
const getAllTimeslots = (req, res) => {
  timeslotModel.getAllTimeslots((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch timeslots' });
    }
    res.json(result);
  });
};

// Get a timeslot by ID
const getTimeslotById = (req, res) => {
  const timeslotId = req.params.timeslotId;
  timeslotModel.getTimeslotById(timeslotId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch timeslot' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Timeslot not found' });
    }
    res.json(result[0]);
  });
};

// Add a new timeslot
const addTimeslot = (req, res) => {
  const newTimeslot = req.body;
  timeslotModel.addTimeslot(newTimeslot, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add timeslot' });
    }
    res.status(201).json({ message: 'Timeslot added', timeslotId: result.insertId });
  });
};

// Update a timeslot
const updateTimeslot = (req, res) => {
  const timeslotId = req.params.timeslotId;
  const updatedFields = req.body;
  timeslotModel.updateTimeslot(timeslotId, updatedFields, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update timeslot' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Timeslot not found' });
    }
    res.json({ message: 'Timeslot updated' });
  });
};

// Delete a timeslot
const deleteTimeslot = (req, res) => {
  const timeslotId = req.params.timeslotId;
  timeslotModel.deleteTimeslot(timeslotId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete timeslot' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Timeslot not found' });
    }
    res.json({ message: 'Timeslot deleted' });
  });
};


// Get timeslots by doctor ID
const getTimeslotsByDoctorId = (req, res) => {
  const doctorId = req.params.doctorId;
  
  timeslotModel.getTimeslotsByDoctorId(doctorId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch timeslots' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No timeslots found for this doctor' });
    }
    
    res.json(results);
  });
};



module.exports = {
  getAllTimeslots,
  getTimeslotById,
  addTimeslot,
  updateTimeslot,
  deleteTimeslot,
  getTimeslotsByDoctorId
};
