package com.example.EmployeeManagementSystem.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.example.EmployeeManagementSystem.Entity.Employee;
import com.example.EmployeeManagementSystem.Repositary.EmployeeRepositary;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepositary repositary;

	public Employee createEmployee(Employee employee) {

		return repositary.save(employee);
	}

	public Employee getById(long id) {
		// TODO Auto-generated method stub
		return repositary.findById(id).orElse(null);
	}

	public List<Employee> getAll() {
		// TODO Auto-generated method stub
		return repositary.findAll();
	}
	
	 public Employee updateEmployee(long id, Employee employeeDetails) {
	        Optional<Employee> optional = repositary.findById(id);

	        if (optional.isPresent()) {
	            Employee existing = optional.get();
	            existing.setFirstName(employeeDetails.getFirstName());
	            existing.setLastName(employeeDetails.getLastName());
	            existing.setEmail(employeeDetails.getEmail());
	            return repositary.save(existing); // ✅ updates instead of creating new
	        } else {
	            return null; // controller will return 404
	        }
	    }

	
	

	public Employee deleteById(long id) {
		    Optional<Employee> employeeOpt = repositary.findById(id);
		    if (employeeOpt.isPresent()) {
		        Employee employee = employeeOpt.get();
		        repositary.deleteById(id);
		        return employee;   // return deleted employee details
		    }
		    return null;
		}


}
