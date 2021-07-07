INSERT INTO department (name)
VALUES
    ('Managment'),
    ('Engineering'),
    ('Marketing'),
    ('Distribution'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Senior Engineer', 100000.00, 1),
    ('Marketing Manager', 85000.00, 1),
    ('Distribution Manager', 80000.00, 1),
    ('Sales Manager', 75000.00, 1),
    ('Junior Engineer', 65000.00, 2),
    ('Social Media Intern', 30000.00, 3),
    ('Warehouse Crew', 50000.00, 4),
    ('Sales Floor Supervisor', 55000.00, 5),
    ('Sales Representative', 40000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Dalinar', 'Kholin', 2, NULL),
    ('Navani', 'Kholin', 1, NULL),
    ('Kaladin', 'Stormblessed', 3, NULL),
    ('Shallan', 'Davar', 4, 5),
    ('Rysn', 'Ftori', 5, 2),
    ('Szeth', 'Vallano', 6, 3),
    ('Teft', 'Envisager', 7, 4),
    ('Wit', 'Hoid', 8, 5),
    ('Lopen', 'Herdazian', 9, 5);
    