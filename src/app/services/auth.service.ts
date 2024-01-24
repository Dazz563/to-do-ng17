import {Injectable} from '@angular/core';
import {ILogin, ILoginResponse, IRegister} from '../models/auth.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {map} from 'rxjs';
import {TokenService} from './token.service';
import {Router} from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private http: HttpClient, //
		private tokenService: TokenService,
		private router: Router
	) {}

	onLogin(data: ILogin) {
		return this.http
			.post<ILoginResponse>(`${environment.apiBaseUrl}/${environment.apiEndpoints.login}`, data, {withCredentials: true}) //
			.pipe(
				map((res) => {
					if (res) {
						this.tokenService.setToken(res.token);
					}
					return res;
				})
			);
	}

	onRegister(data: IRegister) {
		return this.http
			.post(`${environment.apiBaseUrl}/${environment.apiEndpoints.register}`, data) //
			.pipe(
				map((res) => {
					if (res) {
						this.router.navigate(['']);
					}
					return res;
				})
			);
	}

	getUser() {
		return this.http.get(`${environment.apiBaseUrl}/${environment.apiEndpoints.getUser}`); //
	}

	onLogout() {
		this.http
			.post(
				`${environment.apiBaseUrl}/${environment.apiEndpoints.logout}`,
				{},
				{
					withCredentials: true,
				}
			) //
			.subscribe({
				next: () => {
					this.tokenService.removeToken();
				},
				error: (err) => {
					console.log(err);
				},
			});
	}
}
