import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Table from "./EmployeTable"; 

const Parent = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    // Fetch all employees to send it to the table component
    useEffect(() => {
        axios.get("http://localhost:5000/employees")
            .then(response => {
                setEmployees(response.data);
            })
            .catch(err => {
                console.log(err);
                setError("Error fetching employees. Please try again later.");
            });
    }, []); 


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    // Filter employees based on search query either by ID or Designation
    const filteredEmployees = employees.filter(
        (emp) =>
            (emp.EmployeeID && emp.EmployeeID.toString().includes(searchQuery)) ||
            (emp.Designation && emp.Designation.toLowerCase().startsWith(searchQuery.toLowerCase()))
    );

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Search searchQuery={searchQuery} onSearchChange={handleSearch} />
            <Table employees={filteredEmployees} setEmployees={setEmployees} />
        </div>
    );
};

export default Parent;
