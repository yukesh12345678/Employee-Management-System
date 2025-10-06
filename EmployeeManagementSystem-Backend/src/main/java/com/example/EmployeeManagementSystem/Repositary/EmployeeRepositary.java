package com.example.EmployeeManagementSystem.Repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EmployeeManagementSystem.Entity.Employee;

@Repository
public interface EmployeeRepositary extends JpaRepository<Employee, Long> {

	
}
