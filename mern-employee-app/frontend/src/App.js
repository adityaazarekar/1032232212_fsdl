import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/employees');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch employees');
        }
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Employee Management System</h1>
      <p className="app-subtitle">MERN Stack CRUD Application &mdash; FSD Lab 07</p>

      {loading && <p className="loading-text">Loading employees...</p>}

      {error && !loading && (
        <div className="error-message">⚠ {error}</div>
      )}

      {!loading && (
        <>
          <EmployeeForm employees={employees} setEmployees={setEmployees} />
          <EmployeeList employees={employees} setEmployees={setEmployees} />
        </>
      )}
    </div>
  );
}

export default App;
