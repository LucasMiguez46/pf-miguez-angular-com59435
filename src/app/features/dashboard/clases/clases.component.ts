import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Clases } from './models';
import { ClasesService } from '../../../core/services/clases.service';
import { UsersService } from '../../../core/services/users.service';
import { Observable } from 'rxjs';
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

  isAdmin: boolean = false;
  authUser$: Observable<User | undefined>; 

  constructor(
    private clasesService: ClasesService,
    private userService: UsersService,
    private fb: FormBuilder
  ) {
    this.clasesForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.authUser$ = this.userService.getAuthenticatedUser();
  }

  ngOnInit(): void {
    this.checkIfAdmin(); 
    this.loadClases();
  }

  checkIfAdmin(): void {
    const role = 'admin'; // Asegúrate de obtener el rol adecuado de tu sistema de autenticación o estado
    this.userService.getIsUserAdmin(role).subscribe({
      next: (isAdmin: boolean) => {
        this.isAdmin = isAdmin;  // Asigna el valor recibido de la verificación del rol
      },
      error: (err) => {
        console.error('Error al verificar si el usuario es admin:', err);
      }
    });
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
      this.clases = this.clases.filter((clas) => clas.id !== id);
    }
  }
}
