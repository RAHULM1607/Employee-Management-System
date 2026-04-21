package com.example.ems.service;

import com.example.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employee);

    EmployeeDto getEmployeeByid(Long employeeId);

    List<EmployeeDto> getAllEmployees();


    EmployeeDto updateEmployee(Long employeeId,EmployeeDto employee);

    void deleteEmployee(Long employeeId);
}
