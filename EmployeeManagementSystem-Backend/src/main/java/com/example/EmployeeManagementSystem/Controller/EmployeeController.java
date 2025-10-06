package com.example.EmployeeManagementSystem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.EmployeeManagementSystem.Entity.Employee;
import com.example.EmployeeManagementSystem.Service.EmployeeService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/employee")
public class EmployeeController {
    
    @Autowired
    private EmployeeService service;

    // ✅ Create employee
    @PostMapping("/create")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        return new ResponseEntity<>(service.createEmployee(employee), HttpStatus.CREATED);
    }

    // ✅ Get employee by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getById(@PathVariable long id) {
        Employee employee = service.getById(id);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee with id " + id + " not found");
        }
    }

    // ✅ Fetch all employees
    @GetMapping("/fetchAll")
    public ResponseEntity<List<Employee>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    // ✅ Update employee
  
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable long id, @RequestBody Employee employee) {
        Employee updated = service.updateEmployee(id, employee);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Employee with id " + id + " not found");
        }
    }

    // ✅ Delete employee
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        Employee deleted = service.deleteById(id);
        if (deleted != null) {
            return ResponseEntity.ok(deleted);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee with id " + id + " not found");
        }
    }
}
