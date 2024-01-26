import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import {catchError, pipe, switchMap, throwError} from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
	const tokenService = inject(TokenService);
	const router = inject(Router);

	tokenService.isAuthenticated.subscribe({
		next: (value) => {
			if (value) {
				req = req.clone({
					setHeaders: {
						Authorization: `Bearer ${tokenService.getToken()}`,
					},
				});
			}
		},
		error: (err) => {},
	});

	return next(req) //
		.pipe(
			catchError((e: HttpErrorResponse) => {
				if (e.status === 401) {
					return tokenService.refreshToken().pipe(
						switchMap((res: any) => {
							tokenService.setToken(res.token);
							console.log('refreshed token applied');

							return next(
								req.clone({
									setHeaders: {
										Authorization: `Bearer ${tokenService.getToken()}`,
									},
								})
							);
						})
					);
				}
				const error = e.error?.message || e.statusText;
				return throwError(() => error);
			})
		);
};
