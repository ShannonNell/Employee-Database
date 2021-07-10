const db = require('./db/connection');
const conTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
console.log('Listening on port 3001.');

// ============= Initial Prompt ============ //
function mainMenu() {
    inquirer.prompt([
        {
            name: "mainMenu",
            type: "list",
            message: `
            MAIN MENU
            ---------
            Please select an option.
            `,
            choices: [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a Department", 
                "Add a Role",
                "Add an Employee", 
                "Update an Employee Role",
                "Quit"
            ]
        }
    ]).then(function (res) {
        switch (res.mainMenu) {
            case "View all Departments":
                viewAllDept();
            break;

            case "View all Roles":
                viewAllRoles();
            break;

            case "View all Employees":
                viewAllEmployees();
            break;

            case "Add a Department":
                addDept();
            break;

            case "Add a Role":
                addRole();
            break;

            case "Add an Employee":
                addEmployee();
            break;

            case "Update an Employee Role":
                updateEmployees();
            break;

            case "Quit":
                console.log("Thanks for updating your database, goodbye!");
            break;
        }
    })
};


// ============= View all Department names and department ids ============ //
function viewAllDept() {
    db.query(`SELECT * FROM department;`, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu()
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
            mainMenu()
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
            mainMenu()
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
        let query = db.query(
            `INSERT INTO department (name) VALUES (?)`,
            {
                name: res.name
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                mainMenu()
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
                    mainMenu()
                }
            )
        });
    });
}

// ============= Add an Employee ============ //
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter the employees first name."
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter the employees last name."
        },
        {
            name: "role",
            type: "list",
            message: "What is the employees role?",
            choices: selectRole()
        },
        {
            name: "manager",
            type: "list",
            message: "Who is their manager?",
            choices: selectManager()
        },
    ]).then(function (res) {
        let roleId = selectRole().indexOf(res.role) + 1
        let managerId = selectManager().indexOf(res.manager) + 1
        db.query("INSERT INTO employees SET ?",
            {
                first_name: res.firstName,
                last_name: res.lastName,
                manager_id: managerId,
                role_id: roleId

            }, function (err) {
                if (err) throw err
                console.table(res)
                mainMenu()
            })
    })
};

// ============= Select role query(role title) for add employee prompt ============ //
let roleArr = [];
function selectRole() {
    db.query(`SELECT * FROM role`, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
};

// ============= Select role query (manager) for add employee prompt  ============ //
let managerArr = [];
function selectManager() {
    db.query(`SELECT first_name, last_name 
    FROM employees 
    WHERE manager_id 
    IS NULL`, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name);
        }
    })
    return managerArr;
}

// ============= Update employee  ============ //
function updateEmployees() {
    inquirer.prompt([
        {
            name: "empName",
            type: "input",
            message: "What is the employee's ID you want to be updated?",
        },
        {
            name: "newRole",
            type: "input",
            message: "Enter the new role ID for that employee.",
        },
    ]).then(function (res) {
        const empName = res.empName;
        const newRole = res.newRole;
        const dbUpdate = `UPDATE employees SET role_id = "${newRole}" WHERE id = "${empName}"`;
        db.query(dbUpdate, function (err, res) {
            if (err) throw err;
            console.table(res);
        })
        db.query(`SELECT * FROM employees;`,
            function (err, res) {
                if (err) throw err;
                console.table(res);
                console.log('The employee has been successfully updated.');
                mainMenu();
            });
    });
}

mainMenu();
// Things to do potentially:
//update employee full name rather than just last name
//separate files into own api routes?