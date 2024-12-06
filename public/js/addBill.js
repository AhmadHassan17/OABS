document.addEventListener("DOMContentLoaded", () => {
    // Get references to the form and its inputs
    const billingForm = document.querySelector("form");
    const appointmentIdInput = document.getElementById("appointment_id");
    const patientIdInput = document.getElementById("patient_id");
    const amountInput = document.getElementById("amount");
    const paymentDateInput = document.getElementById("payment_date");
    const paymentStatusSelect = document.getElementById("payment_status");
  
    // Handle form submission
    billingForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Gather form data
      const billingData = {
        appointment_id: appointmentIdInput.value.trim(),
        patient_id: patientIdInput.value.trim(),
        amount: parseFloat(amountInput.value.trim()),
        payment_date: paymentDateInput.value.trim(),
        payment_status: paymentStatusSelect.value.trim(),
      };
  
      try {
        // Send a POST request to the billing API
        const billingResponse = await fetch("/api/billing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(billingData),
        });
  
        // Handle billing response
        if (billingResponse.ok) {
          const billingResult = await billingResponse.json();
          alert(`Billing record added successfully! Billing ID: ${billingResult.billingId}`);
  
          // Update appointment status to "Scheduled"
          const appointmentUpdateResponse = await fetch(`/api/appointments/${billingData.appointment_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Scheduled" }), // Assuming `status` is the correct field name in the database
          });
  
          if (appointmentUpdateResponse.ok) {
            const appointmentUpdateResult = await appointmentUpdateResponse.json();
            alert("Appointment status updated to 'Scheduled' successfully!");
          } else {
            const errorData = await appointmentUpdateResponse.json();
            alert(`Error updating appointment status: ${errorData.error || "Failed to update appointment status."}`);
          }
  
          billingForm.reset(); // Reset the form
        } else {
          const errorData = await billingResponse.json();
          alert(`Error: ${errorData.error || "Failed to add billing record."}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  });
  