INSERT INTO departments
(name) VALUES
    ("Marketing"),
    ("Development");

INSERT INTO roles
(title, department, salary) VALUES
-- check on using decimals
    ("engineer", 2, 100000),
    ("lead engineer", 2, 150000);


INSERT INTO employees
(first_name, last_name, role_id, manager_id) VALUES
    ("jane", "doe", 2, NULL),
    ("john", "doe", 1, 1);

