const fileInteraction = require('../fileconfig/fileInteraction');

function get_employees(req, res) {
    fileInteraction.read_file()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }))
};

function add_employee(req, res) {
    fileInteraction.add_employee(req.body)
        .then(() => res.json({ message: 'Employee added successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

function update_employee(req, res) {
    const employeeID = Number(req.params.id);
    fileInteraction.update_employee(employeeID, req.body)
        .then(updated => res.json({ message: updated ? 'Employee updated successfully' : 'Employee not found' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

function delete_employee(req, res) {
    const employeeID = Number(req.params.id);
    fileInteraction.delete_employee(employeeID)
        .then(deleted => res.json({ message: deleted ? 'Employee deleted successfully' : 'Employee not found' }))    
        .catch(err => res.status(500).json({ error: err.message }));
};

function get_employees_by_language(req, res) { 
    const language = req.params.language;
    const minScore = Number(req.params.minScore);
    fileInteraction.get_employees_by_language(language, minScore)
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { get_employees, add_employee, update_employee, delete_employee, get_employees_by_language};