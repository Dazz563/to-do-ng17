import {Injectable} from '@angular/core';
import {ILogin, ILoginResponse} from '../models/auth.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {map} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private http: HttpClient, //
		private tokenService: TokenService
	) {}

	onLogin(data: ILogin) {
		return this.http
			.post<ILoginResponse>(`${environment.apiBaseUrl}/${environment.apiEndpoints.login}`, data) //
			.pipe(
				map((res) => {
					if (res) {
						this.tokenService.setToken(res.token);
					}
					return res;
				})
			);
	}

	onLogout() {
		this.http
			.post(`${environment.apiBaseUrl}/${environment.apiEndpoints.logout}`, {}) //
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
