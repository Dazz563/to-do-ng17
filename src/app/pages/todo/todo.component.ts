import {Component, Inject, OnInit} from '@angular/core';
import {TodoCardComponent} from '../../shared/components/todo-card/todo-card.component';
import {TodoService} from '../../services/todo.service';
import {ITodo} from '../../models/todo.model';

@Component({
	selector: 'app-todo',
	standalone: true,
	imports: [TodoCardComponent],
	templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
	todos: ITodo[] = [];

	constructor(private todoService: TodoService) {}

	ngOnInit(): void {
		this.getAllTodos();
	}

	getAllTodos() {
		this.todos = this.todoService.getAllTodos();
	}
}
