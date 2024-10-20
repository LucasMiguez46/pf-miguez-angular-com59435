import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UsersDetailComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ],

  exports:[
    UsersComponent
  ],
})
export class UsersModule { }
