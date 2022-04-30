class Role {
    constructor(roleName, salary, roleDepartment) {
        if (typeof roleName !== 'string' || !roleName.trim().length) {
            throw new Error("Expected parameter 'roleName' to be a non empty string");
        }
        if (isNaN(salary) ||  salary < 0) {
            throw new Error("Expected parameter 'salary' to be a non-negative number");
        }
        if (typeof roleDepartment !== 'string' || !roleDepartment.trim().length) {
            throw new Error("Expected parameter 'roleDepartment' to be a non empty string");
        }
        this.roleName = roleName;
        this.salary = salary;
        this.roleDepartment = roleDepartment;
    }

    getRoleName() {
        return this.roleName;
    };
    getSalary() {
        return this.salary;
    };
    getRoleDepartment() {
        return this.roleDepartment;
    };
}

module.exports = Role;