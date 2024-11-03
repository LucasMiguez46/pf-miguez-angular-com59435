import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../models';
import { Courses } from '../../courses/models';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss'
})
export class UsersDetailComponent implements OnInit {
  idUsuario?: string;
  user?: User;
  dataSourceCourses: Courses[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ){}


  ngOnInit(): void {
    this.isLoading = true;
    this.idUsuario = this.activatedRoute.snapshot.params['id'];

    if (this.idUsuario) {
      this.getUserDetails(this.idUsuario);
    }
  }

  getCourseName(courseId: string): string {
    const course = this.dataSourceCourses.find(c => c.id === courseId);
    return course ? course.name : 'Curso no encontrado';
  }

  private getUserDetails(id: string): void {
    this.usersService.getById(id).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        } else {
          this.errorMessage = 'Usuario no encontrado.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar el usuario: ' + err.message;
        console.error('Error al cargar el usuario', err);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    window.history.back(); // Navega hacia atrás en el historial del navegador
  }
  
}
