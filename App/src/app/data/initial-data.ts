import { Classroom } from '../models/classroom';
import { Course } from '../models/course';
import { Lesson } from '../models/lesson';
import { Professor } from '../models/professor';

// The file where the mock data was created

export const professors: Professor[] = [
	{ id: 1, name: 'Dr. Smith', department: 'Computer Science' },
	{ id: 2, name: 'Dr. Johnson', department: 'Mathematics' },
	{ id: 3, name: 'Dr. Brown', department: 'Physics' },
	{ id: 4, name: 'Dr. Wilson', department: 'Chemistry' },
	{ id: 5, name: 'Dr. Taylor', department: 'Biology' },
	{ id: 6, name: 'Dr. Anderson', department: 'Literature' },
	{ id: 7, name: 'Dr. Thomas', department: 'History' },
	{ id: 8, name: 'Dr. Jackson', department: 'Philosophy' },
	{ id: 9, name: 'Dr. White', department: 'Economics' },
	{ id: 10, name: 'Dr. Harris', department: 'Psychology' },
];

export const classrooms: Classroom[] = [
	{ number: '101', capacity: 30, hasProjector: true },
	{ number: '102', capacity: 25, hasProjector: false },
	{ number: '103', capacity: 50, hasProjector: true },
	{ number: '104', capacity: 40, hasProjector: true },
	{ number: '105', capacity: 35, hasProjector: false },
	{ number: '201', capacity: 60, hasProjector: true },
	{ number: '202', capacity: 20, hasProjector: true },
	{ number: '203', capacity: 45, hasProjector: false },
	{ number: '204', capacity: 50, hasProjector: true },
	{ number: '205', capacity: 30, hasProjector: false },
];

export const courses: Course[] = [
	{ id: 1, name: 'Intro to Programming', type: 'Lecture' },
	{ id: 2, name: 'Advanced Mathematics', type: 'Seminar' },
	{ id: 3, name: 'Physics Lab', type: 'Lab' },
	{ id: 4, name: 'Organic Chemistry', type: 'Lecture' },
	{ id: 5, name: 'Microbiology', type: 'Lab' },
	{ id: 6, name: 'Shakespearean Literature', type: 'Seminar' },
	{ id: 7, name: 'World History', type: 'Lecture' },
	{ id: 8, name: 'Introduction to Philosophy', type: 'Seminar' },
	{ id: 9, name: 'Economics 101', type: 'Lecture' },
	{ id: 10, name: 'Abnormal Psychology', type: 'Lecture' },
];

export const schedule: Lesson[] = [
	{ id: 1, courseId: 1, professorId: 1, classroomNumber: '101', dayOfWeek: 'Monday', timeSlot: '8:30-10:00' },
	{ id: 2, courseId: 2, professorId: 2, classroomNumber: '102', dayOfWeek: 'Tuesday', timeSlot: '10:15-11:45' },
	{ id: 3, courseId: 3, professorId: 3, classroomNumber: '103', dayOfWeek: 'Wednesday', timeSlot: '12:15-13:45' },
];
