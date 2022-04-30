class Update {
    constructor(roleName, employeeId) {
        if (typeof roleName !== 'string' || !roleName.trim().length) {
            throw new Error("Expected parameter 'roleName' to be a non empty string");
        }
        if (isNaN(employeeId) ||  employeeId < 0) {
            throw new Error("Expected parameter 'employeeId' to be a non-negative number");
        }
        this.roleName = roleName;
        this.employeeId = employeeId;
    }

    getRoleName() {
        return this.roleName;
    };
    getEmployeeId() {
        return this.employeeId;
    };
}

module.exports = Update;