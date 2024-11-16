import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { Inscripcion } from '../models';
import { Courses } from '../../courses/models';
import { User } from '../../users/models';

export const inscripcionFeatureKey = 'inscripcion';

export interface State {
  isLoadingInscripcions: boolean;
  loadInscripcionsError: Error | null;
  inscripcion: Inscripcion[];
  cursoOptions: Courses[];
  userOptions: User[];
}

export const initialState: State = {
  isLoadingInscripcions: false,
  loadInscripcionsError: null,
  inscripcion: [],
  cursoOptions: [],
  userOptions: [],
};

export const reducer = createReducer(
  initialState,
  on(InscripcionActions.createInscripcions, (state) => {
    return {
      ...state,
      isLoadingInscripcions: true,
    };
  }),
  on(InscripcionActions.cargarInscripcion, (state) => {
    return {
      ...state,
      isLoadingInscripcions: true,
    };
  }),
  on(InscripcionActions.cargarInscripcionsSuccess, (state, action) => {
    return {
      ...state,
      inscripcions: action.data,
      loadInscripcionsError: null,
      isLoadingInscripcions: false,
    };
  }),
  on(InscripcionActions.cargarInscripcionsFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      loadInscripcionsError: action.error,
      isLoadingInscripcions: false,
    };
  }),

  on(InscripcionActions.cargarCoursesAndUserOptions, (state) => {
    return {
      ...state,
      isLoadingInscripcions: true,
    };
  }),
  on(InscripcionActions.cargarCoursesAndUserOptionsSuccess, (state, action) => {
    return {
      ...state,
      loadInscripcionsError: null,
      isLoadingInscripcions: false,
      cursoOptions: action.cursos,
      userOptions: action.users,
    };
  }),
  on(InscripcionActions.cargarCoursesAndUserOptionsFailure, (state, { error }) => {
    return {
      ...state,
      loadInscripcionsError: error,
      isLoadingInscripcions: false,
    };
  })
);

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});

