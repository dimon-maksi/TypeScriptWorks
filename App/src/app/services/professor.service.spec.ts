import { TestBed } from '@angular/core/testing';

import { ProfessorService } from './professor.service';
import { Professor } from '../models/professor';

describe('ProfessorService', () => {
	let professorService: ProfessorService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ProfessorService],
		});
		professorService = TestBed.inject(ProfessorService);
	});

	it('should get all professors', () => {
		const professors = professorService.getAll();
		expect(professors).toBeTruthy();
		expect(professors.length).toBeGreaterThan(0);
	});

	it('should get professor by id', () => {
		const professor = professorService.getById(1);
		expect(professor).toBeTruthy();
		expect(professor?.id).toBe(1);
	});

	it('should return undefined for non-existing professor id', () => {
		const professor = professorService.getById(999);
		expect(professor).toBeUndefined();
	});

	it('should add a new professor', () => {
		const newProfessor: Professor = { id: 11, name: 'Dr. New', department: 'Engineering' };
		professorService.add(newProfessor);

		const addedProfessor = professorService.getById(11);
		expect(addedProfessor).toBeTruthy();
		expect(addedProfessor?.name).toBe('Dr. New');
		expect(addedProfessor?.department).toBe('Engineering');
	});

	it('should update an existing professor', () => {
		const updatedProfessor: Professor = { id: 1, name: 'Dr. Updated', department: 'Mathematics' };
		professorService.update(1, updatedProfessor);

		const professor = professorService.getById(1);
		expect(professor?.name).toBe('Dr. Updated');
		expect(professor?.department).toBe('Mathematics');
	});

	it('should delete a professor by id', () => {
		const initialCount = professorService.getAll().length;

		professorService.delete(1);
		const professors = professorService.getAll();

		expect(professors.length).toBeLessThan(initialCount);
		expect(professorService.getById(1)).toBeUndefined();
	});
});
