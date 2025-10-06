import axios from "axios";

const API_URL = "http://localhost:8080/api/employee";

// ✅ fetch all employees
export const listEmployees = async () => {
  return axios.get(`${API_URL}/fetchAll`);
};

// ✅ create employee
export const createEmployees = async (employee) => {
  return axios.post(`${API_URL}/create`, employee);
};


// ✅ get employee by id
export const getEmployee = async (employeeId) => {
  return axios.get(`${API_URL}/get/${employeeId}`); 
  // ⚠️ change /get if your backend uses /find or /fetch/{id}
};

// ✅ update employee
export const updateEmployee = async (employeeId, employee) => {
  return axios.put(`${API_URL}/update/${employeeId}`, employee);
};

// export const deleteEmployee=async(employeeId,employee)=>{
//   return axios.delete(`${API_URL}/delete/${employeeId}`)
// }
// ✅ delete employee
export const deleteEmployee = async(employeeId) => axios.delete(`${API_URL}/delete/${employeeId}`);