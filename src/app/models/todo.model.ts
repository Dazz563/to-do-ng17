import {ITodoType} from '../shared/components/todo-card/todo-card.component';

export interface ITodo {
	id: number;
	title: string;
	description: string;
	status: ITodoType;
	createdAt: Date;
	updatedAt: Date;
}
