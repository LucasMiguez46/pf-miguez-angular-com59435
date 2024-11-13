import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '../users/models';
import { CoursesService } from '../../../core/services/courses.service';
import { Courses } from '../courses/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  authUser$: Observable<User | null>;
  userCourses$: Observable<Courses[]> = of([]);

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService,
  ){
    this.authUser$ = this.authService.authUser$;
  }

  ngOnInit(): void {

    this.userCourses$ = this.authUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.coursesService.getCourses().pipe(
            map(courses => courses.filter(course => course.id === user.curso))
          );
        }
        return of([]); 
      })
    );
  }

}
