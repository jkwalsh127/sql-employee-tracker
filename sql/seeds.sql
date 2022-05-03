INSERT INTO departments
(name) VALUES
    ("Marketing"),
    ("Development");

INSERT INTO roles
(title, department, salary) VALUES
-- check on using decimals
    ("Engineer", 2, 100000),
    ("Lead Engineer", 2, 150000),
    ("Data Analyst", 1, 80000),
    ("Lead Analyst", 1, 120000);


INSERT INTO employees
(first_name, last_name, role_id, manager_id) VALUES
    ("Jane", "Doe", 2, NULL),
    ("John", "Doe", 1, 1),
    ("Janet", "Doth", 4, NULL),
    ("Jonathan", "Doth", 3, 4);

