import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../models';
import { Courses } from '../../courses/models';
import { CoursesService } from '../../../../core/services/courses.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss'
})
export class UsersDetailComponent implements OnInit {
  idUsuario?: string;
  user?: User;
  dataSourceCourses: Courses[] = [];
  authUser$: Observable<User | null>;
  
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private coursesService: CoursesService,
    private authService: AuthService
  ){
    this.authUser$ = this.authService.authUser$;
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.idUsuario = this.activatedRoute.snapshot.params['id'];
    if (this.idUsuario) {
      this.loadCourses();
    }
  }

  private loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (cursos) => {
        this.dataSourceCourses = cursos;
        if (this.idUsuario) {
          this.getUserDetails(this.idUsuario);
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los cursos: ' + err.message;
        alert('Error al cargar los cursos'+ err);
        this.isLoading = false;
      }
    });
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
        alert('Error al cargar el usuario'+ err);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
  
}
