import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { generateRandomString } from '../../shared/utils';
import { Clases } from '../../features/dashboard/clases/models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

let CLASES_DB: Clases[] = [
  {
    id: generateRandomString(4),
    name: 'clase 1',
    createdAt: new Date(),
  },
  {
    id: generateRandomString(4),
    name: 'clase 2',
    createdAt: new Date(),
  },
  {
    id: generateRandomString(4),
    name: 'clase 3',
    createdAt: new Date(),
  },
];

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  constructor(private httpClient: HttpClient) { }

    getClases(): Observable<Clases[]> {
      return this.httpClient.get<Clases[]>(`${environment.apiBaseURL}/clases`);
    }
  
    createClases(
      clase: Omit<Clases, 'id' | 'createdAt'>
    ): Observable<Clases> {
      const claseCreada = {
        ...clase,
        id: generateRandomString(4),
        createdAt: new Date(),
      };
      CLASES_DB.push(claseCreada);
      return of(claseCreada);
    }
  
    editClases(id: string, clases: Partial<Clases>): Observable<Clases> {
      const clasesToEdit = CLASES_DB.find((cat) => cat.id === id);
  
      if (!clasesToEdit) {
        return throwError(() => new Error('No se encontro la clase'));
      }
  
      CLASES_DB = CLASES_DB.map((cat) =>
        cat.id === id ? { ...clasesToEdit, ...clases } : cat
      );
  
      return of(clasesToEdit);
    }

    deleteById(id: string): Observable<Clases[]> {
      CLASES_DB = CLASES_DB.filter((p) => p.id !== id);
      return this.getClases();
    }
}
