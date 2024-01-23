import {Component, Input} from '@angular/core';
import {ITodo} from '../../../models/todo.model';

export type ITodoType = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
export const ITodoStatus = ['OPEN', 'PROGRESS', 'TESTING', 'DONE'];

@Component({
	selector: 'app-todo-card',
	standalone: true,
	imports: [],
	templateUrl: './todo-card.component.html',
})
export class TodoCardComponent {
	@Input() type: ITodoType = 'OPEN';
	@Input() todo!: ITodo;
}
