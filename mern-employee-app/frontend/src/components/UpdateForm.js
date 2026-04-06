import React, { useState } from 'react';

function UpdateForm({ employee, setEmployees, employees, onClose }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0];
  };

  const [employeeName, setEmployeeName] = useState(employee.employeeName);
  const [employeeID, setEmployeeID] = useState(employee.employeeID);
  const [departmentName, setDepartmentName] = useState(employee.departmentName);
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  const [joiningDate, setJoiningDate] = useState(formatDate(employee.joiningDate));
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const updatedData = {
      employeeName,
      employeeID,
      departmentName,
      phoneNumber,
      joiningDate,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/employees/${employee._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmployees(
          employees.map((emp) => (emp._id === employee._id ? data : emp))
        );
        onClose();
      } else {
        setErrorMessage(data.error || 'Failed to update employee');
      }
    } catch (err) {
      setErrorMessage('Network error: ' + err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Update Employee</h2>

        {errorMessage && (
          <div className="error-message">⚠ {errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="update-employeeName">Employee Name</label>
              <input
                id="update-employeeName"
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="update-employeeID">Employee ID</label>
              <input
                id="update-employeeID"
                type="text"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="update-departmentName">Department</label>
              <input
                id="update-departmentName"
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="update-phoneNumber">Phone Number</label>
              <input
                id="update-phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="update-joiningDate">Joining Date</label>
              <input
                id="update-joiningDate"
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-gray"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-blue">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
