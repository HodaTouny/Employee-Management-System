import React from "react";
import '../../libraries/bootstrap.min.css';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

// edit employee form -> used to set employee data into the form then allow user to update it all except ID.
const EditEmployeeForm = ({ show, employee, setEmployee, onSave, onCancel, alert }) => {
    if (!show) return null;

    // handle language changes
    const handleLanguageChange = (index, field, value) => {
        const updatedLanguages = [...employee.KnownLanguages];
        updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
        setEmployee({ ...employee, KnownLanguages: updatedLanguages });
    };
    // handle add new language
    const handleAddLanguage = () => {
        setEmployee({
            ...employee,
            KnownLanguages: [
                ...employee.KnownLanguages,
                { LanguageName: "", ScoreOutof100: "" },
            ]
        });
    };
    // handle remove language
    const handleRemoveLanguage = (index) => {
        const updatedLanguages = employee.KnownLanguages.filter((_, i) => i !== index);
        setEmployee({ ...employee, KnownLanguages: updatedLanguages });
    };

    return (
        <div
            className="modal-overlay"
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                className="modal-content"
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                }}
            >
                <h3>Edit Employee</h3>
                <div style={{ marginBottom: "10px" }}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={employee.FirstName || ""}
                        onChange={(e) =>
                            setEmployee({ ...employee, FirstName: e.target.value })
                        }
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={employee.LastName || ""}
                        onChange={(e) =>
                            setEmployee({ ...employee, LastName: e.target.value })
                        }
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Designation:</label>
                    <input
                        type="text"
                        value={employee.Designation || ""}
                        onChange={(e) =>
                            setEmployee({ ...employee, Designation: e.target.value })
                        }
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <h4>Languages & Scores</h4>
                {employee.KnownLanguages && employee.KnownLanguages.map((language, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="text"
                                placeholder="Language"
                                value={language.LanguageName || ""}
                                onChange={(e) =>
                                    handleLanguageChange(index, "LanguageName", e.target.value)
                                }
                                style={{ width: "50%", padding: "8px", marginRight: "8px" }}
                            />
                            <input
                                type="number"
                                placeholder="Score"
                                value={language.ScoreOutof100 || ""}
                                onChange={(e) =>
                                    handleLanguageChange(index, "ScoreOutof100", e.target.value)
                                }
                                style={{ width: "40%", padding: "8px", marginRight: "8px" }}
                            />
                            <button 
                                onClick={() => handleRemoveLanguage(index)} 
                                style={{ padding: "8px", color: "#f44336", backgroundColor: "transparent", border: "none" }} 
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
                <button 
                    onClick={handleAddLanguage} 
                    className="btn btn-dark" 
                    style={{ marginBottom: "10px" }}
                >
                    <FaPlus /> Add Language
                </button>

                <div className="d-flex justify-content-end">
                    <button onClick={onCancel} className="btn btn-outline-dark">
                        Cancel
                    </button>
                    <button onClick={onSave} className="btn"style={{ backgroundColor: "#f6745d", color: "white", marginLeft: "10px" }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeForm;
