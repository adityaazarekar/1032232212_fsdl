import React, { useState } from 'react';
import UpdateForm from './UpdateForm';

function EmployeeList({ employees, setEmployees }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employees.filter((emp) =>
    emp.employeeID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (employeeID) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete employee ID: ${employeeID}?`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/employees/${employeeID}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        setEmployees(employees.filter((e) => e.employeeID !== employeeID));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete employee');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="card">
      <h2 className="card-title">Employee Records</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by Employee ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        id="search-employee-id"
      />

      {filteredEmployees.length === 0 ? (
        <p className="no-employees">No employees found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Joining Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.employeeName}</td>
                  <td>{emp.employeeID}</td>
                  <td>{emp.departmentName}</td>
                  <td>{emp.phoneNumber}</td>
                  <td>{formatDate(emp.joiningDate)}</td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="btn btn-blue"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-red"
                        onClick={() => handleDelete(emp.employeeID)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedEmployee && (
        <UpdateForm
          employee={selectedEmployee}
          employees={employees}
          setEmployees={setEmployees}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

export default EmployeeList;
