
// Select the form and submit button
const form = document.getElementById("prescriptionForm");
const submitButton = document.getElementById("submitButton");

// Attach an event listener to the submit button
submitButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Gather form data
    const prescriptionData = {
        appointment_id: document.getElementById("appointment_id").value.trim(),
        doctor_id: document.getElementById("doctor_id").value.trim(),
        patient_id: document.getElementById("patient_id").value.trim(),
        date_issued: document.getElementById("date_issued").value,
        medication: document.getElementById("medication").value.trim(),
        dosage_instructions: document.getElementById("dosage_instructions").value.trim(),
    };

    // Validate form data (ensure required fields are filled)
    if (!prescriptionData.appointment_id || !prescriptionData.doctor_id || !prescriptionData.patient_id || !prescriptionData.date_issued) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        // Send the data to the backend API using Fetch
        const response = await fetch("/api/prescriptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prescriptionData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save prescription");
        }

        // Show success message and clear the form
        alert("Prescription added successfully!");
        form.reset();
    } catch (error) {
        console.error("Error adding prescription:", error);
        alert(error.message || "An error occurred while adding the prescription.");
    }
});

