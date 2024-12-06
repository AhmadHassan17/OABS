const connection = require('../db/connection');

// Get all departments
const getAllDepartments = (callback) => {
  connection.query('SELECT * FROM Departments', (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get department by ID
const getDepartmentById = (departmentId, callback) => {
  connection.query('SELECT * FROM Departments WHERE department_id = ?', [departmentId], (err, result) => {
    if (err) {
      console.error('Error fetching department:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Add a new department
const addDepartment = (department, callback) => {
  const { name, description } = department;
  connection.query(
    'INSERT INTO Departments (name, description) VALUES (?, ?)',
    [name, description],
    (err, result) => {
      if (err) {
        console.error('Error adding department:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Update department details
const updateDepartment = (departmentId, updatedFields, callback) => {
  const { name, description } = updatedFields;
  connection.query(
    'UPDATE Departments SET name = ?, description = ? WHERE department_id = ?',
    [name, description, departmentId],
    (err, result) => {
      if (err) {
        console.error('Error updating department:', err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete a department
const deleteDepartment = (departmentId, callback) => {
  connection.query('DELETE FROM Departments WHERE department_id = ?', [departmentId], (err, result) => {
    if (err) {
      console.error('Error deleting department:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
