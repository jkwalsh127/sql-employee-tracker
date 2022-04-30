const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
let prompts = require('./src/prompts');
const { addDepartment } = require('./src/prompts');

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
    console.log(`Connected to the company_db database.`)
);

function viewDepartments() {
    db.query("SELECT * FROM department", function (err, results) {
        return results;
    });
}
function viewRoles() {
    db.query("SELECT * FROM roles", function (err, results) {
        return results;
    });
}
function viewEmployees() {
    db.query("SELECT * FROM employees", function (err, results) {
        return results;
    });
}

function addDepartment(answers) {
    db.query("INSERT INTO departments (department_name) VALUES (?);", answers.departmentName, (err, result) => {
        if (err) {
            console.log(err);
        }
        return result;
    });
};
function addRole(answers) {
    db.query("INSERT INTO roles (title, salary, department_id) VALUES (?);", [ answers.roleName, answers.roleSalary, answers.roleDepartment ] , (err, result) => {
        if (err) {
            console.log(err);
        }
        return result;
    });
};
function addEmployee(answers) {
    db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?);", [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager ], (err, result) => {
        if (err) {
            console.log(err);
        }
        return result;
    });
};
function updateRole(answers) {
    db.query("UPDATE employees SET role_id = ? WHERE id = ?;", [answers.newRole, answers.employeeID] , (err, result) => {
        if (err) {
            console.log(err);
        }
        return result;
    });
};


init();