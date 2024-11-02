import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../users/models';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
showFiller: any;

authUser$: Observable<User | null>;

constructor(private router: Router, private authService: AuthService) {
  this.authUser$ = this.authService.authUser$;
}

logout(): void {
  this.authService.logout();
}

}
