import {Component, Inject, OnInit} from '@angular/core';
import {TodoCardComponent} from '../../shared/components/todo-card/todo-card.component';
import {TodoService} from '../../services/todo.service';
import {ITodo} from '../../models/todo.model';
import {SlidePanelComponent} from '../../shared/ui/slide-panel/slide-panel.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-todo',
	standalone: true,
	imports: [TodoCardComponent, SlidePanelComponent],
	templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
	todoForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		status: new FormControl('OPEN', [Validators.required]),
	});
	todos: ITodo[] = [];
	isSlidePanelOpen = false;

	constructor(private todoService: TodoService) {}

	ngOnInit(): void {
		this.getAllTodos();
	}

	getAllTodos() {
		this.todos = this.todoService.getAllTodos();
	}

	openSlidePanel() {
		this.isSlidePanelOpen = true;
	}

	onCloseSlidePanel() {
		this.isSlidePanelOpen = false;
	}
}
