import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { UsersModule } from './users/users.module';
import { SharedModule } from '../../shared/shared.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideMenuComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UsersModule,
    SharedModule,
  ],
  exports:[
    DashboardComponent
  ],
})
export class DashboardModule { }
