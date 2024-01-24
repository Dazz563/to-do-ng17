import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) {
		const token = this.getToken();
		if (token) {
			this.updateToken(true);
		}
	}

	updateToken(status: boolean) {
		this.isAuthenticated.next(status);
	}

	setToken(token: string) {
		this.updateToken(true);
		localStorage.setItem(environment.CURRENT_TOKEN, token);
	}

	getToken(): string | null {
		return localStorage.getItem(environment.CURRENT_TOKEN);
	}

	removeToken() {
		this.updateToken(false);
		localStorage.removeItem(environment.CURRENT_TOKEN);
	}

	refreshToken() {
		return this.http.post(`${environment.apiBaseUrl}/${environment.apiEndpoints.refreshToken}`, {}, {withCredentials: true});
	}
}
