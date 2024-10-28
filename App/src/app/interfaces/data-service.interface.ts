// Base interface for services

export interface DataService<T> {
	getAll(): T[];
	getById(id: number | string): T | undefined;
	add(item: T): void;
	update(id: number | string, item: T): void;
	delete(id: number | string): void;
}
