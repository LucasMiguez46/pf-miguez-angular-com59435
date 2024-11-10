import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
  ]
})
export class RegisterModule { }
