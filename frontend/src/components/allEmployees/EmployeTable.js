import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaFilter } from 'react-icons/fa';
import '../../libraries/table.css';
import ConfirmationModal from '../confirmation/confirmation';
import validateEmployee from "../../utils/Validations";
import AlertMessage from "../alert/AlertMessage"; 

const Table = ({ employees, setEmployees }) => {
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [languageFilter, setLanguageFilter] = useState("");
    const [scoreFilter, setScoreFilter] = useState("");
    const [filterApplied, setFilterApplied] = useState(false);
    const [deleteEmployeeID, setDeleteEmployeeID] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [alert, setAlert] = useState({ message: "", alertClass: "" }); 

    const fetchFilteredEmployees = (language = "", score = "") => {
        axios.get(`http://localhost:5000/employees/language/${language}/${score}`)
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => console.error("Error fetching filtered employees:", error));
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee.EmployeeID);
        setEditedData({ ...employee });
    };

    const handleSave = (id) => {
        const errors = validateEmployee(editedData);
        if (errors.length > 0) {
            setAlert({ message: errors.join("\n"), alertClass: "alert-danger" });
            return;
        }

        axios
            .put(`http://localhost:5000/updateEmployees/${id}`, editedData)
            .then(() => {
                setEmployees((prevState) =>
                    prevState.map((employee) =>
                        employee.EmployeeID === id ? { ...employee, ...editedData } : employee
                    )
                );
                setEditingEmployee(null);
                setAlert({ message: "Employee updated successfully!", alertClass: "alert-success" }); 
            })
            .catch((error) => {
                setAlert({ message: "Error updating employee!", alertClass: "alert-danger" });
                console.error("Error updating employee:", error);
            });
    };

    const handleCancel = () => {
        setEditingEmployee(null);
        setEditedData({});
    };

    const handleDelete = (id) => {
        setDeleteEmployeeID(id);
        setShowConfirmModal(true);
    };

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

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setDeleteEmployeeID(null);
    };

    const fetchAllEmployees = () => {
        axios.get("http://localhost:5000/employees")
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => console.error("Error fetching employees:", error));
    };

    const handleClearFilters = () => {
        setLanguageFilter("");
        setScoreFilter("");
        setFilterApplied(false);
        fetchAllEmployees();
    };

    const handleApplyFilters = () => {
        setFilterApplied(true);
        fetchFilteredEmployees(languageFilter, scoreFilter);
    };

    return (
        <div>
            {alert.message && <AlertMessage message={alert.message} alertClass={alert.alertClass} />}

            <div className="filters" style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
                <div className="filter-input" style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        placeholder="Language"
                        value={languageFilter}
                        onChange={(e) => setLanguageFilter(e.target.value)}
                        style={{ 
                            padding: "10px", 
                            borderRadius: "20px", 
                            border: "1px solid #ccc", 
                            width: "140px",
                            outline: "none",
                            transition: "border-color 0.3s",
                        }}
                    />
                </div>
                <div className="filter-input" style={{ marginRight: "5px", display: "flex", alignItems: "center" }}>
                    <input
                        type="number"
                        placeholder="Score"
                        value={scoreFilter}
                        onChange={(e) => setScoreFilter(e.target.value)}
                        style={{ 
                            padding: "10px", 
                            borderRadius: "20px", 
                            border: "1px solid #ccc", 
                            width: "80px",
                            outline: "none",
                            transition: "border-color 0.3s",
                        }}
                    />
                </div>
                <button onClick={handleApplyFilters} className="btn btn-dark">
                    <FaFilter />
                </button>
                {filterApplied && (
                    <button onClick={handleClearFilters} className="btn btn-outline-secondary ml-2">Clear Filters</button>
                )}
            </div>

            <table
                style={{
                    width: "100%",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    borderCollapse: "collapse",
                    backgroundColor: "#fff",
                    textAlign: "center"
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2", borderBottom: "2px solid #ccc" }}>
                        <th style={{ padding: "12px", fontSize: "14px", color: "#555" }}>Employee ID</th>
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
                        <tr key={employee.EmployeeID} style={{ backgroundColor: "#f9f9f9", transition: "background-color 0.3s" }}>
                            <td style={{ padding: "12px", color: "#555" }}>
                                {editingEmployee === employee.EmployeeID ? (
                                    <span>{employee.EmployeeID}</span>
                                ) : (
                                    employee.EmployeeID
                                )}
                            </td>
                            <td>
                                {editingEmployee === employee.EmployeeID ? (
                                    <input
                                        value={editedData.FirstName}
                                        onChange={(e) => setEditedData({ ...editedData, FirstName: e.target.value })}
                                        style={{borderColor:'lightgray', borderRadius:'8px', padding: '8px', width: '100px'}}
                                    />
                                ) : (
                                    employee.FirstName
                                )}
                            </td>
                            <td>
                                {editingEmployee === employee.EmployeeID ? (
                                    <input
                                        value={editedData.LastName}
                                        onChange={(e) => setEditedData({ ...editedData, LastName: e.target.value })}
                                        style={{borderColor:'lightgray', borderRadius:'8px', padding: '8px', width: '100px'}}
                                    />
                                ) : (
                                    employee.LastName
                                )}
                            </td>
                            <td>
                                {editingEmployee === employee.EmployeeID ? (
                                    <input
                                        value={editedData.Designation}
                                        onChange={(e) => setEditedData({ ...editedData, Designation: e.target.value })}
                                        style={{borderColor:'lightgray', borderRadius:'8px', padding: '8px', width: '100px'}}
                                    />
                                ) : (
                                    employee.Designation
                                )}
                            </td>
                            <td>
                                {editingEmployee === employee.EmployeeID ? (
                                    employee.KnownLanguages.map((lang, idx) => (
                                        <div key={idx}>
                                            <input
                                                value={editedData.KnownLanguages[idx]?.LanguageName || lang.LanguageName}
                                                onChange={(e) => {
                                                    const updatedLangs = [...editedData.KnownLanguages];
                                                    updatedLangs[idx] = { ...updatedLangs[idx], LanguageName: e.target.value };
                                                    setEditedData({ ...editedData, KnownLanguages: updatedLangs });
                                                }}
                                                style={{borderColor:'lightgray', borderRadius:'8px', padding: '8px', width: '120px'}}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    employee.KnownLanguages.map((lang, idx) => (
                                        <div key={idx}>{lang.LanguageName}</div>
                                    ))
                                )}
                            </td>
                            <td>
                                {editingEmployee === employee.EmployeeID ? (
                                    employee.KnownLanguages.map((lang, idx) => (
                                        <div key={idx}>
                                            <input
                                                type="number"
                                                value={editedData.KnownLanguages[idx]?.ScoreOutof100 || lang.ScoreOutof100}
                                                onChange={(e) => {
                                                    const updatedLangs = [...editedData.KnownLanguages];
                                                    updatedLangs[idx] = { ...updatedLangs[idx], ScoreOutof100: e.target.value };
                                                    setEditedData({ ...editedData, KnownLanguages: updatedLangs });
                                                }}
                                                style={{borderColor:'lightgray', borderRadius:'8px', padding: '8px', width: '80px'}}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    employee.KnownLanguages.map((lang, idx) => (
                                        <div key={idx}>{lang.ScoreOutof100}</div>
                                    ))
                                )}
                            </td>
                            <td>
                                {editingEmployee === employee.EmployeeID ? (
                                    <>
                                        <button onClick={() => handleSave(employee.EmployeeID)} className="btn btn-dark ml-2 mb-1" style={{ padding: "5px 18px" }}>Save</button>
                                        <button onClick={handleCancel} className="btn btn-outline-dark ml-2">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="icon-button edit-button" onClick={() => handleEdit(employee)}>
                                            <FaEdit />
                                        </button>
                                        <button className="icon-button delete-button" onClick={() => handleDelete(employee.EmployeeID)}>
                                            <FaTrashAlt />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmationModal
                show={showConfirmModal}
                message="Are you sure you want to delete this employee?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default Table;
