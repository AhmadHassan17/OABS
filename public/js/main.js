// Function to check if the user is already registered
function checkRegistration() {
  // Check if the user is already logged in by looking for patient data in localStorage
  const patientData = localStorage.getItem("patient");

  if (patientData) {
    // Parse the patient data to use it
    const patient = JSON.parse(patientData);

    // Redirect to the booking page with patient data pre-populated
    window.location.href = `/html/bookAppointment.html?patient_id=${patient.patient_id}`;
  } else {
    // If the user is not logged in, redirect to the login page
    alert("Please log in to book an appointment.");
    openLoginModal(); // Assuming this opens the login modal
    
  }
}

function goToViewAppointments() {

  // Check if the user is already logged in by looking for patient data in localStorage
  const patientData = localStorage.getItem("patient");

  if (patientData) {
    // Parse the patient data to use it
    const patient = JSON.parse(patientData);

     // Redirect to the booking page with patient data pre-populated
     window.location.href = `/html/viewUserAppointments.html?patient_id=${patient.patient_id}&first_name=${patient.first_name}&last_name=${patient.last_name}`;
  } else {
    // If the user is not logged in, redirect to the login page
    alert("Please log in to book an appointment.");
    openLoginModal(); // Assuming this opens the login modal
    
  }
  
}

// Function to check the password for Clinic Management
function checkManagementPassword() {
  document.getElementById("passwordModal").style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
}

function checkPassword() {
  const password = document.getElementById("managementPassword").value;
  const correctPassword = "Waqas";
  if (password === correctPassword) {
    window.location.href = "html/managment.html";
  } else {
    alert("Incorrect password. Access denied.");
    closeModal("passwordModal");
  }
}

// Add event listener to the login form
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login"); // Corrected selector
  if (loginForm) {
    console.log("Login form found. Adding event listener...");
    loginForm.addEventListener("submit", handleLogin);
  } else {
    console.error("Login form not found.");
  }

  // Check if user is logged in and display info
  const patient = JSON.parse(localStorage.getItem("patient"));
  const userInfoSection = document.getElementById("userInfo");
  const userName = document.getElementById("userName");
  const userId = document.getElementById("userId");

  if (patient) {
    // Display user info
    userName.textContent = `${patient.first_name} ${patient.last_name}`;
    userId.textContent = patient.patient_id;
    userInfoSection.style.display = "block";
  } else {
    userInfoSection.style.display = "none";
  }

  // Logout functionality
  window.logout = function () {
    localStorage.removeItem("patient"); // Remove user data from localStorage
    window.location.reload(); // Reload the page to reflect the changes
  };
});

// Function to handle user login
async function handleLogin(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("Here");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/patients/login", {
      method: "POST", // Ensure the method matches your backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || "Invalid email or password.");
      return;
    }

    const data = await response.json();
    alert(data.message); // Show a success message.

    // Store user data locally (e.g., in localStorage)
    localStorage.setItem("patient", JSON.stringify(data.patient));

    // Reload page to update UI with logged-in user
    window.location.reload();
  } catch (err) {
    console.error("Error logging in:", err);
    alert("An error occurred. Please try again.");
  }
}
