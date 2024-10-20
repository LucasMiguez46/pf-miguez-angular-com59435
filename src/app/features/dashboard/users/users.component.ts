import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { generateRandomString } from '../../../shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';

// const ELEMENT_DATA: user[] = [
//   {
//     id: "h1j2",
//     primerNombre: "lucas",
//     ultimoNombre: "miguez",
//     gmail: "lucasmiguez46@gmail.com",
//     createdAt: new Date(),
//     curso: "curso 1",
//   },
// ];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation: ViewEncapsulation.None // Deshabilitar encapsulación
})
export class UsersComponent implements OnInit {
[x: string]: any;
  displayedColumns: string[] = ['id', 'primerNombre', 'gmail','createdAt','curso','actions'];
  dataSource: User[] = [];

  isLoading = false;

  constructor(
    private matDialog:MatDialog, 
    private usersService: UsersService,    
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.dataSource = this.usersService.getUsers();
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.isLoading = true;
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
    if(confirm('Estas seguro de eliminarlo?')){
      this.dataSource = this.dataSource.filter((usuarios) => usuarios.id !== id);
    }
  }

  openModal(editingUser?: User): void{
    this.matDialog.open(UserDialogComponent, {
      data:{
        editingUser,
      },
    }).afterClosed().
    subscribe({
      next: (result) =>{
        console.log('Recibimos: ', result);

        if (!!result) {
          if (editingUser) {
            this.dataSource = this.dataSource.map((user) => user.id === editingUser.id ? {
              ...user,
              ...result,
              id: user.id, // Mantén el ID original
              createdAt: user.createdAt, // Mantén la fecha original
            } : user);
          }else{
            this.dataSource=[
              ...this.dataSource,{
                ...result,
                id: generateRandomString(8), // Genera un nuevo ID si es un nuevo usuario
                fecha: new Date(), // Agrega la fecha actual
              },
            ]
          }
        }
      }
    });
  }
}


