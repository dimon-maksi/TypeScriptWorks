"use strict";
// Enum for student status
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
// Enum for course type
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
// Enum for semester
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
// Enum for grade
var Grade;
(function (Grade) {
    Grade[Grade["Excellent"] = 5] = "Excellent";
    Grade[Grade["Good"] = 4] = "Good";
    Grade[Grade["Satisfactory"] = 3] = "Satisfactory";
    Grade[Grade["Unsatisfactory"] = 2] = "Unsatisfactory";
})(Grade || (Grade = {}));
// Enum for university faculties
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
// Class to manage the university system
class UniversityManagementSystem {
    // Internal arrays to store students, courses, and grade records
    students = [];
    courses = [];
    grades = [];
    // Counters to generate unique IDs for students and courses
    studentIdCounter = 1;
    courseIdCounter = 1;
    // Method to enroll a new student in the system
    enrollStudent(student) {
        const newStudent = {
            ...student,
            id: this.studentIdCounter++, // Automatically assign a unique ID
        };
        this.students.push(newStudent); // Add the student to the list
        return newStudent; // Return the newly enrolled student
    }
    // Method to register a student for a course
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId); // Find the student by ID
        const course = this.courses.find(c => c.id === courseId); // Find the course by ID
        if (!student || !course) {
            throw new Error('Student or Course not found'); // Throw an error if student or course doesn't exist
        }
        // Check if the student and course belong to the same faculty
        if (student.faculty !== course.faculty) {
            throw new Error('Student cannot register for a course from a different faculty'); // Faculty mismatch
        }
        // Check if the course has reached the maximum number of students
        const enrolledStudents = this.grades.filter(g => g.courseId === courseId).length;
        if (enrolledStudents >= course.maxStudents) {
            throw new Error('Course is full'); // Course capacity reached
        }
        // Register the student for the course by adding a grade record (initial grade is "Unsatisfactory")
        this.grades.push({ studentId, courseId, grade: Grade.Unsatisfactory, date: new Date(), semester: course.semester });
    }
    // Method to set a grade for a student in a course
    setGrade(studentId, courseId, grade) {
        const student = this.students.find(s => s.id === studentId); // Find the student
        const course = this.courses.find(c => c.id === courseId); // Find the course
        if (!student || !course) {
            throw new Error('Student or Course not found'); // Throw error if student or course doesn't exist
        }
        // Check if the student is registered for the course
        const registration = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
        if (!registration) {
            throw new Error('Student is not registered for this course'); // Throw error if not registered
        }
        registration.grade = grade; // Set the grade for the student
    }
    // Method to update the status of a student
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId); // Find the student
        if (!student) {
            throw new Error('Student not found'); // Throw error if student doesn't exist
        }
        // Validate if the status change is allowed
        if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) {
            throw new Error('Cannot update status for graduated or expelled students'); // Prevent status update for graduated or expelled students
        }
        student.status = newStatus; // Update the student's status
    }
    // Method to get a list of students from a specific faculty
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty); // Filter students by faculty
    }
    // Method to get a student's grade records
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId); // Return all grade records for the student
    }
    // Method to get available courses for a specific faculty and semester
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester); // Filter courses by faculty and semester
    }
    // Method to calculate the average grade for a student
    calculateAverageGrade(studentId) {
        const studentGrades = this.grades.filter(g => g.studentId === studentId); // Get all grades for the student
        if (studentGrades.length === 0) {
            throw new Error('No grades found for the student'); // Handle case where no grades exist
        }
        const totalGrade = studentGrades.reduce((sum, g) => sum + g.grade, 0); // Sum all grades
        return totalGrade / studentGrades.length; // Calculate and return the average grade
    }
    // Method to add a new course to the system
    addCourse(course) {
        const newCourse = { ...course, id: this.courseIdCounter++ }; // Assign a unique ID to the course
        this.courses.push(newCourse); // Add the course to the system
        return newCourse; // Return the added course
    }
    // Method to get a list of honors students (students with an "Excellent" grade) by faculty
    getHonorsByFaculty(faculty) {
        // Filter students who have "Excellent" grades and match the specified faculty
        const honorStudents = this.students.filter(student => {
            const grades = this.grades.filter(g => g.studentId === student.id); // Get grades for each student
            const averageGrade = grades.reduce((sum, g) => sum + g.grade, 0) / grades.length; // Calculate average grade
            return averageGrade === Grade.Excellent; // Select only students with an average grade of "Excellent"
        });
        return honorStudents.filter(s => s.faculty === faculty); // Return students from the specified faculty
    }
}
// Example usage of the university system
const universitySystem = new UniversityManagementSystem();
// Enroll students and add courses
const student1 = universitySystem.enrollStudent({
    fullName: 'Ivan Ivanov',
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: 'CS101',
});
const course1 = universitySystem.addCourse({
    name: 'Introduction to Programming',
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30,
});
// Register the student for the course
universitySystem.registerForCourse(student1.id, course1.id);
// Set the student's grade for the course
universitySystem.setGrade(student1.id, course1.id, Grade.Excellent);
// Calculate and log the average grade
const avgGrade = universitySystem.calculateAverageGrade(student1.id);
console.log('Average Grade:', avgGrade);
// Get and log the honors students from the Computer Science faculty
const honors = universitySystem.getHonorsByFaculty(Faculty.Computer_Science);
console.log('Honors Students:', honors);
