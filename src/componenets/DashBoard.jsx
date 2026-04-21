import React, { useEffect, useState } from 'react';
import { listEmployees } from '../Services/EmployeeService';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  // 🔢 Total employees
  const totalEmployees = employees.length;

  // 🏢 Group by department
  const departmentCount = {};

  employees.forEach(emp => {
    const dept = emp.department || "Other";
    departmentCount[dept] = (departmentCount[dept] || 0) + 1;
  });

  // 📊 Chart data
 const data = {
  labels: Object.keys(departmentCount),
  datasets: [
    {
      label: 'Employees by Department',
      data: Object.values(departmentCount),
      backgroundColor: [
        '#4CAF50',   // green
        '#2196F3',   // blue
        '#FF9800',   // orange
        '#E91E63',   // pink
        '#9C27B0',   // purple
        '#00BCD4',   // cyan
      ],
      borderWidth: 1
    }
  ]
};

  return (
    <div className='container mt-4'>

      <h2 className='text-center'>Dashboard</h2>

      {/* 🔢 Total */}
      <div className='card p-3 text-center mb-4'>
        <h4>Total Employees</h4>
        <h2>{totalEmployees}</h2>
      </div>

      {/* 📊 Charts */}
      <div className='row'>

        <div className='col-md-6'>
          <div className='card p-3'>
            <h5 className='text-center'>Department (Bar Chart)</h5>
            <Bar data={data} />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card p-3'>
            <h5 className='text-center'>Department (Pie Chart)</h5>
            <Pie data={data} />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;