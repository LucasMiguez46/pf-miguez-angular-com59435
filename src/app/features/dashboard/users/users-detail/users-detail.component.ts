import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../models';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss'
})
export class UsersDetailComponent implements OnInit {
  idUsuario?: string;

  user?: User;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ){}


  ngOnInit(): void {
    this.isLoading = true;
    console.log('LA RUTA ACTIVA ES: ', this.activatedRoute);
    this.idUsuario = this.activatedRoute.snapshot.params['id'];

    if (this.idUsuario) {
      this.usersService.getById(this.idUsuario).subscribe({
        next: (user) => {
          this.user = user;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar el usuario', err);
          this.isLoading = false;
        }
      });
    }
  }
}
