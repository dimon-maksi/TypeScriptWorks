import { TestBed } from '@angular/core/testing';

import { ClassroomService } from './classroom.service';
import { LessonService } from './lesson.service';
import { Classroom } from '../models/classroom';

describe('ClassroomService', () => {
	let classroomService: ClassroomService;
	let lessonService: LessonService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ClassroomService, LessonService],
		});
		classroomService = TestBed.inject(ClassroomService);
		lessonService = TestBed.inject(LessonService);
	});

	it('should return all classrooms', () => {
		const classrooms = classroomService.getAll();
		expect(classrooms.length).toBeGreaterThan(0);
	});

	it('should return classroom by ID', () => {
		const classroom = classroomService.getById('101');
		expect(classroom).toBeTruthy();
		expect(classroom?.number).toBe('101');
	});

	it('should throw an error when getting by an empty ID', () => {
		expect(() => classroomService.getById('')).toThrowError('Empty string');
	});

	it('should add a new classroom', () => {
		const newClassroom: Classroom = { number: '104', capacity: 30, hasProjector: true };
		classroomService.add(newClassroom);
		const classroom = classroomService.getById('104');
		expect(classroom).toBeTruthy();
		expect(classroom?.number).toBe('104');
	});

	it('should update an existing classroom', () => {
		const updatedClassroom: Classroom = { number: '101', capacity: 40, hasProjector: false };
		classroomService.update('101', updatedClassroom);
		const classroom = classroomService.getById('101');
		expect(classroom).toEqual(updatedClassroom);
	});

	it('should throw an error when updating with an empty ID', () => {
		expect(() => classroomService.update('', { number: '', capacity: 0, hasProjector: false })).toThrowError(
			'Empty string',
		);
	});

	it('should delete a classroom', () => {
		classroomService.delete('101');
		const classroom = classroomService.getById('101');
		expect(classroom).toBeUndefined();
	});

	it('should throw an error when deleting with an empty ID', () => {
		expect(() => classroomService.delete('')).toThrowError('Empty string');
	});

	it('should return available classrooms', () => {
		jest.spyOn(lessonService, 'getAll').mockReturnValue([
			{ id: 1, courseId: 1, professorId: 1, classroomNumber: '101', dayOfWeek: 'Monday', timeSlot: '8:30-10:00' },
			{ id: 2, courseId: 2, professorId: 2, classroomNumber: '102', dayOfWeek: 'Monday', timeSlot: '10:15-11:45' },
		]);

		const availableClassrooms = classroomService.findAvailableClassrooms('8:30-10:00', 'Monday');
		expect(availableClassrooms).not.toContain('101');
	});

	it('should reassign a classroom', () => {
		jest.spyOn(lessonService, 'getById').mockReturnValue({
			id: 1,
			courseId: 1,
			professorId: 1,
			classroomNumber: '101',
			dayOfWeek: 'Monday',
			timeSlot: '8:30-10:00',
		});
		jest.spyOn(classroomService, 'findAvailableClassrooms').mockReturnValue(['102']);

		const result = classroomService.reassignClassroom(1, '102');
		expect(result).toBeTruthy();
	});

	it('should return false if classroom is not available for reassignment', () => {
		jest.spyOn(lessonService, 'getById').mockReturnValue({
			id: 1,
			courseId: 1,
			professorId: 1,
			classroomNumber: '101',
			dayOfWeek: 'Monday',
			timeSlot: '8:30-10:00',
		});
		jest.spyOn(classroomService, 'findAvailableClassrooms').mockReturnValue([]);

		const result = classroomService.reassignClassroom(1, '103');
		expect(result).toBeFalsy();
	});

	it('should throw an error if lessonId is out of range when reassigning', () => {
		expect(() => classroomService.reassignClassroom(-1, '102')).toThrowError('Id is out of range');
	});

	it('should throw an error when reassigning with empty classroom number', () => {
		expect(() => classroomService.reassignClassroom(1, '')).toThrowError('Empty string');
	});
});
