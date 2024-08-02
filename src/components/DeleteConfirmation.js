import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
      );
      navigate("/");
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Confirm Deletion</h4>
        <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger me-2" onClick={handleDelete}>
            Yes, Delete
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
