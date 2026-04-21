package com.example.ems.service;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;
import com.example.ems.exception.ResourceNotFoundException;
import com.example.ems.mapper.EmployeeMapper;
import com.example.ems.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EmployeeServiceImplementation implements EmployeeService {
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto){
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee createEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(createEmployee);
    }

    @Override
    public EmployeeDto getEmployeeByid(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId)
                .orElseThrow(()->new ResourceNotFoundException("Employee does not exist with given id: "+employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees=employeeRepository.findAll();

        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto UpdateEmployee) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee does not exist with given id: "+employeeId));
        employee.setFirstName(UpdateEmployee.getFirstName());
        employee.setLastName(UpdateEmployee.getLastName());
        employee.setDepartment(UpdateEmployee.getDepartment());
        employee.setEmail(UpdateEmployee.getEmail());

        Employee updateEmployee=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updateEmployee);

    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee does not exist with given id: "+employeeId));
        employeeRepository.deleteById(employeeId);

    }


}
