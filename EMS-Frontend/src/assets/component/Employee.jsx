import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployees, getEmployee, updateEmployee } from '../../Services/EmployeeService';

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigator = useNavigate();
  const { id } = useParams();

  const saveEmployee = async (e) => {
    e.preventDefault();

    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '') {
      alert("All fields are required");
      return;
    }

    const employee = { firstName, lastName, email };

    try {
      if (id) {
        // ✅ update
        const response = await updateEmployee(id, employee);
        console.log("Updated:", response.data);
      } else {
        // ✅ create
        const response = await createEmployees(employee);
        console.log("Created:", response.data);
      }

      navigator('/employees');
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const pageTitle = () => {
    return id ? (
      <h2 className="text-center">Update Employee</h2>
    ) : (
      <h2 className="text-center">Add Employee</h2>
    );
  };

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <div>
      <div className="container" ></div>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter the Firstname"
                  value={firstName}
                  className="form-control"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter the LastName"
                  value={lastName}
                  className="form-control"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Enter the Email"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-success mt-2" onClick={saveEmployee}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
