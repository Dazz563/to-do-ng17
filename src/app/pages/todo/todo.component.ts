import {Component, Inject, OnInit} from '@angular/core';
import {ITodoStatus, TodoCardComponent} from '../../shared/components/todo-card/todo-card.component';
import {TodoService} from '../../services/todo.service';
import {ITodo} from '../../models/todo.model';
import {SlidePanelComponent} from '../../shared/ui/slide-panel/slide-panel.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-todo',
	standalone: true,
	imports: [
		CommonModule, //
		ReactiveFormsModule,
		TodoCardComponent,
		SlidePanelComponent,
	],
	templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
	todoForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		status: new FormControl('OPEN', [Validators.required]),
	});
	todoStatus = ITodoStatus;
	todos: ITodo[] = [];
	isSlidePanelOpen = false;

	constructor(
		private todoService: TodoService, //
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.getAllTodos();
		this.authService.getUser().subscribe({
			next: (res) => {
				console.log(res);
			},
		}); //
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

	// Form getters
	isInvalid(controlName: string): boolean {
		const control = this.todoForm.get(controlName);
		return !!control?.invalid && control?.touched;
	}

	isValid(controlName: string): boolean {
		const control = this.todoForm.get(controlName);
		return !!control?.valid && control?.touched;
	}

	onSave() {
		if (this.todoForm.valid) {
			console.log('Form Submitted!', this.todoForm.value);
		} else {
			this.todoForm.markAllAsTouched();
		}
	}
}
