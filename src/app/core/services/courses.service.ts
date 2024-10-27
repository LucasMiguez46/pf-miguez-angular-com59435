import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Courses } from '../../features/dashboard/courses/models';
import { generateRandomString } from '../../shared/utils';

let DATABASE: Courses[] = [
  {
    id: generateRandomString(4),
    name: 'programacion',
    price: 9999,
    createdAt: new Date(),
    categoryId: 'fSDv3d',
  },
  {
    id: generateRandomString(4),
    name: 'dibujo tradicional',
    price: 9999,
    createdAt: new Date(),
    categoryId: 'VCSsd3',
  },
  {
    id: generateRandomString(4),
    name: 'dibujo digital',
    price: 9999,
    createdAt: new Date(),
    categoryId: 'VCSsd4',
  },
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  getCourses(): Observable<Courses[]> {
    return of([...DATABASE]);
  }

  deleteById(id: string): Observable<Courses[]> {
    DATABASE = DATABASE.filter((p) => p.id !== id);
    return this.getCourses();
  }

  createCourses(data: Omit<Courses, 'id'>): Observable<Courses[]> {
    DATABASE.push({ ...data, id: generateRandomString(4), price: 9999, categoryId: generateRandomString(4), createdAt: new Date()});
    return this.getCourses();
  }
}