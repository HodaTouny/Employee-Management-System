const fs = require('fs').promises;


// read the file content and parse it into json object
async function read_file() {
    try {
        const data = await fs.readFile('./Employees.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err.message);
        throw new Error('Failed to read employee data.');
    }
}

/*read employees and check if employee already exists, else add employee into employees array then,
 write array into file.
*/
async function add_employee(data) {
    try {
        const employees = await read_file();
        const existingEmployee = employees.find(emp => emp.EmployeeID == data.EmployeeID);
        if (existingEmployee) {
            throw new Error(`Employee with ID ${data.EmployeeID} already exists.`);
        }
        employees.push(data);
        await fs.writeFile('./Employees.json', JSON.stringify(employees, null, 2), 'utf8');
    } catch (err) {
        console.error('Error adding employee:', err.message);
        throw new Error(err.message);
    }
}

/*
read employees and check if employee ID exist, get it's index and update employee data [overwrite old value
with new value], then re-write the array into file.
*/
async function update_employee(id, data) {
    try {
        const employees = await read_file();
        const employeeIndex = employees.findIndex(emp => emp.EmployeeID == id);
        if (employeeIndex !== -1) {
            employees[employeeIndex] = { ...employees[employeeIndex], ...data };
            await fs.writeFile('./Employees.json', JSON.stringify(employees, null, 2), 'utf8');
            return true;
        }
        return false; 
    } catch (err) {
        console.error('Error updating employee:', err.message);
        throw new Error(err.message);
    }
}

/*
 read employees and check if employee ID exist, get it's index and delete employee data,
 then re-write the array into file.
*/
async function delete_employee(id) {
    try {
        const employees = await read_file();
        const employeeIndex = employees.findIndex(emp => emp.EmployeeID == id);
        if (employeeIndex !== -1) {
            employees.splice(employeeIndex, 1);
            await fs.writeFile('./Employees.json', JSON.stringify(employees, null, 2), 'utf8');
            return true;
        }
        return false; 
    } catch (err) {
        console.error('Error deleting employee:', err.message);
        throw new Error('Failed to delete employee.');
    }
}

/*
read employees and filter by language and score, then sort by score in ascending order,
and return sorted array 
*/
async function get_employees_by_language(language, minScore) {
    try {
        const employees = await read_file();
        const filteredEmployees = employees.filter(employee => {
            const matchingLanguages = employee.KnownLanguages?.filter(lang => 
                lang.LanguageName.toLowerCase() === language.toLowerCase() && lang.ScoreOutof100 >= minScore);
            return matchingLanguages && matchingLanguages.length > 0;
        });

        const sortedEmployees = filteredEmployees.sort((a, b) => {
            const aScore = a.KnownLanguages?.find(lang => lang.LanguageName.toLowerCase() === language.toLowerCase())?.ScoreOutof100 || 0;
            const bScore = b.KnownLanguages?.find(lang => lang.LanguageName.toLowerCase() === language.toLowerCase())?.ScoreOutof100 || 0;
            return aScore - bScore;
        });
        
        return sortedEmployees;
    } catch (err) {
        console.error('Error filtering employees by language:', err.message);
        throw new Error(err.message);
    }
}

module.exports = { read_file, add_employee, update_employee, delete_employee, get_employees_by_language };
