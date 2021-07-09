const db = require('./db/connection');
const conTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
console.log('Listening on port 3001.');

// viewAllDept();
// db.query(`SELECT employees.first_name, employees.last_name, department.name AS Department FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employees.id;`),

// ============= View all Department names and department ids ============ //
function viewAllDept() {
    db.query(`SELECT * FROM department;`, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
};

// ============= View all Roles: job title, role id, department role belongs to, salary ============ //
function viewAllRoles() {
    db.query(`SELECT role.*, department.name AS Department
    FROM role 
    LEFT JOIN department ON role.department_id = department.id;`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
        });
};

// ============= View all Employees: emp ids, first, last name, job title, departments, salaries, managers that emps report to ============ //
function viewAllEmployees() {
    // db.query(`SELECT * FROM employees JOIN role ON employees.role_id = role.id`,
    db.query(`SELECT employees.id, employees.first_name, employees.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(e.first_name, ' ', e.last_name) AS Manager 
    FROM employees 
    INNER JOIN role 
    ON role.id = employees.role_id 
    INNER JOIN department 
    ON department.id = role.department_id 
    LEFT JOIN employees e 
    ON employees.manager_id = e.id;`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
        });
};


// ============= Add a Department ============ //
function addDept() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        var query = db.query(
            `INSERT INTO department (name) VALUES (?)`,
            {
                name: res.name
            },
            function (err) {
                if (err) throw err;
                console.table(res);
            }
        )
    });
};

// // ============= Add Employee Role ============ //
function addRole() {
    db.query(`SELECT role.title 
    AS title, role.salary 
    AS Salary 
    FROM role`, function (err, res) {
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the employee role title you'd like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the Salary?"
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the department ID number?"
            }
        ]).then(function (res) {
            db.query(
                "INSERT INTO role SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.department_id,
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                }
            )
        });
    });
}

// =============  ============ //


// viewAllDept();
// viewAllRoles();
// viewAllEmployees();
// addDept();
addRole();