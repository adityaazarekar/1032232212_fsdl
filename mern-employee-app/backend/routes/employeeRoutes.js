const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require('../controllers/employeeController');

// GET all employees
router.get('/', getAllEmployees);

// GET single employee by MongoDB _id
router.get('/:id', getEmployeeById);

// POST create new employee
router.post('/', createEmployee);

// DELETE employee by employeeID string
router.delete('/:id', deleteEmployee);

// PATCH update employee by MongoDB _id
router.patch('/:id', updateEmployee);

module.exports = router;
