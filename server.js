const db = require('./db/connection');
const conTable = require('console.table');

const PORT = process.env.PORT || 3001;
console.log('Listening on port 3001.');

// viewAllDept();
// db.query(`SELECT employees.first_name, employees.last_name, department.name AS Department FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employees.id;`),

// ============= View all Department names and department ids ============ //
function viewAllDept() {
    db.query(`SELECT * FROM department;`, function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}

// ============= View all Roles: job title, role id, department role belongs to, salary ============ //
function viewAllRoles() {
    db.query(`SELECT role.*, department.name AS Department
    FROM role 
    LEFT JOIN department ON role.department_id = department.id;`, 
    function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}





// viewAllDept();
viewAllRoles();