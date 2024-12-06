document.addEventListener('DOMContentLoaded', () => {
  fetchDashboardStats();  // Fetch the dashboard stats once the page is loaded
});

// frontend JavaScript
const fetchDashboardStats = () => {
  fetch('/api/dashboard/stats') // Ensure the correct API endpoint
    .then((response) => response.json())
    .then((data) => {
      console.log('Dashboard stats:', data);
      // Update the UI with the fetched data
      updateDashboardUI(data);
    })
    .catch((err) => {
      console.error('Error fetching stats:', err);
    });
};


// const fetchDashboardStats = () => {
//   // Call the backend API endpoint to fetch stats
//   fetch('/api/stats')  // Adjust the URL to match your backend route
//     .then(response => response.json())
//     .then(stats => {
//       console.log('Dashboard Stats:', stats);  // Log the stats to console (optional)
//       updateDashboardUI(stats);  // Update the UI with the fetched stats
//     })
//     .catch(error => {
//       console.error('Error fetching dashboard stats:', error);  // Handle any fetch errors
//     });
// };

const updateDashboardUI = (stats) => {
  // Update the UI with the stats
  document.getElementById('totalAppointments').textContent = stats.totalAppointments;
  document.getElementById('totalPayments').textContent = `$${stats.totalPayments}`;
  document.getElementById('totalDoctors').textContent = stats.totalDoctors;
};
