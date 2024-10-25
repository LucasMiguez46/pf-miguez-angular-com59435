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

  createProduct(data: Omit<Courses, 'id'>): Observable<Courses[]> {
    DATABASE.push({ ...data, id: generateRandomString(4) });
    return this.getCourses();
  }
}