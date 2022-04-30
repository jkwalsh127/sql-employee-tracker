const initialPrompt = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'begin',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]

const addDepartment = [
    {
        type: 'input',
        message: "What is the edepartment's name?",
        name: 'departmentName'
    }
]

const addRole = [
    {
        type: 'input',
        message: "What is the role's name?",
        name: 'roleName'
    },
    {
        type: 'input',
        message: "What is the role's salary?",
        name: 'roleSalary'
    },
    {
        type: 'input',
        message: "What is the role's department?",
        name: 'roleDepartment'
    }
]

const addEmployee = [
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
        message: "What is the employees's role?",
        name: 'employeeRole'
    },
    {
        type: 'input',
        message: "Who is the employee's manager?",
        name: 'employeeManager'
    }
]

const updateEmployee = [
    {

    }
]



module.exports = {
    initialPrompt: initialPrompt,
    addDepartment: addDepartment,
    addEmployee: addEmployee,
    addRole: addRole
};