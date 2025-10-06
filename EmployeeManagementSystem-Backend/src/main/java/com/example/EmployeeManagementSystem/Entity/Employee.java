package com.example.EmployeeManagementSystem.Entity;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor


public class Employee {

  @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    @Column(name = "first_name")
	private String firstName;
    @Column(name = "last_name")
	private String lastName;
    @Column(name = "email", nullable = false,unique = true )
	private String email;
	
}
