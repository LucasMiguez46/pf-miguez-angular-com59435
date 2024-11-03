import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../models';
import { Courses } from '../../courses/models';
import { CoursesService } from '../../../../core/services/courses.service';

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
    private usersService: UsersService,
    private coursesService: CoursesService
  ){}


  ngOnInit(): void {
    this.isLoading = true;
    this.idUsuario = this.activatedRoute.snapshot.params['id'];

    // if (this.idUsuario) {
    //   this.getUserDetails(this.idUsuario);
    // }
    if (this.idUsuario) {
      // Primero cargamos la lista de cursos y luego los detalles del usuario
      this.loadCourses();
    }
  }

  private loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (cursos) => {
        this.dataSourceCourses = cursos;
        // Después de cargar los cursos, cargamos los detalles del usuario
        if (this.idUsuario) {
          this.getUserDetails(this.idUsuario);
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los cursos: ' + err.message;
        console.error('Error al cargar los cursos', err);
        this.isLoading = false;
      }
    });
  }

  getCourseName(courseId: string): string {
    const course = this.dataSourceCourses.find(c => c.id === courseId);
    console.log("el curso es: " + course);
    console.log(this.dataSourceCourses);
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
