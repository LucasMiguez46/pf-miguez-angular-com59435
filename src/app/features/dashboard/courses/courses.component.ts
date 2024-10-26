import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Courses } from './models';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
[x: string]: any;
  constructor(
    private CoursesService: CoursesService,
  ){}

  displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions'];
  dataSource: Courses[] = [];

  isLoading = false;

  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.isLoading = true;
    this.CoursesService.getCourses().subscribe({
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

}