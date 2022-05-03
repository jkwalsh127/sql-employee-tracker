const initialPrompt = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'begin',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]

// , 'Add a department', 'Add a role', 'Add an employee', 

// const addDepartment = [
//     {
//         type: 'input',
//         message: "What is the department's name?",
//         name: 'departmentName'
//     }
// ]

// const addRole = async () => {
//     const deps = await con.query("SELECT name FROM departments", function (err, results) {
//         var here = Object.values(results);
//         console.log(here);
//     });
//     return new Promise( (resolve, reject) => {
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 message: "What is the role's name?",
//                 name: 'roleTitle'
//             },
//             {
//                 type: 'input',
//                 message: "What is the role's salary?",
//                 name: 'roleSalary'
//             },
//             {
//                 type: 'list',
//                 message: "What is the role's department?",
//                 name: 'roleDepartment',
//                 choices: here
//             }
//         ]);
//     }); .then( ({  }))
// };


// const addEmployee = [
//     {
//         type: 'input',
//         message: "What is the employees's first name?",
//         name: 'employeeFirstName'
//     },
//     {
//         type: 'input',
//         message: "What is the employees's last name?",
//         name: 'employeeLastName'
//     },
//     {
//         type: 'input',
//         message: "What is the employees's role?",
//         name: 'employeeRole'
//     },
//     {
//         type: 'input',
//         message: "Who is the employee's manager?",
//         name: 'employeeManager'
//     }
// ]

// const updateEmployee = [
//     {
//         type: 'input',
//         message: "What is the ID of the employee you would like to update?",
//         name: 'employeeID'
//     },
//     {
//         type: 'input',
//         message: "What would you like the employee's new role to be?",
//         name: 'newRole'
//     }
// ]

module.exports = {
    initialPrompt: initialPrompt,
};