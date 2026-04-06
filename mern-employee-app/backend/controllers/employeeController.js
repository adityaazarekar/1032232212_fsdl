const Employee = require('../models/employeeModel');

// GET all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET employee by MongoDB _id
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create new employee
const createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE employee by employeeID (string)
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeID: req.params.id });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH update employee by MongoDB _id
const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
