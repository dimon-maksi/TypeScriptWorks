import { courseDto } from '../data/courseDto';
import { courses } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
import { CourseType } from '../models/basic-types';
import { Course } from '../models/course';

export class CourseService implements DataService<Course> {
	private data: Course[] = courses;

	// Return all available courses
	getAll(): Course[] {
		return this.data;
	}

	// Find a course by its ID
	getById(id: number): Course | undefined {
		return this.data.find((course) => course.id === id);
	}

	/**
	 * Returns the most popular course type (Lecture, Seminar, Lab, or Practice)
	 * by comparing the number of courses available for each type
	 */
	getMostPopularCourseType(): CourseType {
		let mostPopularCourseType: courseDto;

		// Compare counts to determine the most popular type
		mostPopularCourseType = this.getNumberOfCourseType('Lecture');
		mostPopularCourseType =
			this.getNumberOfCourseType('Seminar').count > mostPopularCourseType.count
				? this.getNumberOfCourseType('Seminar')
				: mostPopularCourseType;
		mostPopularCourseType =
			this.getNumberOfCourseType('Lab').count > mostPopularCourseType.count
				? this.getNumberOfCourseType('Lab')
				: mostPopularCourseType;
		mostPopularCourseType =
			this.getNumberOfCourseType('Practice').count > mostPopularCourseType.count
				? this.getNumberOfCourseType('Practice')
				: mostPopularCourseType;

		return mostPopularCourseType.name;
	}

	// Helper function to calculate the number of courses of a given type
	getNumberOfCourseType(courseType: CourseType): courseDto {
		const course: courseDto = {
			name: courseType,
			count: this.data.filter((c) => c.type === courseType).length,
		};

		return course;
	}

	// Add a new course to the list
	add(course: Course): void {
		this.data.push(course);
	}

	// Update the course if found
	update(id: number, updatedCourse: Course): void {
		const index = this.data.findIndex((course) => course.id === id);
		if (index !== -1) {
			this.data[index] = updatedCourse;
		}
	}

	// Remove the course from the list by ID
	delete(id: number): void {
		this.data = this.data.filter((course) => course.id !== id);
	}
}
