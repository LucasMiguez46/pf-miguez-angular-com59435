import { Injectable } from '@angular/core';
import { concatMap, Observable, of, throwError } from 'rxjs';
import { generateRandomString } from '../../shared/utils';
import { Clases } from '../../features/dashboard/clases/models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) { }

    getClases(): Observable<Clases[]> {
      return this.httpClient.get<Clases[]>(`${environment.apiBaseURL}/clases`);
    }
  
    createClases(data: Omit<Clases, 'id'>): Observable<Clases> {
      return this.httpClient.post<Clases>(`${this.baseURL}/clases`,{
        ...data,
        id: generateRandomString(4),
        createdAt: new Date(),
      });
    }
  
    editClases(id: string, clases: Partial<Clases>){
      return this.httpClient
      .patch<Clases>(`${this.baseURL}/clases/${id}`, clases)
      .pipe(concatMap(() => this.getClases()));
    }

    deleteById(id: string): Observable<Clases[]> {
      return this.httpClient
      .delete<Clases>(`${this.baseURL}/clases/${id}`)
      .pipe(concatMap(() => this.getClases()));
    }
}
