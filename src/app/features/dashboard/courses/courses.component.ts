import { Component, OnInit} from '@angular/core';
import { Courses } from './models';
import { CoursesService } from '../../../core/services/courses.service';
import { generateRandomString } from '../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';
import { UsersService } from '../../../core/services/users.service';


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

  constructor(
    private matDialog:MatDialog, 
    private coursesService: CoursesService,
  ){
  }


  ngOnInit(): void {
    this.loadCourses();
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
      this.coursesService.deleteById(id).subscribe({
        next: (updatedCursos) =>{
          this.dataSource = updatedCursos;
        },
        error: (err) => {
          alert('Error al eliminar la clase' + err);
        }
      })
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
        if (!!result) {
          if (editingCourse) {
            // Actualiza el curso en el backend
            this.coursesService.updateCourse(editingCourse.id, {
              ...editingCourse,
              ...result,
            }).subscribe(() => {
              this.dataSource = this.dataSource.map((course) =>
                course.id === editingCourse.id
                  ? { ...course, ...result }
                  : course
              );
            });
          } else {
            // Crea un nuevo curso en el backend
            this.coursesService.createCourses(result).subscribe((newCourse) => {
              this.dataSource = [...this.dataSource, newCourse];
            });
          }
        }

        // if (!!result) {
        //   if (editingCourse) {
        //     this.dataSource = this.dataSource.map((course) => course.id === editingCourse.id ? {
        //       ...course,
        //       ...result,
        //       id: course.id,
        //       createdAt: course.createdAt,
        //     } : course);
        //   }else{
        //     this.dataSource=[
        //       ...this.dataSource,{
        //         ...result,
        //         id: generateRandomString(4),
        //         fecha: new Date(), 
        //       },
        //     ]
        //   }
        // }
      }
    });
  }
}