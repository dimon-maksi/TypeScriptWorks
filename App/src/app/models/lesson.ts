import { DayOfWeek, TimeSlot } from './basic-types';

export type Lesson = {
	id: number;
	courseId: number;
	professorId: number;
	classroomNumber: string;
	dayOfWeek: DayOfWeek;
	timeSlot: TimeSlot;
};
