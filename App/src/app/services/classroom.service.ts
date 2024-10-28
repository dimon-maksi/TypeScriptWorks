import { classrooms } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
import { DayOfWeek, TimeSlot } from '../models/basic-types';
import { Classroom } from '../models/classroom';
import { LessonService } from './lesson.service';

export class ClassroomService implements DataService<Classroom> {
	private data: Classroom[] = classrooms;
	// Return all available classrooms
	getAll(): Classroom[] {
		return this.data;
	}

	// Find classroom by number
	getById(number: string): Classroom | undefined {
		if (number === '') throw new Error('Empty string');
		return this.data.find((classroom) => classroom.number === number);
	}

	// Find available classrooms for a specific timeslot and day
	findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
		const availableClassrooms: string[] = this.data.map((c) => c.number);
		const lessonService = new LessonService();
		const lessons = lessonService.getAll();
		if (lessons.length === 0) throw new Error('Lessons list is empty');

		// Filter out classrooms that are already in use during the specified timeslot and day
		const activeLessons = lessons
			.filter((l) => l.dayOfWeek === dayOfWeek)
			.filter((l) => l.timeSlot === timeSlot)
			.map((c) => c.classroomNumber);
		if (activeLessons.length === 0) return availableClassrooms;

		return availableClassrooms.filter((c) => !activeLessons.includes(c));
	}

	// Add a new classroom to the list
	add(classroom: Classroom): void {
		this.data.push(classroom);
	}

	// Update the classroom data
	update(number: string, updatedClassroom: Classroom): void {
		if (number === '') throw new Error('Empty string');
		const index = this.data.findIndex((classroom) => classroom.number === number);
		if (index === -1) throw new Error("Entity isn't in Classroom list");

		this.data[index] = updatedClassroom;
	}

	/**
	 * Reassign a lesson to a new classroom, ensuring the new classroom is available
	 * Returns `true` if the reassignment was successful, `false` otherwise
	 */
	reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
		if (lessonId < 0) throw new Error('Id is out of range');
		if (newClassroomNumber === '') throw new Error('Empty string');

		const lessonService = new LessonService();
		const lesson = lessonService.getById(lessonId);
		if (lesson === undefined) return false;

		// Check available classrooms
		const availableClassrooms = this.findAvailableClassrooms(lesson.timeSlot, lesson.dayOfWeek);
		if (availableClassrooms.length === 0) return false;

		const result = availableClassrooms.indexOf(newClassroomNumber);

		if (result != -1) {
			lessonService.update(lessonId, lesson);
			return true;
		}
		return false;
	}

	// Remove classroom from the list
	delete(number: string): void {
		if (number === '') throw new Error('Empty string');
		this.data = this.data.filter((classroom) => classroom.number !== number);
	}
}
