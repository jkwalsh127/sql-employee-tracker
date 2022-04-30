INSERT INTO departments
(name) VALUES
    ("Booking");

INSERT INTO roles
(title, salary, department_id) VALUES
-- check on using decimals
    ("engineer", .100, 1);

INSERT INTO employees
(first_name, last_name, role_id, manager_id) VALUES
    ("john", "doe", 1, 2);
