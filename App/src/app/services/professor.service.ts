import { professors } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
import { Professor } from '../models/professor';

export class ProfessorService implements DataService<Professor> {
	private data: Professor[] = professors;

	// Return all professors
	getAll(): Professor[] {
		return this.data;
	}

	// Get a professor by ID
	getById(id: number): Professor | undefined {
		return this.data.find((professor) => professor.id === id);
	}

	//Add a new professor
	add(professor: Professor): void {
		this.data.push(professor);
	}

	// Update the details of an existing professor
	update(id: number, updatedProfessor: Professor): void {
		const index = this.data.findIndex((professor) => professor.id === id);
		if (index !== -1) {
			this.data[index] = updatedProfessor;
		}
	}

	// Delete a professor from the system
	delete(id: number): void {
		this.data = this.data.filter((professor) => professor.id !== id);
	}
}
