import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideMenuRoutingModule } from './side-menu-routing.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SideMenuRoutingModule,
    SharedModule,
  ]
})
export class SideMenuModule { }
