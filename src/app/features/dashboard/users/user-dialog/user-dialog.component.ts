import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { User } from '../models';

interface userDialogData{
  editingUser?: User;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: ``
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>, 
    private formBuilder: FormBuilder,
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
