// EmployeeDetailsModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const EmployeeDetailsModal = ({ show, handleClose, employeeId }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (employeeId) {
      axios
        .get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${employeeId}`)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the employee details!", error);
        });
    }
  }, [employeeId]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {employee ? (
          <div className="container mt-4">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h5 className="card-title">Name: {employee.name}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {employee.emailId}
                    </p>
                    <p className="card-text">
                      <strong>Mobile:</strong> {employee.mobile}
                    </p>
                    <p className="card-text">
                      <strong>Country:</strong> {employee.country}
                    </p>
                    <p className="card-text">
                      <strong>State:</strong> {employee.state}
                    </p>
                    <p className="card-text">
                      <strong>District:</strong> {employee.district}
                    </p>
                    <Link to={`/edit/${employee.id}`} className="btn btn-primary">
                      <i className="fas fa-edit"></i> Edit
                    </Link>
                  </div>
                  <div className="col-md-4">
                    {employee.avatar && (
                      <img src={employee.avatar} alt="Employee Avatar" className="img-fluid" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeDetailsModal;
