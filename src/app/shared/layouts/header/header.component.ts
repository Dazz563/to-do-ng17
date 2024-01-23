import {Component} from '@angular/core';
import {TokenService} from '../../../services/token.service';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../services/auth.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	isAuthenticated$;
	constructor(
		private tokenService: TokenService,
		private authService: AuthService
	) {
		this.isAuthenticated$ = this.tokenService.isAuthenticated;
	}

	onLogout() {
		this.authService.onLogout();
	}
}
