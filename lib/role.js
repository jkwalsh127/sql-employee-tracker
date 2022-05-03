class Role {
    constructor(roleTitle, roleDepartment, roleSalary) {
        if (typeof roleTitle !== 'string' || !roleTitle.trim().length) {
            throw new Error("Expected parameter 'roleName' to be a non empty string");
        }
        if  (isNaN(roleDepartment) ||  roleDepartment < 0) {
            throw new Error("Expected parameter 'department' to be a non-negative number");
        }
        if (isNaN(roleSalary) ||  roleSalary < 0) {
            throw new Error("Expected parameter 'salary' to be a non-negative number");
        }
        this.roleTitle = roleTitle;
        this.roleDepartment = roleDepartment;
        this.roleSalary = roleSalary;
    }

    getRoleName() {
        return this.roleTitle;
    };
    getRoleDepartment() {
        return this.roleDepartment;
    };
    getSalary() {
        return this.roleSalary;
    };
}

module.exports = Role;