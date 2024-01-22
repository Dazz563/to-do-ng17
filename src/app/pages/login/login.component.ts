import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl} from '@angular/forms';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './login.component.html',
})
export class LoginComponent {
	isLogin = true;
	showPassword = false;

	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
	});

	registerForm = new FormGroup(
		{
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
			confirmPassword: new FormControl('', [Validators.required]),
		},
		{
			validators: this.passwordMatchValidator,
		}
	);

	// Custom validator function
	passwordMatchValidator(control: AbstractControl) {
		const password = control.get('password')?.value;
		const confirmPassword = control.get('confirmPassword')?.value;

		return password === confirmPassword ? null : {mismatch: true};
	}

	submitLogin() {
		console.log(this.loginForm.value);
		if (this.loginForm.valid) {
			console.log('Form Submitted!', this.loginForm.value);
		} else {
			this.loginForm.markAllAsTouched();
		}
	}

	submitRegister() {
		console.log(this.registerForm.value);
		if (this.registerForm.valid) {
			console.log('Form Submitted!', this.registerForm.value);
		} else {
			this.registerForm.markAllAsTouched();
		}
	}
}
