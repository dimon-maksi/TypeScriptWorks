import { schedule } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
import { ScheduleConflict } from '../models/basic-types';
import { Lesson } from '../models/lesson';

export class LessonService implements DataService<Lesson> {
	private data: Lesson[] = schedule;

	// Return all lessons in the schedule
	getAll(): Lesson[] {
		return this.data;
	}

	// Find a specific lesson by ID
	getById(id: number): Lesson | undefined {
		return this.data.find((lesson) => lesson.id === id);
	}

	// Get the full schedule for a given professor by filtering based on professorId.
	getProfessorSchedule(professorId: number): Lesson[] {
		if (professorId < 0) throw new Error('Id is out of range');
		return this.data.filter((p) => p.professorId === professorId);
	}

	/**
	 * Calculate classroom utilization as a percentage by comparing the number of lessons
	 * in a specific classroom with the total number of lessons possible per week
	 */
	getClassroomUtilization(classroomNumber: string): number {
		const countPerWeek = this.data.filter((p) => p.classroomNumber === classroomNumber).length;
		const lessonsPerWeek = 7 * 6; // Assuming 7 days a week, 6 time slots per day
		return countPerWeek / lessonsPerWeek;
	}

	// Add a new lesson to the schedule if there are no conflicts
	add(lesson: Lesson): boolean {
		// Validate lesson for conflicts
		const result = this.validateLesson(lesson);
		if (result === null) {
			this.data.push(lesson);
			return true;
		}

		// Handle different types of conflicts by throwing appropriate errors
		if (result === 'ClassroomConflict') throw new Error('Classroom conflict');
		if (result === 'ProfessorConflict') throw new Error('Professor conflict');
		return false;
	}

	// Update the lesson if it exists
	update(id: number, updatedLesson: Lesson): void {
		const index = this.data.findIndex((lesson) => lesson.id === id);
		if (index !== -1) {
			this.data[index] = updatedLesson;
		}
	}

	// Remove the lesson from the schedule by ID
	delete(id: number): void {
		this.data = this.data.filter((lesson) => lesson.id !== id);
	}

	// Validate a lesson for potential scheduling conflicts with professors and classrooms
	validateLesson(lesson: Lesson): ScheduleConflict | null {
		if (this.validateProfessor(lesson.professorId, lesson.dayOfWeek, lesson.timeSlot) !== null)
			return 'ProfessorConflict';
		if (this.validateClassroom(lesson.classroomNumber, lesson.dayOfWeek, lesson.timeSlot) !== null)
			return 'ClassroomConflict';
		return null;
	}

	// Validate that the professor is available during the specified day and time slot
	validateProfessor(professorId: number, dayOfWeek: string, timeSlot: string): 'ProfessorConflict' | null {
		const lessonsInDay = this.data
			.filter((p) => p.dayOfWeek === dayOfWeek)
			.filter((p) => p.timeSlot === timeSlot)
			.filter((p) => p.professorId === professorId);

		return lessonsInDay.length === 0 ? null : 'ProfessorConflict';
	}

	// Validate that the classroom is available during the specified day and time slot
	validateClassroom(classroomNumber: string, dayOfWeek: string, timeSlot: string): 'ClassroomConflict' | null {
		const lessonsInDay = this.data
			.filter((p) => p.dayOfWeek === dayOfWeek)
			.filter((p) => p.timeSlot === timeSlot)
			.filter((p) => p.classroomNumber === classroomNumber);

		return lessonsInDay.length === 0 ? null : 'ClassroomConflict';
	}
}
