import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddEditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    emailId: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });
  const [countries, setCountries] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const { data } = await axios.get(
            `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
          );
          setEmployee(data);
        } catch (error) {
          console.error("Error fetching employee", error);
        }
      }
    };

    const fetchCountries = async () => {
      try {
        const { data } = await axios.get(
          "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country"
        );
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };

    fetchEmployee();
    fetchCountries();
  }, [id]);

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
          employee
        );
      } else {
        await axios.post(
          "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
          employee
        );
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving employee", error);
    }
  };

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "emailId", type: "email" },
    { label: "Mobile", name: "mobile", type: "text" },
    { label: "State", name: "state", type: "text" },
    { label: "District", name: "district", type: "text" },
  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{id ? "Edit Employee" : "Add Employee"}</h1>
      <form onSubmit={handleSubmit}>
        {fields.map(({ label, name, type }) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name} className="form-label">
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              className="form-control"
              value={employee[name]}
              onChange={handleChange}
              placeholder={label}
            />
          </div>
        ))}
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            id="country"
            name="country"
            className="form-select" 
            value={employee.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEditEmployee;
