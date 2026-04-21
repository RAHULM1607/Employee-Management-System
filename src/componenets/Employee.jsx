import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/employee.css';
import { toast } from 'react-toastify';

const Employee = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        department: '',
        email: ''
    });

    // 🔍 VALIDATION
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim() === '') {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim() === '') {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (department.trim() === '') {
            errorsCopy.department = 'Department is required';
            valid = false;
        }

        if (email.trim() === '') {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    // 🧠 TITLE
    function pageTitle() {
        return (
            <h2 className='text-center'>
                {id ? "Update Employee" : "Add Employee"}
            </h2>
        );
    }

    // 🔄 LOAD DATA (EDIT MODE)
    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setDepartment(response.data.department);
                    setEmail(response.data.email);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    // 🚀 SAVE OR UPDATE
    function saveOrUpdate(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email, department };

            if (id) {
                updateEmployee(id, employee)
                    .then(() => {
                        toast.success("Employee updated successfully ✏️");
                        navigate('/employees');
                    })
                    .catch(() => {
                        toast.error("Update failed ❌");
                    });
            } else {
                createEmployee(employee)
                    .then(() => {
                        toast.success("Employee added successfully ✅");
                        navigate('/employees');
                    })
                    .catch(() => {
                        toast.error("Creation failed ❌");
                    });
            }
        }
    }

    return (
        <div className='container'>
            <br /><br />

            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>

                    {pageTitle()}

                    <div className='card-body'>
                        <form onSubmit={saveOrUpdate}>

                            <div className='form-group mb-2'>
                                <label>First Name:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Last Name:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Department:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Email:</label>
                                <input
                                    type='email'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button type="submit" className='btn btn-success'>
                                Submit
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;