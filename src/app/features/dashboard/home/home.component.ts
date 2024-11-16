import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../users/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  authUser$: Observable<User | null>;

  constructor(
    private authService: AuthService,
  ){
    this.authUser$ = this.authService.authUser$;
  }

  ngOnInit(): void {
  }

}
