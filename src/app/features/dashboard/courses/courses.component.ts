import { Component, OnInit} from '@angular/core';
import { Courses } from './models';
import { CoursesService } from '../../../core/services/courses.service';
import { generateRandomString } from '../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';
import { UsersService } from '../../../core/services/users.service';
import { Observable } from 'rxjs';
import { User } from '../users/models';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

[x: string]: any;
displayedColumns: string[] = ['id', 'name','price', 'createdAt', 'actions'];
dataSource: Courses[] = [];

isLoading = false;

isAdmin: boolean = false;
authUser$: Observable<User | undefined>; 

  constructor(
    private matDialog:MatDialog, 
    private userService: UsersService,
    private coursesService: CoursesService,
  ){
    this.authUser$ = this.userService.getAuthenticatedUser();
  }


  ngOnInit(): void {
    this.checkIfAdmin(); 
    this.loadCourses();
  }

  checkIfAdmin(): void {
    const role = 'admin'; // Asegúrate de obtener el rol adecuado de tu sistema de autenticación o estado
    this.userService.getIsUserAdmin(role).subscribe({
      next: (isAdmin: boolean) => {
        this.isAdmin = isAdmin;  // Asigna el valor recibido de la verificación del rol
      },
      error: (err) => {
        console.error('Error al verificar si el usuario es admin:', err);
      }
    });
  }
  
  loadCourses(): void {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses: Courses[]) => {
        this.dataSource = courses;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id:string){
    if(confirm('Estas seguro de eliminarlo?')){
      this.dataSource = this.dataSource.filter((cursos) => cursos.id !== id);
    }
  }

  openModalCourse(editingCourse?: Courses): void{
    this.matDialog.open(CoursesDialogComponent, {
      data:{
        editingCourse,
      },
    }).afterClosed().
    subscribe({
      next: (result) =>{
        console.log('Recibimos: ', result);

        if (!!result) {
          if (editingCourse) {
            this.dataSource = this.dataSource.map((course) => course.id === editingCourse.id ? {
              ...course,
              ...result,
              id: course.id,
              createdAt: course.createdAt,
            } : course);
          }else{
            this.dataSource=[
              ...this.dataSource,{
                ...result,
                id: generateRandomString(4),
                fecha: new Date(), 
              },
            ]
          }
        }
      }
    });
  }
}