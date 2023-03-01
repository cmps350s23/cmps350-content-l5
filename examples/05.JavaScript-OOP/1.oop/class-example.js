class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    greet() {
        return `Salamou Aleikoum. My name is ${this.fullname}`;
    }
}

class Student extends Person {
    constructor(firstname, lastname, gpa) {
        super(firstname, lastname);
        this.gpa = gpa;
    }

    greet() {
        return `${super.greet()}. My gpa is ${this.gpa}`;
    }
}

class Teacher extends Person {
    constructor(firstname, lastname, office) {
        super(firstname, lastname);
        this.office = office;
    }

    greet() {
        return `${super.greet()}. My office is ${this.office}`;
    }
}

const student1 = new Student("Fatima", "Saleh", 3.7 );
console.log(student1.greet());

const teacher1 = new Teacher("Abdullah", "Al-Ali", "E103" );
console.log(teacher1.greet());