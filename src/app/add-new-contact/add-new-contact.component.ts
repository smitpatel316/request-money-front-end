import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../models/contact';
@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss'],
})
export class AddNewContactComponent implements OnInit {
  form: FormGroup;
  contact: Contact = { name: '', handle: '', handleType: '' };
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewContactComponent>
  ) {
    this.form = fb.group({
      name: [this.contact.name, Validators.required],
      handle: [this.contact.handle, Validators.required],
      handleType: [this.contact.handleType, Validators.required],
    });
  }
  ngOnInit(): void {}
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
