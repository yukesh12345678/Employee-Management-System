package com.example.EmployeeManagementSystem.corsconfig;

import java.net.http.HttpRequest;

import org.apache.catalina.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http.csrf().disable()
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/api/employee/**").permitAll()
	            .anyRequest().permitAll()
	        ).formLogin(form -> form.permitAll().defaultSuccessUrl(null));
	    return http.build();
	}


	@Bean
	public UserDetailsService detailsService(PasswordEncoder passwordEncoder) {
		UserDetails user= org.springframework.security.core.userdetails.User.withUsername("alis")
				.password(passwordEncoder.encode("1234"))
				.roles("USER")
				.build();
		UserDetails admin= org.springframework.security.core.userdetails.User.withUsername("zack")
				.password(passwordEncoder.encode("1234"))
				.roles("ADMIN")
				.build();
		return new InMemoryUserDetailsManager(user,admin);
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
