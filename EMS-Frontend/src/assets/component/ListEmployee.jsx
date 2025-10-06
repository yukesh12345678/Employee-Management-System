import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // ✅ change here for items per page
  const navigator = useNavigate();

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const addNewEmployee = () => {
    navigator("/employee");
  };

  const updateEmployee = (id) => {
    navigator(`/update-employee/${id}`);
  };

  const deleteEmployeeHandler = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Filter employees by search
  const filteredEmployees = employees.filter((e) =>
    `${e.firstName} ${e.lastName} ${e.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);

  return (
    <div className="container">
      <h1>List of Employees</h1>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button className="btn btn-success mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateEmployee(e.id)}
                  >
                    Update
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteEmployeeHandler(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListEmployee;
