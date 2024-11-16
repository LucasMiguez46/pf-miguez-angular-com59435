import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { UsersService } from '../../../../core/services/users.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { InscripcionActions } from './inscripcion.actions';
import { Action } from '@ngrx/store';
import { concatMap, map, catchError, of, forkJoin } from 'rxjs';

@Injectable()
export class InscripcionEffects {
  loadInscripcion$: Actions<Action<string>>;
  createInscripcion$: Actions<Action<string>>;
  createInscripcionSuccess$: Actions<Action<string>>;

  loadCursosAndUserOptions$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private inscripcionService: InscripcionesService,
    private userService: UsersService,
    private coursesService: CoursesService) {
      this.loadInscripcion$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(InscripcionActions.cargarInscripcion),
          // delay(5000),
          concatMap(() =>
            this.inscripcionService.getInscripciones().pipe(
              // Respuesta satisfactoria
              map((response) => InscripcionActions.cargarInscripcionsSuccess({ data: response })),
              // Respuesta erronea
              catchError((error) => of(InscripcionActions.cargarInscripcionsFailure({ error })))
            )
          )
        );
      });
  
      this.createInscripcion$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(InscripcionActions.createInscripcions),
          concatMap((action) =>
            this.inscripcionService
              .crearInscripcion({
                cursoId: action.cursoId,
                userId: action.userId,
              })
              .pipe(
                map((data) => InscripcionActions.createInscripcionsSuccess({ data })),
                catchError((error) =>
                  of(InscripcionActions.createInscripcionsFailure({ error }))
                )
              )
          )
        );
      });
  
      this.createInscripcionSuccess$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(InscripcionActions.createInscripcionsSuccess),
          map(() => InscripcionActions.cargarInscripcion())
        );
      });
  
      this.loadCursosAndUserOptions$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(InscripcionActions.cargarCoursesAndUserOptions),
          concatMap(() =>
            forkJoin([
              this.coursesService.getCourses(),
              this.userService.getUsers(),
            ]).pipe(
              map((res) =>
                InscripcionActions.cargarCoursesAndUserOptionsSuccess({
                  cursos: res[0],
                  users: res[1],
                })
              ),
              catchError((error) =>
                of(InscripcionActions.cargarCoursesAndUserOptionsFailure({ error }))
              )
            )
          )
        );
      });
    }
  }
