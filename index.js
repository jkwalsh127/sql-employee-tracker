const inquirer = require('inquirer');
const fs = require('fs');
let prompts = require('./src/prompts');
const departmentClass = require('./lib/department');
const roleClass = require('./lib/role');
const employeeClass = require('./lib/employee');
const updateClass = require('./lib/update');
const mysql = require('mysql2');
const cTable = require('console.table');


const db = {
    con: mysql.createConnection(
      {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
      }
    )
  };

async function queryDb(query) {
    try {
      let results = await db.con.promise().query(query);
        console.table(results[0]);
        askContinue();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateDb(query, answers) {
    try {
      let results = await db.con.promise().query(query, answers);
        console.table(results[0]);
        askContinue();
    } catch (error) {
      console.error(error);
    }
  }

function askContinue() {
  inquirer.prompt(prompts.continue).then( 
    function confirmed() {
      init();
    }
  )
};

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
        await updateDb("INSERT INTO departments (name) VALUES (?)", answers.departmentName)
      },
    // addDepartment: 
    //     function() {
    //     inquirer.prompt(prompts.addDepartment).then((answers) => {
    //         let newDepartment = new departmentClass(answers.departmentName);
    //         con.query("INSERT INTO departments (name) VALUES (?)", answers.departmentName, (err, result) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             return result;
    //         })
    //         .then( ([rows,fields]) => {
    //             console.table(rows);
    //         })
    //         .catch(console.log)
    //         .then( () => {
    //             console.log(`Added ${answers.departmentName} to the database`)
    //             init();
    //         });
    //     });
    //   },
    // addRole: 
    //     function() {
    //         inquirer.prompt(prompts.addRole()).then((answers) => {
    //             let newRole = new roleClass(answers.roleTitle, answers.roleDepartment, answers.roleSalary);
    //             con.promise().query("INSERT INTO roles (title, department, salary) VALUES (?)", [answers.roleTitle, answers.roleDepartment, answers.roleSalary], (err, result) => {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //                 return result;
    //             })
    //             .then( ([rows,fields]) => {
    //                 console.table(rows);
    //             })
    //             .catch(console.log)
    //             .then( () => {
    //                 console.log(`Added ${answers.roleTitle} to the database`)
    //                 init();
    //             });
    //         });
    //     },
    // addEmployee: 
    //     function() {
    //         inquirer.prompt(prompts.addEmployee).then((answers) => {
    //             let newEmployee = new employeeClass(answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
    //             con.promise().query("INSERT INTO employees (first_name) VALUES (?) INSERT INTO employees (last_name) VALUE (?) INSERT INTO employees VALUE (JOIN roles ON employees.role_id = roles.id)", [answers.roleTitle, answers.roleDepartment, answers.roleSalary], (err, result) => {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //                 return result;
    //             })
    //             .then( ([rows,fields]) => {
    //                 console.table(rows);
    //             })
    //             .catch(console.log)
    //             .then( () => {
    //                 console.log(`Added ${answers.roleTitle} to the database`)
    //                 init();
    //             });
    //         });
    //     },
    // updateRole: 
    //     function(answers) {
    //         let updateRole = new updateClass(answers.newRole, answers.employeeID);
    //         db.query("UPDATE employees SET role_id = ? WHERE id = ?;", [answers.newRole, answers.employeeID] , (err, result) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             return result;
    //         });
    //     }
}








/**
 * the initiator function uses inquirer to begin calling the prompts
 * @returns {function}
 */
function init() {
    inquirer.prompt(prompts.initialPrompt).then((answers) => {
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
        } 
        //else if (answers.begin === 'Add a role') {
        //     return queries.addRole(answers);
        // } else if (answers.begin === 'Add an employee') {
        //     return queries.addEmployee(answers);
        // } else if (answers.begin === 'Update an employee role') {
        //     return queries.updateRole();
        // }
    })
};

init();


