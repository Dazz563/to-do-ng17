export const environment = {
	CURRENT_TOKEN: 'CURRENT_TOKEN',
	production: false,
	apiBaseUrl: 'http://localhost:3000',
	apiEndpoints: {
		login: 'api/login',
		register: '/api/register',
		logout: '/api/logout',
		getUser: '/api/user',

		getAllTodos: '/api/todos',
		getTodoById: '/api/todos/:id',
		createTodo: '/api/todos',
		updateTodo: '/api/todos/:id',
		deleteTodo: '/api/todos/:id',
	},
};
