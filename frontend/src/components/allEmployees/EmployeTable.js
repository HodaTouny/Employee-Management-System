import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaFilter } from 'react-icons/fa';
import '../../libraries/table.css';
import ConfirmationModal from '../confirmation/confirmation';
import EditEmployeeForm from './EditEmployeeForm'; 
import validateEmployee from "../../utils/Validations";
import AlertMessage from "../alert/AlertMessage"; 


// Table component -> contain all employees + edit and delete buttons
const Table = ({ employees, setEmployees }) => {
    const [editingEmployee, setEditingEmployee] = useState(null); 
    const [editedData, setEditedData] = useState({}); 
    const [languageFilter, setLanguageFilter] = useState("");
    const [scoreFilter, setScoreFilter] = useState("");
    const [filterApplied, setFilterApplied] = useState(false);
    const [deleteEmployeeID, setDeleteEmployeeID] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [alert, setAlert] = useState({ message: "", alertClass: "" }); 
    const [showEditModal, setShowEditModal] = useState(false); 

    // retrieve Filtered employees based on language and score
    const fetchFilteredEmployees = (language = "", score = "") => {
        axios.get(`http://localhost:5000/employees/language/${language}/${score}`)
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => console.error("Error fetching filtered employees:", error));
    };

    // handle edit employee by opening edit modal
    const handleEdit = (employee) => {
        setEditingEmployee(employee.EmployeeID);
        setEditedData({ ...employee });
        setShowEditModal(true);
    };

    // handle save edited employee by validating it and send it to backend if no errors
    const handleSave = () => {
        const errors = validateEmployee(editedData);
        if (errors.length > 0) {
            setAlert({ message: errors.join("\n"), alertClass: "alert-danger" });
            return;
        }

        axios.put(`http://localhost:5000/updateEmployees/${editedData.EmployeeID}`, editedData)
            .then(() => {
                setEmployees(prevState =>
                    prevState.map(employee =>
                        employee.EmployeeID === editedData.EmployeeID ? { ...employee, ...editedData } : employee
                    )
                );
                setShowEditModal(false); 
                setAlert({ message: "Employee updated successfully!", alertClass: "alert-success" }); 
            })
            .catch((error) => {
                setAlert({ message: "Error updating employee!", alertClass: "alert-danger" });
                console.error("Error updating employee:", error);
            });
    };

    // handle click on cancel button by close the edit modal
    const handleCancelEdit = () => {
        setShowEditModal(false); 
        setEditedData({}); 
    };

    // handle delete employee by opening confirmation modal
    const handleDelete = (id) => {
        setDeleteEmployeeID(id);
        setShowConfirmModal(true);
    };

    // handle confirm delete employee, by sending the employee ID to backend & close the confirmation modal
    const confirmDelete = () => {
        if (deleteEmployeeID) {
            axios.delete(`http://localhost:5000/deleteEmployees/${deleteEmployeeID}`)
                .then(() => {
                    setEmployees(prevState => prevState.filter(employee => employee.EmployeeID !== deleteEmployeeID));
                    setShowConfirmModal(false);
                })
                .catch(error => console.error("Error deleting employee:", error));
        }
    };

    // handle cancel delete employee by close the confirmation modal
    const cancelDelete = () => {
        setShowConfirmModal(false);
        setDeleteEmployeeID(null);
    };
    // fetch all employees
    const fetchAllEmployees = () => {
        axios.get("http://localhost:5000/employees")
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => console.error("Error fetching employees:", error));
    };

    // handle clear filters when click on clear button
    const handleClearFilters = () => {
        setLanguageFilter("");
        setScoreFilter("");
        setFilterApplied(false);
        fetchAllEmployees();
    };
    
    // handle apply filters when click on apply button
    const handleApplyFilters = () => {
        setFilterApplied(true);
        fetchFilteredEmployees(languageFilter, scoreFilter);
    };

    return (
        <div>
            {alert.message && <AlertMessage message={alert.message} alertClass={alert.alertClass} />}

            <div className="filters" style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="Language"
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    style={{ padding: "10px", borderRadius: "20px", border: "1px solid #ccc", width: "140px" }}
                />
                <input
                    type="number"
                    placeholder="Score"
                    value={scoreFilter}
                    onChange={(e) => setScoreFilter(e.target.value)}
                    style={{ padding: "10px", borderRadius: "20px", border: "1px solid #ccc", width: "80px" }}
                />
                <button onClick={handleApplyFilters} className="btn btn-dark"><FaFilter /></button>
                {filterApplied && <button onClick={handleClearFilters} className="btn btn-outline-secondary ml-2">Clear Filters</button>}
            </div>

            <table style={{ width: "100%", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", backgroundColor: "#fff", textAlign: "center" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Designation</th>
                        <th>Languages</th>
                        <th>Scores</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.EmployeeID} style={{ backgroundColor: "#f9f9f9" }}>
                            <td>{employee.EmployeeID}</td>
                            <td>{employee.FirstName}</td>
                            <td>{employee.LastName}</td>
                            <td>{employee.Designation}</td>
                            <td>{employee.KnownLanguages.map(lang => lang.LanguageName).join(", ")}</td>
                            <td>{employee.KnownLanguages.map(lang => lang.ScoreOutof100).join(", ")}</td>
                            <td>
                                <button className="edit-button icon-button" onClick={() => handleEdit(employee)}><FaEdit /></button>
                                <button className="delete-button icon-button" onClick={() => handleDelete(employee.EmployeeID)}><FaTrashAlt /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmationModal show={showConfirmModal} message="Are you sure you want to delete this employee?" onConfirm={confirmDelete} onCancel={cancelDelete} />
            <EditEmployeeForm show={showEditModal} employee={editedData} setEmployee={setEditedData} onSave={handleSave} onCancel={handleCancelEdit} alert={alert} />
        </div>
    );
};

export default Table;
