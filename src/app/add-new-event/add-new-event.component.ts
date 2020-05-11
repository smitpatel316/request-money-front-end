import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { Event } from '../models/event';
import { Contact } from '../models/contact';
@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.scss'],
})
export class AddNewEventComponent implements OnInit {
  form: FormGroup;
  DUMMY_UID = '5eb45480a6f04c792cb73bdd';
  event: Event = {
    name: '',
    paidBy: this.DUMMY_UID,
    amount: 0,
    users: [],
  };
  dataSource = [];
  contacts = [];
  selectedContact = '';
  selectedContacts: Contact[] = [];
  displayedColumns: string[] = ['remove', 'name'];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewEventComponent>,
    private api: ApiService
  ) {
    this.form = fb.group({
      name: [this.event.name, Validators.required],
      paidBy: [this.event.paidBy, Validators.required],
      amount: [this.event.amount, Validators.required],
      users: [this.event.users, Validators.required],
    });
  }
  ngOnInit(): void {
    this.api
      .getAllContacts(this.event.paidBy)
      .subscribe((response: Contact[]) => {
        this.dataSource = response;
        this.contacts = response;
      });
  }
  save() {
    if (this.selectedContacts.length === 0) {
      return;
    }
    this.selectedContacts.forEach((selectedContact: Contact) => {
      this.dataSource.forEach((contact) => {
        if (contact.name === selectedContact.name) {
          this.event.users.push(contact.hash);
          return;
        }
      });
    });
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
  addUser() {
    if (this.selectedContact !== '') {
      this.selectedContacts = this.selectedContacts.concat([
        { name: this.selectedContact },
      ]);
      this.contacts = this.contacts.filter(
        (contact) => contact.name !== this.selectedContact
      );
      this.selectedContact = '';
    }
  }
  removeUser(removeUser: Contact) {
    this.selectedContacts = this.selectedContacts.filter(
      (contact: Contact) => contact.name !== removeUser.name
    );
    this.contacts.push({ name: removeUser.name });
  }
}
