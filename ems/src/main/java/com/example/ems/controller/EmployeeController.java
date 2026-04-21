package com.example.ems.controller;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;
import com.example.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")

@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private EmployeeService employeeService;
    
    //build add employee Rest API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee=employeeService.createEmployee(employeeDto);
        return new  ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //build getemployee rest Api
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto=employeeService.getEmployeeByid(employeeId);
        return new  ResponseEntity<>(employeeDto,HttpStatus.OK);

    }
    //build get all employees

    @GetMapping
    public ResponseEntity <List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees= employeeService.getAllEmployees();
        return new  ResponseEntity<>(employees,HttpStatus.OK);
    }

    //build update employee api
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,@RequestBody EmployeeDto updatedEmployee){
        EmployeeDto employeeDto=employeeService.updateEmployee(employeeId,updatedEmployee);
        return new ResponseEntity<>(employeeDto,HttpStatus.OK);
    }
    //build delete employee api
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long EmployeeId){
        employeeService.deleteEmployee(EmployeeId);
        return new ResponseEntity<>("Employee has been deleted",HttpStatus.OK);
    }
}
