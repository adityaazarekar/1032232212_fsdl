import React, { useState } from 'react';

function EmployeeForm({ employees, setEmployees }) {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setEmployeeName('');
    setEmployeeID('');
    setDepartmentName('');
    setPhoneNumber('');
    setJoiningDate('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const formData = {
      employeeName,
      employeeID,
      departmentName,
      phoneNumber,
      joiningDate,
    };

    try {
      const response = await fetch('http://localhost:4000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setEmployees([data, ...employees]);
        setSuccessMessage('Employee added successfully!');
        resetForm();
      } else {
        setErrorMessage(data.error || 'Failed to add employee');
      }
    } catch (err) {
      setErrorMessage('Network error: ' + err.message);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Add New Employee</h2>

      {successMessage && (
        <div className="success-message">✓ {successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message">⚠ {errorMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="employeeName">Employee Name</label>
            <input
              id="employeeName"
              type="text"
              placeholder="e.g. John Doe"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="employeeID">Employee ID</label>
            <input
              id="employeeID"
              type="text"
              placeholder="e.g. EMP001"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="departmentName">Department</label>
            <input
              id="departmentName"
              type="text"
              placeholder="e.g. Engineering"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              placeholder="e.g. 9876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={10}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="joiningDate">Joining Date</label>
            <input
              id="joiningDate"
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-green">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
