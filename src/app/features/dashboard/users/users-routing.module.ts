import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';

const routes: Routes = [
  {
    path:'',
    component: UsersComponent
  },
  {
    path: ':id/detail',
    component: UsersDetailComponent
  },
  {
    path:'**',
    redirectTo: 'UsersComponent',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
