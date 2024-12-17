const fileInteraction = require('../fileconfig/fileInteraction');
const validateEmployee = require('../utils/Validations');


//get all employees and return them as json
function get_employees(req, res) {
    fileInteraction.read_file()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }))
};

/* check if employee data is valid, if no send errors to the user[Frontend || postman],
else call add_employee function in the fileInteraction class& send a success message or error message
*/
async function add_employee(req, res) {
    const errors = validateEmployee(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        await fileInteraction.add_employee(req.body);
        res.json({ message: 'Employee added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/*
 check if employee data is valid, if no send errors to the user[Frontend || postman],
 else call update_employee function in the fileInteraction class& send a success message or error message
*/
async function update_employee(req, res) {
    const employeeID = Number(req.params.id);
    const errors = validateEmployee(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        const updated = await fileInteraction.update_employee(employeeID, req.body);
        if (updated) {
            res.json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/*
change employee ID into number and call delete_employee function in the fileInteraction class,
send a success message or error message
*/
async function delete_employee(req, res) {
    try {
        const employeeID = Number(req.params.id);
        const deleted = await fileInteraction.delete_employee(employeeID);
        res.status(deleted ? 200 : 404).res.json({ message: deleted ? 'Employee deleted successfully' : 'Employee not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/*
get the language and minimum score and call get_employees_by_language function in the fileInteraction class,
return the result or error
*/
async function get_employees_by_language(req, res) {
    try {
        const language = req.params.language;
        const minScore = Number(req.params.minScore);
        const data = await fileInteraction.get_employees_by_language(language, minScore);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { get_employees, add_employee, update_employee, delete_employee, get_employees_by_language};