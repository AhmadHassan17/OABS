// Function to load appointments from the API
const loadAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
  
      const appointments = await response.json();
      populateAppointmentsTable(appointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
      alert('Failed to load appointments. Please try again.');
    }
  };
  
  const filterAppointments = async () => {
    const patientId = document.getElementById('patientFilter').value;
    const appointmentDate = document.getElementById('dateFilter').value;
  
    try {
      const queryParams = new URLSearchParams();
      if (patientId) queryParams.append('patientId', patientId);
      if (appointmentDate) queryParams.append('appointmentDate', appointmentDate);
  
      const response = await fetch(`/api/appointments/filter?${queryParams.toString()}`);
      
      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text(); // Get error response text
        console.error('API Error:', errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      const filteredAppointments = await response.json();
  
      // Validate the response
      if (!Array.isArray(filteredAppointments)) {
        throw new Error('Unexpected API response format');
      }
  
      populateAppointmentsTable(filteredAppointments);
    } catch (error) {
      // Log the exact error for debugging
      console.error('Error filtering appointments:', error);
      alert('Error filtering appointments. Please try again.');
    }
  };
  
  // Function to populate the appointments table
  const populateAppointmentsTable = (appointments) => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows
  
    appointments.forEach((appointment) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${appointment.appointment_id}</td>
        <td>${appointment.doctor_id}</td>
        <td>${appointment.patient_id}</td>
        <td>${appointment.appointment_date}</td>
        <td>${appointment.timeslot_id || 'N/A'}</td>
        <td>${appointment.status}</td>
        <td>
          <button class="add-prescription-button" data-id="${appointment.appointment_id}">
            Add Prescription
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  

    
    // Re-apply event listeners for the new rows
    attachPrescriptionButtonEvents();
  };
  

// Function to handle "Add Prescription" button clicks
const attachPrescriptionButtonEvents = () => {
  document.querySelectorAll('.add-prescription-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const appointmentId = event.target.dataset.id;

      // Find the corresponding table row and extract doctorId and patientId
      const row = event.target.closest('tr');
      const doctorId = row.children[1].textContent; // Assuming doctor_id is the second <td>
      const patientId = row.children[2].textContent; // Assuming patient_id is the third <td>

      // Redirect to the new page with the required parameters
      window.location.href = `/html/addprescription.html?appointmentId=${appointmentId}&doctorId=${doctorId}&patientId=${patientId}`;
    });
  });
};

  
  // Event listeners
  document.getElementById('filterButton').addEventListener('click', filterAppointments);
  
  // Load appointments on page load
  loadAppointments();
  