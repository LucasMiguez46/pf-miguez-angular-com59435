import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Clases } from './models';
import { ClasesService } from '../../../core/services/clases.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../users/models';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent {

  @Input()
  categories: Clases[] = [];

  @Output()
  edit = new EventEmitter<Clases>();

  clases: Clases[] = [];
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  clasesForm: FormGroup;
  editingId: string | null = null;

  isEditing?: Clases;
  authUser$: Observable<User | null>;

  constructor(
    private clasesService: ClasesService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.clasesForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.authUser$ = this.authService.authUser$;
  }

  ngOnInit(): void {
    this.loadClases();
  }


  loadClases(): void {
    this.clasesService.getClases().subscribe({
      next: (clases) => {
        this.clases = clases;
        this.isEditing = undefined;
        this.editingId = null;
      },
    });
  }

  onCreate(): void {
    if (this.clasesForm.invalid) {
      this.clasesForm.markAllAsTouched();
    } else {
      this.clasesService.createClases(this.clasesForm.value).subscribe({
        next: (claseCreated) => {
          this.clases = [...this.clases, claseCreated];
          this.clasesForm.reset();
          this.clasesForm.get('name')?.markAsUntouched();
        },
      });
    }
  }

  onEdit(clase: Clases): void {
    this.isEditing = clase;
    this.clasesForm.patchValue(clase);
  }

  handleSubmit(): void {
    if (this.isEditing) {
      this.clasesService
        .editClases(this.isEditing.id, this.clasesForm.value)
        .subscribe({
          next: () => {
            this.loadClases();
            this.clasesForm.reset();
            this.clasesForm.get('name')?.markAsUntouched();
          },
        });
    } else {
      this.onCreate();
    }
  }

  startEdit(clase: Clases): void {
    this.editingId = clase.id;
    this.clasesForm.patchValue(clase);
  }

  cancelEdit(): void {
    this.editingId = null;
    this.clasesForm.reset();
  }

  saveEdit(claseId: string): void {
    if (this.clasesForm.invalid) {
      this.clasesForm.markAllAsTouched();
    } else {
      this.clasesService.editClases(claseId, this.clasesForm.value).subscribe({
        next: () => {
          this.loadClases();
        },
      });
    }
  }

  get nameControl(): FormControl {
    return this.clasesForm.get('name') as FormControl;
  }

  onDelete(id:string){
    if(confirm('Estas seguro de eliminarlo?')){
      this.clasesService.deleteById(id).subscribe({
        next: (updatedClases) =>{
          this.clases = updatedClases;
        },
        error: (err) => {
          alert('Error al eliminar la clase' + err);
        }
      })
    }
  }
}
