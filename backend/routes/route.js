const controller = require('../controllers/controller');

module.exports = (app) => {
    app.get('/employees', controller.get_employees);
    app.get('/employees/language/:language/:minScore', controller.get_employees_by_language);
    app.post('/addEmployees', controller.add_employee);
    app.put('/updateEmployees/:id', controller.update_employee);
    app.delete('/deleteEmployees/:id', controller.delete_employee);
};