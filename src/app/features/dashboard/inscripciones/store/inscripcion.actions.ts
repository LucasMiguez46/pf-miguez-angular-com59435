import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscripcion } from '../models';
import { User } from '../../users/models';
import { Courses } from '../../courses/models';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    // Quiero cargar las inscripciones...
    'cargar Inscripcion': emptyProps(),

    // El servidor respondio ok con las inscripciones...
    'Cargar Inscripcions Success': props<{ data: Inscripcion[] }>(),

    // El servidor responde con un error
    'CargarInscripcions Failure': props<{ error: Error }>(),

    // Quiero crear una venta...
    'Create Inscripcions': props<{ cursoId: string; userId: string }>(),
    'Create Inscripcions Success': props<{ data: Inscripcion }>(),
    'Create Inscripcions Failure': props<{ error: Error }>(),

    'Cargar Courses And User Options': emptyProps(),
    'Cargar Courses And User Options Success': props<{
      users: User[];
      cursos: Courses[];
    }>(),
    'Cargar Courses And User Options Failure': props<{ error: Error }>(),
    
  }
});
