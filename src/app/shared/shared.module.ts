import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FullNamePipe } from './pipes/full-name.pipe';
import { FontPlusTwentyDirective } from './directives/font-plus-twenty.directive';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    FullNamePipe,
    FontPlusTwentyDirective,
  ],
  imports: [
    CommonModule
  ],

  exports: [
    ReactiveFormsModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FullNamePipe,
    FontPlusTwentyDirective,
    MatCardModule,
  ],
})
export class SharedModule { }
