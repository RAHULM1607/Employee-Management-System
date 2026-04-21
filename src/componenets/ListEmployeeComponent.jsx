import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import '../css/ListEmployee.css';
import { toast } from 'react-toastify';

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');   // ✅ NEW
  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch(error => {
        toast.error("Failed to load employees ❌");
        console.error(error);
      });
  }

  function AddNewEmployee() {
    navigate('/add-employee');
  }

  function UpdateEmp(id) {
    navigate(`/update-employee/${id}`);
  }

  function DeleteEmp(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteEmployee(id)
        .then(() => {
          toast.success("Employee deleted 🗑️");
          getAllEmployees();
        })
        .catch(error => {
          toast.error("Delete failed ❌");
          console.error(error);
        });
    }
  }

  // 🔍 SEARCH + FILTER
  const filteredEmployees = employees.filter(emp =>
    (
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
    ) &&
    (filterDept === '' || emp.department === filterDept)
  );

  // 📄 PAGINATION
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;

  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDept]);

  return (
    <div className='container'>

      <h2 className='text-center'>Employee List</h2>

      {/* 🔘 Buttons */}
      <div className='mb-2'>
        <button className='btn btn-primary me-2' onClick={AddNewEmployee}>
          Add Employee
        </button>

        
      </div>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔽 FILTER DROPDOWN */}
      <select
        className="form-select mb-3"
        value={filterDept}
        onChange={(e) => setFilterDept(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="Frontend">Frontend</option>
        <option value="HR">HR</option>
        <option value="Backend">Backend</option>
        <option value="Marketing">Marketing</option>
      </select>

      {/* 📊 TABLE */}
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department || "N/A"}</td>
                  <td>
                    <button
                      className='btn btn-info'
                      onClick={() => UpdateEmp(employee.id)}
                    >
                      Update
                    </button>

                    <button
                      className='btn btn-danger ms-2'
                      onClick={() => DeleteEmp(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No results found
                </td>
              </tr>
            )
          }
        </tbody>
      </table>

      {/* 📄 PAGINATION */}
      <div className='text-center'>
        {
          [...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-sm m-1 ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
            >
              {index + 1}
            </button>
          ))
        }
      </div>

    </div>
  );
};

export default ListEmployeeComponent;