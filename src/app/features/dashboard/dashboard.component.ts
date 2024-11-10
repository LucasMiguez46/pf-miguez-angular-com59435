import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './users/models';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  authUser$: Observable<User | null>;

  showFiller = false;
  drawer: any;

  constructor(
    private router: Router, 
    private authService: AuthService) 
    {
    this.authUser$ = this.authService.authUser$;
    }

    logout(): void {
      this.authService.logout();
    }
}
