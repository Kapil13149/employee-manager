import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import EmployeeDetails from "./components/EmployeeDetails";
import AddEditEmployee from "./components/AddEditEmployee";
import DeleteConfirmation from "./components/DeleteConfirmation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<AddEditEmployee />} />
        <Route path="/edit/:id" element={<AddEditEmployee />} />
        {/* <Route path="/details/:id" element={<EmployeeDetails />} /> */}
        <Route path="/delete/:id" element={<DeleteConfirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
