import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../models';
import { Courses } from '../../courses/models';
import { generateRandomString } from '../../../../shared/utils';

interface UserDialogData {
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
  isEditMode: boolean = false;

  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:UserDialogData
  ) {

    this.userForm = this.formBuilder.group({
      primerNombre: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20), this.soloLetras()]],
      ultimoNombre: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20), this.soloLetras()]],
      gmail: [null,[Validators.required, Validators.email]],
      curso: [null,[Validators.required]],
    })
    this.patchFormValue();
  }

  soloLetras(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = /^[a-zA-Z]+$/.test(value);
      return isValid ? null : { onlyLetters: true };
    };
  }

  ngOnInit(): void {
  }

  private get isEditing() {
    return !!this.data?.editingUser;
  }


  patchFormValue() {
    if (this.data?.editingUser) {
      this.userForm.patchValue({
        primerNombre: this.data.editingUser.primerNombre,
        ultimoNombre: this.data.editingUser.ultimoNombre,
        gmail: this.data.editingUser.gmail,
      });
    }
  }


  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value,
        id: this.isEditing
          ? this.data!.editingUser!.id
          : generateRandomString(4),
        createdAt: this.isEditing
          ? this.data!.editingUser!.createdAt
          : new Date(),
      }); 
    }
  }
}
