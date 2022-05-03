class Employee {
    constructor(firstName, lastName, role, manager) {
        if (typeof firstName !== 'string' || !firstName.trim().length) {
            throw new Error("Expected parameter 'firstName' to be a non empty string");
        }
        if (typeof lastName !== 'string' || !lastName.trim().length) {
            throw new Error("Expected parameter 'lastName' to be a non empty string");
        }
        if (isNaN(role) ||  role < 0) {
            throw new Error("Expected parameter 'role' to be a non-negative number");
        }
        if (typeof manager !== 'string' || !manager.trim().length) {
            throw new Error("Expected parameter 'manager' to be a non empty string");
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    }

    getFirstName() {
        return this.name
    };
    getLastName() {
        return this.id;
    };
    getEmployeeRole() {
        return this.email;
    };
    getEmployeeManager() {
        return this.manager;
    };
}

module.exports = Employee;