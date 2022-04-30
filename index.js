const inquirer = require('inquirer');
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
            return addDepartment();
        } else if (answers.begin === 'Add a role') {
            return addRole();
        } else if (answers.begin === 'Add an employee') {
            return addEmployee();
        } else if (answers.begin === 'Update an employee role') {
            return updateRole();
        }
    })
};

init();