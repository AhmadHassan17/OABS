document.addEventListener("DOMContentLoaded", () => {
  // Get references to form and inputs
  const doctorForm = document.querySelector("form");
  const firstNameInput = document.getElementById("first_name");
  const lastNameInput = document.getElementById("last_name");
  const departmentSelect = document.getElementById("department_id");
  const clinicSelect = document.getElementById("clinic_id");
  const contactNumberInput = document.getElementById("contact_number");
  const emailInput = document.getElementById("email");


  // Function to load clinics into the dropdown
const loadClinics = async () => {
  try {
      // Fetch clinics from the backend
      const response = await fetch("/api/ClinicDetails");
      if (response.ok) {
          const clinics = await response.json();

          // Populate the clinic dropdown
          clinicSelect.innerHTML = ""; // Clear existing options
          clinicSelect.innerHTML = '<option value="">Select Clinic</option>';
          clinics.forEach((clinic) => {
              const option = document.createElement("option");
              option.value = clinic.clinic_id; // Assuming the backend sends `clinic_id`
              option.textContent = clinic.name; // Assuming the backend sends `clinic_name`
              clinicSelect.appendChild(option);
          });
      } else {
          console.error("Failed to fetch clinics.");
          alert("Error loading clinics. Please try again later.");
      }
  } catch (error) {
      console.error("Error loading clinics:", error);
      alert("An error occurred while fetching clinics.");
  }
};


  // Function to load departments into the dropdown
  const loadDepartments = async () => {
      try {
          // Fetch departments from the backend
          const response = await fetch("/api/departments");
          if (response.ok) {
              const departments = await response.json();

              // Populate the department dropdown
              departmentSelect.innerHTML = ""; // Clear existing options
              departmentSelect.innerHTML = '<option value="">Select Department</option>';
              departments.forEach((dept) => {
                  const option = document.createElement("option");
                  option.value = dept.department_id; // Assuming the backend sends `id`
                  option.textContent = dept.name; // Assuming the backend sends `department_name`
                  departmentSelect.appendChild(option);
              });
          } else {
              console.error("Failed to fetch departments.");
              alert("Error loading departments. Please try again later.");
          }
      } catch (error) {
          console.error("Error loading departments:", error);
          alert("An error occurred while fetching departments.");
      }
  };

  // Load departments on page load
  loadDepartments();
  loadClinics();

  doctorForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    if (!clinicSelect.value) {
        alert("Please select a clinic.");
        return; // Stop form submission
    }

    // Gather form data
    const doctorData = {
        first_name: firstNameInput.value.trim(),
        last_name: lastNameInput.value.trim(),
        department_id: departmentSelect.value,
        clinic_id: clinicSelect.value,
        contact_number: contactNumberInput.value.trim(),
        email: emailInput.value.trim(),
    };

    try {
        // Send a POST request to the API endpoint
        const response = await fetch("/api/doctors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(doctorData),
        });

        // Handle response
        if (response.ok) {
            const result = await response.json();
            alert(`Doctor added successfully! ID: ${result.insertId}`);
            doctorForm.reset(); // Reset the form after success
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "Failed to add doctor."}`);
        }
    } catch (error) {
        console.error("Error adding doctor:", error);
        alert("An error occurred while adding the doctor. Please try again.");
    }
});

});
