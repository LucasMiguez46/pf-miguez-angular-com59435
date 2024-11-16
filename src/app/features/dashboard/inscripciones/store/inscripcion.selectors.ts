import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcion from './inscripcion.reducer';

export const selectInscripcionState = createFeatureSelector<fromInscripcion.State>(
  fromInscripcion.inscripcionFeatureKey
);

export const selectInscripcion = createSelector(
  selectInscripcionState,
  (state) => state.inscripcion
);

export const selectCursoOptions = createSelector(
  selectInscripcionState,
  (state) => state.cursoOptions
);

export const selectUserOptions = createSelector(
  selectInscripcionState,
  (state) => state.userOptions
);

export const selectLoadInscripcionError = createSelector(
  selectInscripcionState,
  (state) => state.loadInscripcionsError
);

export const selectIsLoadinInscripcion = createSelector(
  selectInscripcionState,
  (state) => state.isLoadingInscripcions
);