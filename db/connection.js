const mysql = require('mysql2');

// Directly define the connection settings
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ali@abbas',
  database: 'onlineAppointmentSystem'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = connection;





