DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    -- decimal(m, d) where m is max number of digits up to 65, d = digits to right of decimal up to 30
    salary DECIMAL (10, 2),
    department_id INTEGER
);

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);