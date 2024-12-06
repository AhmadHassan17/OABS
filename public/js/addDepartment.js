document.addEventListener("DOMContentLoaded", () => {
    const departmentForm = document.getElementById("departmentForm");

    // Handle form submission
    departmentForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const departmentName = document.getElementById("name").value;
        const description = document.getElementById("description").value;

        // Create request payload
        const departmentData = {
            name: departmentName,
            description: description,
        };

        try {
            // Send POST request to add department
            const response = await fetch("/api/departments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(departmentData),
            });

            if (response.ok) {
                // Success
                alert("Department added successfully!");
                departmentForm.reset(); // Clear form
            } else {
                // Error handling
                const errorData = await response.json();
                alert(`Error: ${errorData.error || "Failed to add department"}`);
            }
        } catch (error) {
            console.error("Error adding department:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    });
});
