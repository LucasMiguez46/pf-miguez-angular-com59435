import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from '../../../../core/services/courses.service';
import { generateRandomString } from '../../../../shared/utils';
import { UserDialogComponent } from '../../users/user-dialog/user-dialog.component';
import { Courses } from '../models';

interface CoursesDialogData{
  editingCourse?: Courses;
}

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styles: ``
})
export class CoursesDialogComponent implements OnInit  {
  coursesForm: FormGroup;
  dataSource: Courses[] = [];

  constructor(
    private matDialogRef: MatDialogRef<CoursesDialogComponent>, 
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public data?:CoursesDialogData,
  ) {
    this.coursesForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      price: [0,[Validators.required]],
    })
    this.editFormValue();
  }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(cursos => {
      this.dataSource = cursos;
    });
  }



  editFormValue(){
    if (this.data?.editingCourse) {
      this.coursesForm.patchValue(this.data.editingCourse);
    }
  }
  

  onSave():void{
    if (this.coursesForm.invalid) {
      this.coursesForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
        ...this.coursesForm.value,
        id: generateRandomString(4),
        createdAt: new Date(),
      })
    } 
  }
}
