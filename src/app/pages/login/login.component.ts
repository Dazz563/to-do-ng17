import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
})
export class LoginComponent {
	isLogin = true;

	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
	});

	registerForm = new FormGroup({
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
	});

	submitLogin() {
		console.log(this.loginForm.value);
		if (this.loginForm.valid) {
			console.log('Form Submitted!', this.loginForm.value);
		} else {
			this.loginForm.markAllAsTouched();
		}
	}

	submitRegister() {
		console.log(this.loginForm.value);
		if (this.registerForm.valid) {
			console.log('Form Submitted!', this.registerForm.value);
		} else {
			this.registerForm.markAllAsTouched();
		}
	}
}
