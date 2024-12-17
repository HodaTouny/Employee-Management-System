import React, { useState } from "react";
import axios from "axios";
import "../../libraries/bootstrap.min.css";
import "../../libraries/employee.css"; 
import AlertMessage from '../alert/AlertMessage';
import validateEmployee from "../../utils/Validations";

const NewEmployee = () => {
  // use state to manage add employee form data
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    EmployeeID: "",
    Designation: "",
    KnownLanguages: [
      { LanguageName: "", ScoreOutof100: "" }
    ]
  });
  // use state to manage alert
  const [alert, setAlert] = useState({ message: "", alertClass: "" });

  // use state to manage input fields change -> add the new fields into the form
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };

    if (name === "KnownLanguages") {
      updatedData.KnownLanguages[index][e.target.dataset.field] = value;
    } else {
      updatedData[name] = value;
    }

    setFormData(updatedData);
  };

  // use srate to manage add new language
  const addLanguage = () => {
    setFormData({
      ...formData,
      KnownLanguages: [...formData.KnownLanguages, { LanguageName: "", ScoreOutof100: "" }]
    });
  };

  /*
  function to handle form submission, by checking the validation and then sending the data to backend,
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ message: "", alertClass: "" });

    const errors = validateEmployee(formData);
    if (errors.length > 0) {
        setAlert({ message: errors.join("<br/>"), alertClass: "alert-danger" });
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:5000/addEmployees",
            formData
        );
        // set the success message alert
        setAlert({message: "Employee added successfully!",alertClass: "alert-success",});

        // Reset form data to empty state after adding employee
        setFormData({
            FirstName: "",
            LastName: "",
            EmployeeID: "",
            Designation: "",
            KnownLanguages: [{ LanguageName: "", ScoreOutof100: "" }],
        });
    } catch (error) {
      //set the error message alert
        setAlert({message:error.response?.data?.error ||"Error adding employee. Please try again.", alertClass: "alert-danger",});
    }
};

  return (
    <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-header">New Employee</h1>
        {/* Alert message container*/}
        {alert.message && <AlertMessage message={alert.message} alertClass={alert.alertClass} />}
        <div className="mb-3">
          <label htmlFor="FirstName" className="form-label">First Name</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            className="form-control"
            value={formData.FirstName}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="LastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            className="form-control"
            value={formData.LastName}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="EmployeeID" className="form-label">Employee ID</label>
          <input
            type="number"
            id="EmployeeID"
            name="EmployeeID"
            className="form-control"
            value={formData.EmployeeID}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Designation" className="form-label">Designation</label>
          <input
            type="text"
            id="Designation"
            name="Designation"
            className="form-control"
            value={formData.Designation}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="known-languages-label">Known Languages</label>

          <div className="language-input-group">
            <button
              type="button"
              className="language-add-button language-add-button-first btn btn-dark"
              onClick={addLanguage}
            >
              + 
            </button>
          </div>

          {formData.KnownLanguages.map((language, index) => (
            <div key={index} className="language-input-group">
              <input
                type="text"
                placeholder="Language Name"
                data-field="LanguageName"
                name="KnownLanguages"
                className="form-control"
                value={language.LanguageName}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              <input
                type="number"
                placeholder="Score"
                data-field="ScoreOutof100"
                name="KnownLanguages"
                className="form-control"
                value={language.ScoreOutof100}
                onChange={(e) => handleInputChange(e, index)}
                required
                step="any"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="form-submit-button btn btn-dark"
          style={{backgroundColor: "#f6745d" ,border: "#f6745d"}}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewEmployee;
