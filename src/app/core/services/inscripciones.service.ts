import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Inscripcion } from '../../features/dashboard/inscripciones/models';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private baseURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) {}

  getInscripciones(): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(
      `${this.baseURL}/inscripciones?_embed=user&_embed=curso`
    );
  }

  crearInscripcion(payload: Omit<Inscripcion, 'id' | 'userid' | 'cursoid'>): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(
      `${this.baseURL}/inscripciones`,
      payload
    );
  }
}
