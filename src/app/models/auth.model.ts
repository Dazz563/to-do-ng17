export interface IUser {
	id: number;
	firstName: string;
	email: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IRegister {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface ILoginResponse {
	token: string;
}
