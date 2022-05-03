const inquirer = require('inquirer');
const fs = require('fs');
const departmentClass = require('./lib/department');
const roleClass = require('./lib/role');
const employeeClass = require('./lib/employee');
const updateClass = require('./lib/update');
const mysql = require('mysql2');

const initialPrompt = [
  {
      type: 'list',
      message: 'What would you like to do?',
      name: 'begin',
      choices: [
          'View all employees',
          'Add an employee',
          'View all roles',
          'Add a role', 
          'Update an employee role',
          'View all departments',
          'Add a department'
      ]
  }
]

const db = {
    con: mysql.createConnection(
      {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
      }
    )
}

async function queryDb(query) {
    try {
      let results = await db.con.promise().query(query);
        console.table(results[0]);
        init();
    } catch (error) {
      console.error(error);
    }
  }
  async function queryRoles(query) {
    try {
      let results = await db.con.promise().query(query);
        console.table(results[0]);
    } catch (error) {
      console.error(error);
    }
  }

const queries = {
    viewDepartments: 
      async function () {
        await queryDb("SELECT * FROM departments")
      },
    viewRoles: 
      async function() {
        await queryDb("SELECT * FROM roles")
      },
    viewEmployees: 
      async function() {
        await queryDb("SELECT e.id, e.first_name, e.last_name, roles.title, departments.name AS department, roles.salary, m.first_name AS manager FROM employees AS e LEFT JOIN employees AS m ON e.manager_id = m.id JOIN roles ON e.role_id = roles.id JOIN departments ON departments.id = roles.department")
      },
    addDepartment: 
      async function(answers) {
        let newDepartment = new departmentClass(answers.departmentName);
        await db.con.promise().query("INSERT INTO departments (name) VALUES (?)", answers.departmentName)
        console.log(`${answers.departmentName} added to the database`)
        init();
      },
    addRole: 
      async function(answers) {
        let checkRole = new roleClass(answers.roleTitle, answers.roleDepartment, answers.roleSalary);
        await db.con.promise().query("INSERT INTO roles (title, department, salary) VALUES (?, ?, ?)", [answers.roleTitle, answers.roleDepartment, answers.roleSalary])
        console.log(`${answers.roleTitle} added to the database`)
        init();
      },
    addEmployee: 
      async function(answers) {
        let newEmployee = new employeeClass(answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
        await db.con.promise().query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager])
        console.log(`${answers.employeeFirstName} added to the database`)
        init();
      },
    updateRole: 
        async function(answers) {
            let updateRole = new updateClass(answers.newRole, answers.employeeID);
            await db.con.promise().query("UPDATE employees SET role_id = ? WHERE id = ?;", [answers.newRole, answers.employeeID])
            console.log(`${answers.newRole} added to the database`)
            init();
        }
}

/**
 * the initiator function uses inquirer to begin calling the prompts
 * @returns {function}
 */
function init() {
    inquirer.prompt(initialPrompt).then((answers) => {
        if (answers.begin === 'View all departments') {
            return queries.viewDepartments();
        } else if (answers.begin === 'View all roles') {
            return queries.viewRoles();
        } else if (answers.begin === 'View all employees') {
            return queries.viewEmployees();     
        } else if (answers.begin === 'Add a department') {
          inquirer.prompt([
            {
              type: 'input',
              message: "What is the department's name?",
              name: 'departmentName'
            }
          ]).then((answers) => {
            return queries.addDepartment(answers);
          })
        } else if (answers.begin === 'Add a role') {
          inquirer.prompt([
            {
              type: 'input',
              message: "What is the role's name?",
              name: 'roleTitle'
            },
            {
              type: 'input',
              message: "What is the role's salary?",
              name: 'roleSalary'
            },
            {
              type: 'input',
              message: "What is the id of the role's department?",
              name: 'roleDepartment',
            }
          ]).then((answers) => {
            return queries.addRole(answers);
          })
        } else if (answers.begin === 'Add an employee') {
          inquirer.prompt([
            {
              type: 'input',
              message: "What is the employees's first name?",
              name: 'employeeFirstName'
            },
            {
              type: 'input',
              message: "What is the employees's last name?",
              name: 'employeeLastName'
            },
            {
              type: 'input',
              message: "What is the ID of the employees's role?",
              name: 'employeeRole'
            },
            {
              type: 'input',
              message: "What is the ID of the employee's manager? (Input 'NULL' if they are the manager)",
              name: 'employeeManager'
            }
          ]).then((answers) => {
            return queries.addEmployee(answers);
          })
        } else if (answers.begin === 'Update an employee role') {
          inquirer.prompt([
            {
              type: 'input',
              message: "What is the ID of the employee you would like to update?",
              name: 'employeeID'
            },
            {
              type: 'input',
              message: "What is the ID of the employee's new role?",
              name: 'newRole'
            }
          ]).then((answers) => {
            return queries.updateRole(answers);
          })
        }
    })
};

init();


