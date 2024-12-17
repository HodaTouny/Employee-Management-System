import React from "react";

// confirmation component used  for confirm doing an action.
const ConfirmationModal = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

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
                    width: "300px",
                    textAlign: "center"
                }}
            >
                <h4 className="mb-2">{message}</h4>
                <div>
                    <button onClick={onConfirm} className="btn btn-danger">Yes</button>
                    <button onClick={onCancel} className="btn btn-secondary ml-2">No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
