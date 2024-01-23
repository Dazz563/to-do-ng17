import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ILogin} from '../../models/auth.model';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './login.component.html',
})
export class LoginComponent {
	isLogin = true;
	showPassword = false;

	constructor(private authService: AuthService) {}

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

	// Login form getters
	isInvalidLogin(controlName: string): boolean {
		const control = this.loginForm.get(controlName);
		return !!control?.invalid && control?.touched;
	}

	isValidLogin(controlName: string): boolean {
		const control = this.loginForm.get(controlName);
		return !!control?.valid && control?.touched;
	}

	// Register form getters
	isInvalidRegister(controlName: string): boolean {
		const control = this.registerForm.get(controlName);
		return !!control?.invalid && control?.touched;
	}

	isValidRegister(controlName: string): boolean {
		const control = this.registerForm.get(controlName);
		return !!control?.valid && control?.touched;
	}

	submitLogin() {
		console.log(this.loginForm.value);
		if (this.loginForm.valid) {
			this.authService.onLogin(this.loginForm.value as ILogin).subscribe({
				next: (res) => {
					console.log('login res: ', res);
				},
				error: (err) => {},
			});
		} else {
			this.loginForm.markAllAsTouched();
		}
	}

	submitRegister() {
		console.log(this.registerForm.value);
		if (this.registerForm.valid) {
		} else {
			this.registerForm.markAllAsTouched();
		}
	}
}
