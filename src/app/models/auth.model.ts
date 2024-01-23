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
	name: string;
	surname: string;
	email: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
}
