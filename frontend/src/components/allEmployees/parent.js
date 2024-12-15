import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Table from "./EmployeTable";  // Make sure the component name is correctly imported

const Parent = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);

    // Fetch employee data once the component mounts
    useEffect(() => {
        axios.get("http://localhost:5000/employees")
            .then(response => {
                console.log(response.data); // Check the data structure
                setEmployees(response.data);
            })
            .catch(err => {
                console.log(err);
                setError("Error fetching employees. Please try again later.");
            });
    }, []); // Empty dependency array means this runs only once when the component mounts

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredEmployees = employees.filter(
        (emp) =>
            (emp.EmployeeID && emp.EmployeeID.toString().includes(searchQuery)) ||
            (emp.Designation && emp.Designation.toLowerCase().includes(searchQuery.toLowerCase()))
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
