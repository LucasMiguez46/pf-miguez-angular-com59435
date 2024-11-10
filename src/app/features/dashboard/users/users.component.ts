import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { CoursesService } from '../../../core/services/courses.service';
import { Courses } from '../courses/models';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
[x: string]: any;
  displayedColumns: string[] = ['id', 'primerNombre', 'gmail','createdAt','curso','actions'];
  dataSource: User[] = [];

  dataSourceCourses: Courses[] = [];

  isLoading = false;

  constructor(
    private matDialog:MatDialog, 
    private usersService: UsersService,  
    private coursesService: CoursesService,  
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    
  }
  
  loadUsers(): void {
    this.isLoading = true;
  
    // Cargar los usuarios
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  
    // Cargar los cursos
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.dataSourceCourses = courses;
      },
      error: () => {
        console.error('Error al cargar los cursos');
      },
    });
  }

  getCourseName(courseId: string): string {
    const course = this.dataSourceCourses.find(c => c.id === courseId);
    return course ? course.name : 'Curso no encontrado';
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(id:string){
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usersService.removeUserById(id).subscribe({
        next: (updatedUsers) => {
          this.dataSource = updatedUsers;
        },
        error: (err) => {
          console.error('Error al eliminar el usuario', err);
        }
      });
    }
  }

  openModal(editingUser?: User): void {
    this.matDialog.open(UserDialogComponent, {
      data: {
        editingUser,
      },
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        console.log('Recibimos: ', result);
  
        if (!!result) {
          if (editingUser) {
            // Actualizar un usuario existente
            this.usersService.updateUserById(editingUser.id, result).subscribe({
              next: (updatedUser) => {
                // Aquí mappeamos y reemplazamos el usuario actualizado en la dataSource local
                this.dataSource = this.dataSource.map((user) =>
                  user.id === editingUser.id ? {
                    ...user,
                    ...result,
                    id: user.id,
                    createdAt: user.createdAt,
                  } : user
                );
              },
              error: (err) => {
                console.error('Error al actualizar el usuario', err);
              }
            });
          } else {
            this.usersService.createUser(result).subscribe({
              next: (newUser) => {
                this.dataSource = [...this.dataSource, newUser]; 
              },
              error: (err) => {
                console.error('Error al crear el usuario', err);
              }
            });
          }
        }
      }
    });
  }
}


