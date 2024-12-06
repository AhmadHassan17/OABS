document.addEventListener("DOMContentLoaded", () => {
  const doctorDropdown = document.getElementById("doctor_id");
  const doctorDetailsContainer = document.getElementById("doctor-details");
  const timeSlotsContainer = document.getElementById("time-slots");
  const form = document.getElementById("appointment-form");
  const timeslotIdInput = document.getElementById("timeslot_id");

  const urlParams = new URLSearchParams(window.location.search);
  const patientId = urlParams.get("patient_id");
  console.log("pateint id", patientId);

  if (patientId) {
    // Prepopulate the patient ID field
    const patientIdInput = document.getElementById("patient_id"); // Make sure the ID matches your input field
    if (patientIdInput) {
      patientIdInput.value = patientId;
      patientIdInput.readOnly = true; // Make the field read-only
    }
  }


  // Populate doctors
  async function populateDoctors() {
    try {
      const response = await fetch("/api/doctors");
      if (!response.ok) throw new Error("Failed to fetch doctors");

      const doctors = await response.json();
      doctors.forEach((doctor) => {
        const option = document.createElement("option");
        option.value = doctor.doctor_id;
        option.textContent = `${doctor.first_name} ${doctor.last_name}`;
        doctorDropdown.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching doctors:", error);
      doctorDetailsContainer.innerHTML = "<p>Failed to load doctors. Try again later.</p>";
    }
  }

  // Display doctor details
  async function displayDoctorDetails() {
    const selectedDoctorId = doctorDropdown.value;

    if (!selectedDoctorId) {
      doctorDetailsContainer.innerHTML = "<p>Select a doctor to view details.</p>";
      return;
    }

    try {
      const response = await fetch(`/api/doctorprofiles/${selectedDoctorId}`);
      if (!response.ok) throw new Error("Failed to fetch doctor profile details");

      const doctorProfile = await response.json();
      doctorDetailsContainer.innerHTML = `
        <p><span class="label">Specialization:</span> ${doctorProfile.specialization || "N/A"}</p>
        <p><span class="label">Bio:</span> ${doctorProfile.bio || "N/A"}</p>
        <p><span class="label">Experience:</span> ${doctorProfile.experience || "N/A"} years</p>
      `;
    } catch (error) {
      console.error("Error fetching doctor profile details:", error);
      doctorDetailsContainer.innerHTML = "<p>Failed to load doctor profile details. Try again later.</p>";
    }
  }

  // Display available time slots with day_of_week
  async function displayTimeSlots() {
    const selectedDoctorId = doctorDropdown.value;

    // Clear previous time slots
    timeSlotsContainer.innerHTML = "<p>Loading time slots...</p>";
    timeslotIdInput.value = "";

    if (!selectedDoctorId) {
      timeSlotsContainer.innerHTML = "<p>Select a doctor to view available time slots.</p>";
      return;
    }

    try {
      const response = await fetch(`/api/timeslots/doctor/${selectedDoctorId}`);
      if (!response.ok) throw new Error("Failed to fetch time slots");

      const timeslots = await response.json();

      if (timeslots.length === 0) {
        timeSlotsContainer.innerHTML = "<p>No time slots available for this doctor.</p>";
        return;
      }

      timeSlotsContainer.innerHTML = ""; // Clear previous slots
      timeslots.forEach((timeslot) => {
        const slotDiv = document.createElement("div");
        slotDiv.className = "time-slot";
        slotDiv.innerHTML = `
          <strong>Day:</strong> ${timeslot.day_of_week}<br>
          <strong>Time:</strong> ${timeslot.start_time} - ${timeslot.end_time}
        `;
        slotDiv.dataset.timeslotId = timeslot.timeslot_id;

        slotDiv.addEventListener("click", () => {
          // Highlight the selected slot
          document.querySelectorAll(".time-slot.selected").forEach((slot) =>
            slot.classList.remove("selected")
          );
          slotDiv.classList.add("selected");

          // Update the hidden timeslot_id input field
          timeslotIdInput.value = timeslot.timeslot_id;
        });

        timeSlotsContainer.appendChild(slotDiv);
      });
    } catch (error) {
      console.error("Error fetching time slots:", error);
      timeSlotsContainer.innerHTML = "<p>Failed to load time slots. Try again later.</p>";
    }
  }

  // Handle form submission
  async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const appointmentData = {
      patient_id: formData.get("patientId"),
      doctor_id: formData.get("doctor_id"),
      appointment_date: formData.get("appointment_date"),
      timeslot_id: formData.get("timeslot_id"),
      status: "PendingPayment",
      description: formData.get("description"),
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) throw new Error("Failed to save appointment");

      const appointment = await response.json(); // Assuming the API returns the appointment object with an ID

      const appointmentid = appointment.appointment_id;

      console.log("appointment id is ");
      alert("Appointment saved successfully!");

      //window.location.href = `/html/addBill.html?appointmentId=${encodeURIComponent(appointmentid)}`
      // Redirect to addBill.html with the appointment ID as a query parameter
      //window.location.href = "/html/addBill.html?appointmentId=" + encodeURIComponent(appointment.appointment_id);


      form.reset(); // Clear the form
      timeSlotsContainer.innerHTML = "<p>Select a doctor to view available time slots.</p>";
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to save appointment. Please try again.");
    }
  }


  // Populate doctors on page load
  populateDoctors();

  // Attach event listeners
  doctorDropdown.addEventListener("change", () => {
    displayDoctorDetails();
    displayTimeSlots();
  });

  form.addEventListener("submit", handleFormSubmit);


});
