const express = require('express');
const path = require('path'); // Import path module for handling file paths

const app = express();
const port = 3000; // Directly set the port

app.use(express.json()); // Middleware to parse JSON request bodies

// Serve static files (CSS, JS, Images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join for cross-platform compatibility

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the login page as the default route
});

// Import routes
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const billingRoutes = require('./routes/billingRoutes');
const clinicDetailsRoutes = require('./routes/clinicRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const doctorProfileRoutes = require('./routes/doctorProfileRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const patientRecordRoutes = require('./routes/patientRecordRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const timeslotRoutes = require('./routes/timeslotRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); 
const viewUserAppointments = require('./routes/viewUserAppointmentsRoutes'); 

// API Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/clinicdetails', clinicDetailsRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/doctorprofiles', doctorProfileRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/patientrecords', patientRecordRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/timeslots', timeslotRoutes);
app.use('/api/dashboard', dashboardRoutes); // Ensure this route is defined in dashboardRoutes
app.use('/api/viewAppointment', viewUserAppointments);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send('Something broke!'); // Send a generic error response
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});