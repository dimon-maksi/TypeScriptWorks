import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course';

describe('CourseService', () => {
	let courseService: CourseService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CourseService],
		});
		courseService = TestBed.inject(CourseService);
	});

	it('should get all courses', () => {
		const courses = courseService.getAll();
		expect(courses).toBeTruthy();
		expect(courses.length).toBeGreaterThan(0);
	});

	it('should get course by id', () => {
		const course = courseService.getById(1);
		expect(course).toBeTruthy();
		expect(course?.id).toBe(1);
	});

	it('should return undefined for non-existing course id', () => {
		const course = courseService.getById(999);
		expect(course).toBeUndefined();
	});

	it('should return the most popular course type', () => {
		const mostPopularCourseType = courseService.getMostPopularCourseType();
		expect(mostPopularCourseType).toBeTruthy();
		expect(['Lecture', 'Seminar', 'Lab', 'Practice']).toContain(mostPopularCourseType);
		expect(mostPopularCourseType).toBe('Lecture');
	});

	it('should get correct number of course types', () => {
		const lectureCount = courseService.getNumberOfCourseType('Lecture');
		expect(lectureCount.count).toBeGreaterThan(0);

		const seminarCount = courseService.getNumberOfCourseType('Seminar');
		expect(seminarCount.count).toBeGreaterThan(0);

		const labCount = courseService.getNumberOfCourseType('Lab');
		expect(labCount.count).toBeGreaterThan(0);
	});

	it('should add a new course', () => {
		const newCourse: Course = { id: 11, name: 'Data Science', type: 'Lecture' };
		courseService.add(newCourse);

		const addedCourse = courseService.getById(11);
		expect(addedCourse).toBeTruthy();
		expect(addedCourse?.name).toBe('Data Science');
	});

	it('should update an existing course', () => {
		const updatedCourse: Course = { id: 1, name: 'Intro to Python', type: 'Lecture' };
		courseService.update(1, updatedCourse);

		const course = courseService.getById(1);
		expect(course?.name).toBe('Intro to Python');
	});

	it('should delete a course by id', () => {
		const initialCount = courseService.getAll().length;

		courseService.delete(1);
		const courses = courseService.getAll();

		expect(courses.length).toBeLessThan(initialCount);
		expect(courseService.getById(1)).toBeUndefined();
	});
});
