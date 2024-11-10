import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Courses } from '../../features/dashboard/courses/models';
import { generateRandomString } from '../../shared/utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(`${environment.apiBaseURL}/cursos`);
  }

  deleteById(id: string): Observable<Courses[]> {
    return this.httpClient
    .delete<Courses>(`${this.baseURL}/cursos/${id}`)
    .pipe(concatMap(() => this.getCourses()));
  }

  createCourses(data: Omit<Courses, 'id'>): Observable<Courses> {
    return this.httpClient.post<Courses>(`${this.baseURL}/cursos`, {
      ...data,
      categoryId: generateRandomString(4), 
      createdAt: new Date().toISOString(),
    });
  }

  updateCourse(id: string, update: Partial<Courses>) {
    return this.httpClient
      .patch<Courses>(`${this.baseURL}/cursos/${id}`, update)
      .pipe(concatMap(() => this.getCourses()));
  }
}