import {Injectable} from '@angular/core';
import {ITodo} from '../models/todo.model';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	todos: ITodo[] = [
		{
			id: 1,
			title: 'Todo 1',
			description: 'Description 1',
			status: 'OPEN',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	constructor() {}

	getAllTodos() {
		return this.todos;
	}
}
