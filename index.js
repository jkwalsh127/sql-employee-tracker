const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
let prompts = require('./src/prompts');
const departmentClass = require('./lib/department');
const roleClass = require('./lib/role');
const employeeClass = require('./lib/employee');
const updateClass = require('./lib/update');
const cTable = require('console.table');


/**
 * the initiator function uses inquirer to begin calling the prompts
 * @returns {function}
 */
function init() {
    inquirer.prompt(prompts.initialPrompt).then((answers) => {
        if (answers.begin === 'View all departments') {
            return viewDepartments();
        } else if (answers.begin === 'View all roles') {
            return viewRoles();
        } else if (answers.begin === 'View all employees') {
            return viewEmployees();     
        } else if (answers.begin === 'Add a department') {
            return addDepartment(answers);
        } else if (answers.begin === 'Add a role') {
            return addRole(answers);
        } else if (answers.begin === 'Add an employee') {
            return addEmployee(answers);
        } else if (answers.begin === 'Update an employee role') {
            return updateRole();
        }
    })
};

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    },
);
const con = mysql.createConnection(
    {host:'localhost', user: 'root', password: 'password', database: 'company_db'}
  );

function viewDepartments() {
    con.promise().query("SELECT * FROM departments")
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then( () => con.end());
};

function viewRoles() {
    con.promise().query("SELECT * FROM roles")
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then( () => con.end());
};

function viewEmployees() {
    con.promise().query("SELECT e.id, e.first_name, e.last_name, roles.title, departments.name AS department, roles.salary, m.first_name AS manager FROM employees AS e LEFT JOIN employees AS m ON e.manager_id = m.id JOIN roles ON e.role_id = roles.id JOIN departments ON departments.id = roles.department")
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then( () => con.end());
};

function addDepartment() {
    inquirer.prompt(prompts.addDepartment).then((answers) => {
        let newDepartment = new departmentClass(answers.departmentName);
        con.promise().query("INSERT INTO departments (name) VALUES (?)", answers.departmentName, (err, result) => {
            if (err) {
                console.log(err);
            }
            return result;
        })
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then( () => {
            console.log(`Added ${answers.departmentName} to the database`)
            init();
        });
    });
};
function addRole() {
    inquirer.prompt(prompts.addRole).then((answers) => {
        let newRole = new roleClass(answers.roleTitle, answers.roleDepartment, answers.roleSalary);
        con.promise().query("INSERT INTO roles (title, department, salary) VALUES (?)", [answers.roleTitle, answers.roleDepartment, answers.roleSalary], (err, result) => {
            if (err) {
                console.log(err);
            }
            return result;
        })
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then( () => {
            console.log(`Added ${answers.roleTitle} to the database`)
            init();
        });
    });
};
function addEmployee() {
    inquirer.prompt(prompts.addEmployee).then((answers) => {
        let newEmployee = new employeeClass(answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
        con.promise().query("INSERT INTO employees (first_name) VALUES (?) INSERT INTO employees (last_name) VALUE (?) INSERT INTO employees VALUE (JOIN roles ON employees.role_id = roles.id)", [answers.roleTitle, answers.roleDepartment, answers.roleSalary], (err, result) => {
            if (err) {
                console.log(err);
            }
            return result;
        })
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then( () => {
            console.log(`Added ${answers.roleTitle} to the database`)
            init();
        });
    });
};
function updateRole(answers) {
    let updateRole = new updateClass(answers.newRole, answers.employeeID);
    db.query("UPDATE employees SET role_id = ? WHERE id = ?;", [answers.newRole, answers.employeeID] , (err, result) => {
        if (err) {
            console.log(err);
        }
        return result;
    });
};


init();