import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../header/header.component';

@Component({
	selector: 'app-master',
	standalone: true,
	imports: [RouterModule, CommonModule, HeaderComponent],
	templateUrl: './master.component.html',
})
export class MasterComponent {}
