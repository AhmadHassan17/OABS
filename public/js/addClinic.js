document.addEventListener("DOMContentLoaded", () => {
    // Get a reference to the form and its inputs
    const clinicForm = document.getElementById("clinicForm");
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const contactNumberInput = document.getElementById("contact_number");
    const emailInput = document.getElementById("email");
    const websiteInput = document.getElementById("website");

    // Handle form submission
    clinicForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const clinicData = {
            name: nameInput.value.trim(),
            address: addressInput.value.trim(),
            contact_number: contactNumberInput.value.trim(),
            email: emailInput.value.trim(),
            website: websiteInput.value.trim(),
        };

        try {
            // API call to add a clinic
            const response = await fetch("/api/clinicdetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clinicData),
            });

            if (response.ok) {
                const result = await response.json();
                alert("Clinic added successfully!");
                clinicForm.reset(); // Clear form inputs on success
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "Failed to add clinic."}`);
            }
        } catch (error) {
            console.error("Error adding clinic:", error);
            alert("An error occurred while adding the clinic. Please try again.");
        }
    });
});
