import { Component, OnInit } from '@angular/core';
export interface Contact {
  name: string;
  handle: string;
  handleType: string;
  id: string;
  hash: string;
}
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts = [];
  displayedColumns: string[] = ['name', 'handle', 'handleType', 'id', 'hash'];
  constructor() {}

  ngOnInit(): void {}
}
