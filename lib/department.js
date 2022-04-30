class Department {
    constructor(departmentName) {
        if (typeof departmentName !== 'string' || !departmentName.trim().length) {
            throw new Error("Expected parameter 'departmentName' to be a non empty string");
        }
        this.departmentName = departmentName;
    }

    getName() {
        return this.departmentName;
    };
}

module.exports = Department;