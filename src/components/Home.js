import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    try {
      if (value) {
        const responseById = await axios.get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${value}`
        );
        setEmployees([responseById.data]);
      } else {
        fetchEmployees();
      }
    } catch (errorById) {
      try {
        const responseByName = await axios.get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee?name=${value}`
        );
        setEmployees(responseByName.data);
      } catch (errorByName) {
        console.error("Error searching employee by name", errorByName);
      }
    }
  };

  const handleShowModal = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployeeId(null);
  };

  return (
    <div className="container">
      <h1>Employee List</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Link to="/add">
        <button className="btn btn-success mb-3">Add Employee</button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="img-fluid rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.emailId}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => handleShowModal(employee.id)}
                >
                  Details
                </button>
                <Link to={`/edit/${employee.id}`}>
                  <button className="btn btn-primary me-2">
                    <i className="bi bi-pencil"></i>
                  </button>
                </Link>
                <Link to={`/delete/${employee.id}`}>
                  <button className="btn btn-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmployeeDetailsModal
        show={showModal}
        handleClose={handleCloseModal}
        employeeId={selectedEmployeeId}
      />
    </div>
  );
};

export default Home;
