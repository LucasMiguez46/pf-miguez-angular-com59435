import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { generateRandomString } from '../../../shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { CoursesService } from '../../../core/services/courses.service';
import { Courses } from '../courses/models';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation: ViewEncapsulation.None // Deshabilitar encapsulación
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
        console.log('Cursos cargados:', this.dataSourceCourses);
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
    if(confirm('Estas seguro de eliminarlo?')){
      this.dataSource = this.dataSource.filter((usuarios) => usuarios.id !== id);
    }
  }

  openModal(editingUser?: User): void{
    this.matDialog.open(UserDialogComponent, {
      data:{
        editingUser,
      },
    }).afterClosed().
    subscribe({
      next: (result) =>{
        console.log('Recibimos: ', result);

        if (!!result) {
          if (editingUser) {
            this.dataSource = this.dataSource.map((user) => user.id === editingUser.id ? {
              ...user,
              ...result,
              id: user.id,
              createdAt: user.createdAt,
            } : user);
          }else{
            this.dataSource=[
              ...this.dataSource,{
                ...result,
                id: generateRandomString(8),
                fecha: new Date(), 
              },
            ]
          }
        }
      }
    });
  }
}


