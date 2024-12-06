document.addEventListener("DOMContentLoaded", () => {
  const doctorDropdown = document.getElementById("doctor_id");
  const doctorDetailsContainer = document.getElementById("doctorDetailsContainer");
  const form = document.getElementById("doctorProfileForm");

  // Populate doctors dropdown on page load
  populateDoctors();

  // Handle form submission to save or update doctor profile
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const doctorProfile = {
      doctor_id: formData.get("doctor_id"),
      bio: formData.get("bio"),
      experience: formData.get("experience"),
      specialization: formData.get("specialization")
    };

    try {
      const doctorId = formData.get("doctor_id");
      
      // First, check if the doctor already has a profile
      const response = await fetch(`/api/doctorprofiles/${doctorId}`);
      console.log(doctorId);
      if (response.ok) {
        // If a profile exists, update it
        
        const existingProfile = await response.json();
        console.log("Existing Profile:", existingProfile.profile_id);
        

        const updateResponse = await fetch(`/api/doctorprofiles/${existingProfile.profile_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(doctorProfile)
        });

        if (!updateResponse.ok) throw new Error("Failed to update doctor profile");

        const updatedProfile = await updateResponse.json();
        alert("Doctor profile updated successfully!");

        // Optionally, display the updated profile data
        displayDoctorProfile(updatedProfile.doctor_id);
      } else {
        // If no profile exists, create a new one
        const createResponse = await fetch("/api/doctorprofiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(doctorProfile)
        });

        if (!createResponse.ok) throw new Error("Failed to add doctor profile");

        const profileData = await createResponse.json();
        alert("Doctor profile added successfully!");

        // Optionally, display the newly saved profile data
        displayDoctorProfile(profileData.doctor_id);
      }

      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error saving or updating doctor profile:", error);
      alert("Failed to save or update doctor profile. Please try again.");
    }
  });

  // Populate the doctor dropdown with existing doctors
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

  // Display doctor profile details when a doctor is selected
  async function displayDoctorProfile(doctorId) {
    try {
      const response = await fetch(`/api/doctorprofiles/${doctorId}`);
      if (!response.ok) throw new Error("Failed to fetch doctor profile details");

      const doctorProfile = await response.json();
      doctorDetailsContainer.innerHTML = `
        <h2>Doctor Profile Details</h2>
        <p><strong>Specialization:</strong> ${doctorProfile.specialization || "N/A"}</p>
        <p><strong>Bio:</strong> ${doctorProfile.bio || "N/A"}</p>
        <p><strong>Experience:</strong> ${doctorProfile.experience || "N/A"} years</p>
      `;
    } catch (error) {
      console.error("Error fetching doctor profile details:", error);
      doctorDetailsContainer.innerHTML = "<p>We have not added a profile yet</p>";
    }
  }

  // If a doctor is selected, display their profile details
  doctorDropdown.addEventListener("change", () => {
    const selectedDoctorId = doctorDropdown.value;
    if (selectedDoctorId) {
      displayDoctorProfile(selectedDoctorId);
    } else {
      doctorDetailsContainer.innerHTML = "<p>Select a doctor to view details.</p>";
    }
  });
});
