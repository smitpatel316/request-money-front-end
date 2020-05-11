import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
export interface Event {
  name: string;
  paidBy: string;
  amount: number;
  users: FormArray;
}
@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.scss'],
})
export class AddNewEventComponent implements OnInit {
  form: FormGroup;
  event: Event = {
    name: '',
    paidBy: '5eb45480a6f04c792cb73bdd',
    amount: 0,
    users: new FormArray([]),
  };
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewEventComponent>
  ) {
    this.form = fb.group({
      name: [this.event.name, Validators.required],
      paidBy: [this.event.paidBy, Validators.required],
      amount: [this.event.amount, Validators.required],
      users: [this.event.users, Validators.required],
    });
  }
  ngOnInit(): void {}
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
  addUser() {
    console.log(this.event.users.controls);
    this.event.users.push(new FormControl(''));
  }
}
