document.addEventListener("DOMContentLoaded", () => {
    // Get references to the form and its inputs
    const timeslotForm = document.querySelector("form");
    const doctorDropdown = document.getElementById("doctor_id");
    const dayOfWeekSelect = document.getElementById("day_of_week");
    const startTimeInput = document.getElementById("start_time");
    const endTimeInput = document.getElementById("end_time");

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
            alert("Failed to load doctors. Please try again later.");
        }
    }

    // Handle form submission
    timeslotForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        // Gather form data
        const timeslotData = {
            doctor_id: doctorDropdown.value,
            day_of_week: dayOfWeekSelect.value,
            start_time: startTimeInput.value,
            end_time: endTimeInput.value,
        };

        // Validate time inputs
        if (new Date(`1970-01-01T${timeslotData.start_time}`) >= new Date(`1970-01-01T${timeslotData.end_time}`)) {
            alert("End time must be later than start time.");
            return;
        }

        try {
            // Send a POST request to the API endpoint
            const response = await fetch("/api/timeslots", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(timeslotData),
            });

            // Handle the response
            if (response.ok) {
                const result = await response.json();
                alert(`Time slot added successfully! ID: ${result.timeslot_id}`);
                timeslotForm.reset(); // Reset the form after success
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "Failed to add time slot."}`);
            }
        } catch (error) {
            console.error("Error adding time slot:", error);
            alert("An error occurred while adding the time slot. Please try again.");
        }
    });

    // Populate the doctor dropdown on page load
    populateDoctors();
});
