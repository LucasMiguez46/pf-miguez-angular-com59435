import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { Courses } from '../courses/models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
[x: string]: any;
  displayedColumns: string[] = ['id', 'primerNombre', 'gmail','createdAt','actions'];
  dataSource: User[] = [];

  isLoading = false;
  authUser$: Observable<User | null>;

  constructor(
    private matDialog:MatDialog, 
    private usersService: UsersService,   
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.authUser$;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  
  loadUsers(): void {
    this.isLoading = true;
  
    // Cargar los usuarios
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });

  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(id:string){
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usersService.removeUserById(id).subscribe({
        next: (updatedUsers) => {
          this.dataSource = updatedUsers;
        },
        error: (err) => {
          alert('Error al eliminar el usuario' + err);
        }
      });
    }
  }

  openModal(editingUser?: User): void {
    this.matDialog.open(UserDialogComponent, {
      data: {
        editingUser,
      },
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
  
        if (!!result) {
          if (editingUser) {
            // Actualizar un usuario existente
            this.usersService.updateUserById(editingUser.id, result).subscribe({
              next: (updatedUser) => {
                // Aquí mappeamos y reemplazamos el usuario actualizado en la dataSource local
                this.dataSource = this.dataSource.map((user) =>
                  user.id === editingUser.id ? {
                    ...user,
                    ...result,
                    id: user.id,
                    createdAt: user.createdAt,
                  } : user
                );
              },
              error: (err) => {
                alert('Error al actualizar el usuario'+ err);
              }
            });
          } else {
            this.usersService.createUser(result).subscribe({
              next: (newUser) => {
                this.dataSource = [...this.dataSource, newUser]; 
              },
              error: (err) => {
                alert('Error al crear el usuario'+ err);
              }
            });
          }
        }
      }
    });
  }
}


