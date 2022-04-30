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
    console.log(`Connected to the company_db database.`)
);
const con = mysql.createConnection(
    {host:'localhost', user: 'root', password: 'password', database: 'company_db'}
  );

// viewDepartments = () => {
//     return new Promise((resolve, reject) => {
//         con.query('SELECT * FROM departments', (error, elements) => {
//             if(error) {
//                 return reject(error);
//             }
//             return resolve(elements);
//         })
//     })
// }


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
    con.promise().query
    ("SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.department, roles.salary, employees.manager_id FROM employees JOIN roles ON employees.role_id = employees.id")
    .then( ([rows,fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    .then( () => con.end());
};

function addDepartment(answers) {
    let newDepartment = new departmentClass(answers.departmentName);
    db.query("INSERT INTO departments (department_name) VALUES (?);", answers.departmentName, (err, result) => {
        if (err) {
            console.log(err);
        }
        return result;
    });
};
function addRole(answers) {
    let newRole = new roleClass(answers.roleName, answers.roleSalary, answers.roleDepartment);
    db.query("INSERT INTO roles (title, salary, department_id) VALUES (?);", [ answers.roleName, answers.roleSalary, answers.roleDepartment ] , (err, result) => {
        if (err) {
            console.log(err);
        }
        return result;
    });
};
function addEmployee(answers) {
    let newEmployee = new employeeClass(answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
    db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?);", [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager ], (err, result) => {
        if (err) {
            console.log(err);
        }
        return result;
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