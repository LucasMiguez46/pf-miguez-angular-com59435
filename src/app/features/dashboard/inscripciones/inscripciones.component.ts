import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../users/models';
import { InscripcionActions } from './store/inscripcion.actions';
import { Courses } from '../courses/models';
import { Inscripcion } from './models';
import { selectCursoOptions, selectInscripcion, selectIsLoadinInscripcion, selectLoadInscripcionError, selectUserOptions } from './store/inscripcion.selectors';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit{
  Inscripciones$: Observable<Inscripcion[]>;
  userOptions$: Observable<User[]>;
  cursoOptions$: Observable<Courses[]>;
  loadInscripcionError$: Observable<Error | null>;
  isLoadingInscripcion$: Observable<boolean>;

  InscripcionForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.InscripcionForm = this.formBuilder.group({
      cursoId: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });

    this.Inscripciones$ = this.store.select(selectInscripcion);
    this.cursoOptions$ = this.store.select(selectCursoOptions);
    this.userOptions$ = this.store.select(selectUserOptions);
    this.isLoadingInscripcion$ = this.store.select(selectIsLoadinInscripcion);
    this.loadInscripcionError$ = this.store.select(selectLoadInscripcionError);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionActions.cargarInscripcion());
    this.Inscripciones$.subscribe(data => {
      console.log('Datos de inscripciones desde el observable:', data);
      if (data) {
        console.log('Inscripciones cargadas correctamente:', data);
      } else {
        console.log('No se encontraron inscripciones.');
      }
    });
    this.store.dispatch(InscripcionActions.cargarCoursesAndUserOptions());
  }

  onSubmit(): void {
    if (this.InscripcionForm.invalid) {
      this.InscripcionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscripcionActions.createInscripcions(this.InscripcionForm.value));
      this.InscripcionForm.reset();
    }
  }
}
