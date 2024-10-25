import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { User } from '../models';
import { CoursesService } from '../../../../core/services/courses.service';
import { Courses } from '../../courses/models';

interface userDialogData{
  editingUser?: User;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: ``
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  dataSource: Courses[] = [];

  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>, 
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public data?:userDialogData
  ) {
    this.userForm = this.formBuilder.group({
      primerNombre: [null,[Validators.required]],
      ultimoNombre: [null,[Validators.required]],
      gmail: [null,[Validators.required, Validators.email]],
      curso: [null,[Validators.required]],
    })
    this.editFormValue();
  }
  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(cursos => {
      this.dataSource = cursos;
    });
  }



  editFormValue(){
    if (this.data?.editingUser) {
      this.userForm.patchValue(this.data.editingUser);
    }
  }

  onSave():void{
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
        ...this.userForm.value,
        id: generateRandomString(8),
        createdAt: new Date()
      })
    } 
  }
}
