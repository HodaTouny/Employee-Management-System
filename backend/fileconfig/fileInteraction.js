const fs = require('fs').promises;

async function read_file() {
    try {
        const data = await fs.readFile('./Employees.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err.message);
        throw err;
    }
}

async function add_employee(data) {
    try {
        const employees = await read_file();
        const existingEmployee = employees.find(emp => emp.EmployeeID == data.EmployeeID);
        if (existingEmployee) {
            throw new Error(`Employee with ID ${data.EmployeeID} already exists`);
        }
        employees.push(data);
        await fs.writeFile('./Employees.json', JSON.stringify(employees, null, 2), 'utf8');
    } catch (err) {
        console.error('Error adding employee:', err.message);
        throw err;
    }
}

async function update_employee(id, data) {
    try {
        const employees = await read_file();
        const employee = employees.find(employee => employee.EmployeeID == id);

        if (employee) {
            Object.assign(employee, data);
            await fs.writeFile('./Employees.json', JSON.stringify(employees, null, 2), 'utf8');
            console.log('Employee updated successfully');
            return true;
        }
        return false;
    } catch (err) {
        console.error('Error updating employee:', err.message);
        throw err;
    }
}

async function delete_employee(id) {
    try {
        const employees = await read_file();
        const index = employees.findIndex(employee => employee.EmployeeID == id);
        console.log(index);
        if (index !== -1) {
            employees.splice(index, 1);
            await fs.writeFile('./Employees.json', JSON.stringify(employees, null, 2), 'utf8');
            return true;
        }
        return false;
    } catch (err) {
        console.error('Error deleting employee:', err.message);
        throw err;
    }
}

async function get_employees_by_language(language, minScore) {
    try {
        const employees = await read_file();
        const filteredEmployees = employees.filter(employee => {
            const matchingLanguages = employee.KnownLanguages?.filter(lang => lang.LanguageName.toLowerCase() === language.toLowerCase() && lang.ScoreOutof100 > minScore);
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
        throw err;
    }
}

module.exports = { read_file, add_employee, update_employee, delete_employee, get_employees_by_language };
