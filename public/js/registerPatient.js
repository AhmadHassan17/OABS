document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    
  
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Collect form data
      const formData = {
        first_name: document.getElementById("first_name").value.trim(),
        last_name: document.getElementById("last_name").value.trim(),
        date_of_birth: document.getElementById("date_of_birth").value,
        gender: document.getElementById("gender").value,
        contact_number: document.getElementById("contact_number").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
      };
  
      // Basic validation
      if (!formData.first_name || !formData.last_name || !formData.date_of_birth || !formData.password) {
        alert("First Name, Last Name, Date of Birth and Password are required!");
        return;
      }
  
      try {
        // Send POST request to the API
        const response = await fetch("/api/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const result = await response.json();
          const patientId = result.patientId;
          
          alert(`Patient registered successfully! Patient ID: ${result.patientId}`);

          // Redirect to bookAppointment.html with patientId as a query parameter
          window.location.href = `bookAppointment.html?patient_id=${encodeURIComponent(patientId)}`
          form.reset(); // Clear the form
        } else {
          const error = await response.json();
          alert(`Failed to register patient: ${error.error}`);
        }
      } catch (error) {
        console.error("Error registering patient:", error);
        alert("An error occurred while registering the patient.");
      }
    });
  });
  