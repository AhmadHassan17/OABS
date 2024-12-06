// Base URL for API
const BASE_URL = 'http://localhost:3000/api'; // Adjust the URL as needed

// Get patientId from URL
const urlParams = new URLSearchParams(window.location.search);
const patientId = urlParams.get('patient_id');
const first_name = urlParams.get('first_name');
const last_name = urlParams.get('last_name');

if(first_name && last_name){
    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent=`${first_name} ${last_name}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const callButton = document.getElementById('call-btn');

    callButton.addEventListener('click', () => {
        startCall();
    });
});

function startCall() {
    console.log("Start Call button clicked");
    const ip = "192.168.0.105";

    // Open the URL in a new window or tab
    window.open(`https://${ip}:3000`, '_blank');
}



// Elements
const appointmentsContainer = document.querySelector('.appointments');
const prescriptionsContainer = document.querySelector('.prescriptions');

// Fetch and display appointments
async function fetchAppointments() {
    try {
        const response = await fetch(`/api/viewAppointment/patient/${patientId}`);
        const appointments = await response.json();

        if (response.ok) {
            appointmentsContainer.innerHTML = '<h2>Your Appointments</h2>'; // Clear container
            appointments.forEach(appointment => {
                const card = document.createElement('div');
                card.className = 'appointment-card';
                card.innerHTML = `
                    
                    <p><strong>Appointment No:</strong> ${appointment.appointment_id}</p>
                    <p><strong>Doctor:</strong> ${appointment.doctor_id}</p>
                    <p><strong>Timeslot:</strong> ${appointment.timeslot_id}</p>
                    <p><strong>Appointment Date:</strong> ${appointment.appointment_date}</p>
                    <p><strong>Status:</strong> ${appointment.status}</p>
                    <div class="card-buttons">
                        <button class="cancel-btn" data-id="${appointment.appointment_id}">Cancel</button>
                        <button class="call-btn">Call</button>
                    </div>
                `;
                appointmentsContainer.appendChild(card);
            });

            attachCancelHandlers(); // Add event listeners for Cancel buttons
            attachCallHandlers();

        } else {
            console.error('Failed to fetch appointments:', appointments.error);
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// Fetch and display prescriptions
async function fetchPrescriptions() {
    try {
        const response = await fetch(`/api/viewAppointment/prescriptions/${patientId}`);
        const prescriptions = await response.json();

        if (response.ok) {
            prescriptionsContainer.innerHTML = '<h2>Your Prescription</h2>'; // Clear container
            prescriptions.forEach(prescription => {
                const card = document.createElement('div');
                card.className = 'prescription-card';
                card.innerHTML = `
                    <p><strong>For Appointment No:</strong> ${prescription.appointment_id}</p>
                    <p><strong>Date Issued:</strong> ${prescription.date_issued}</p>
                    <p><strong>Medication:</strong> ${prescription.medication}</p>
                    <p><strong>Dosage Instructions:</strong> ${prescription.dosage_instructions}</p>
                `;
                prescriptionsContainer.appendChild(card);
            });
        } else {
            console.error('Failed to fetch prescriptions:', prescriptions.error);
        }
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
    }
}

// Attach event handlers for cancel buttons
function attachCancelHandlers() {
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    cancelButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const appointmentId = event.target.dataset.id;
            try {
                const response = await fetch(`/api/viewAppointment/cancel/${appointmentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();

                if (response.ok) {
                    alert(result.message);
                    fetchAppointments(); // Refresh appointments
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error('Error canceling appointment:', error);
                alert('Failed to cancel appointment. Please try again later.');
            }
        });
    });
}

function attachCallHandlers() {
    const callButtons = document.querySelectorAll('.call-btn');
    callButtons.forEach(button => {
        button.addEventListener('click', () => {
            startCall();
        });
    });
}

// Initialize page
function init() {
    if (patientId) {
        fetchAppointments();
        fetchPrescriptions();
        
    } else {
        console.error('Patient ID not found in URL.');
    }
}

// Run initialization
init();
