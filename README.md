# University Management System

## Project Overview

This project aims to develop a system for managing university class schedules using TypeScript concepts, including Union Types, Type Aliases, and Arrays. 
Built with the Angular v17 framework. Controllers are covered with unit tests.

## Product Requirements
### Tasks

1. Definition of Basic Types
- **DayOfWeek**: Create a type alias for the days of the week (`"Monday" | "Tuesday" | ... | "Friday"`).
- **TimeSlot**: Create a union type for possible class time slots (`"8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15"`).
- **CourseType**: Define a type alias for class types (`"Lecture" | "Seminar" | "Lab" | "Practice"`).

2. Creation of Core Structures
- **Professor**: Create a type alias with fields: `id (number)`, `name (string)`, `department (string)`.
- **Classroom**: Define a type alias with fields: `number (string)`, `capacity (number)`, `hasProjector (boolean)`.
- **Course**: Create a type alias with fields: `id (number)`, `name (string)`, `type (CourseType)`.
- **Lesson**: Define a type alias with fields: `courseId (number)`, `professorId (number)`, `classroomNumber (string)`, `dayOfWeek (DayOfWeek)`, `timeSlot (TimeSlot)`.

3. Working with Data Arrays
- Create arrays: `professors: Professor[]`, `classrooms: Classroom[]`, `courses: Course[]`, and `schedule: Lesson[]`.
- Implement a function `addProfessor(professor: Professor): void` to add a new professor.
- Create a function `addLesson(lesson: Lesson): boolean` to add a lesson to the schedule if there are no conflicts.

4. Search and Filtering Functions
- Implement `findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[]` to return available classroom numbers at the specified time.
- Create a function `getProfessorSchedule(professorId: number): Lesson[]` to return the schedule for a specific professor.

5. Conflict Handling and Validation
- Create a type alias `ScheduleConflict` with fields: `type ("ProfessorConflict" | "ClassroomConflict")`, `lessonDetails: Lesson`.
- Implement `validateLesson(lesson: Lesson): ScheduleConflict | null` to check for conflicts in the schedule when adding a new lesson.

6. Analysis and Reporting
- Implement `getClassroomUtilization(classroomNumber: string): number` to return the percentage of classroom utilization.
- Create `getMostPopularCourseType(): CourseType` to determine the most popular type of class.

7. Data Modification
- Write a function `reassignClassroom(lessonId: number, newClassroomNumber: string): boolean` to change the classroom for a lesson if possible.
- Implement `cancelLesson(lessonId: number): void` to remove a lesson from the schedule.

### Expected Outcomes
- All types are correctly defined using type aliases and union types.
- Functions are implemented with correct parameter typing and return values.
- Efficient data array management, including adding, deleting, and searching for elements.
- Proper handling of scheduling conflicts and data validation.
- Analysis functions provide useful insights into university resource utilization.

### Completion Criteria
- All tasks are implemented and functioning correctly.
- Code is written using proper TypeScript practices without interfaces or generics.
- Consistent and correct typing is used throughout the project.
- Functions return expected results for various inputs.
- Basic error handling and edge case scenarios are implemented.
- Code is accompanied by brief comments explaining the logic behind complex parts.

## Project structure

```
└───App
    └───src
        ├───app
        │   ├───components
        │   │   ├───footer
        │   │   ├───home
        │   │   ├───lesson
        │   │   │   ├───create
        │   │   │   └───update
        │   │   ├───nav
        │   │   └───schedule
        │   ├───data
        │   ├───interfaces
        │   ├───models
        │   └───services
        └───assets
```
