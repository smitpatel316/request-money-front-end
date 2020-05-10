import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
export interface Contact {
  name: string;
  handle: string;
  handle_type: string;
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
  displayedColumns: string[] = ['name', 'handle', 'handle_type', 'id', 'hash'];
  DUMMY_UID = '5eb45480a6f04c792cb73bdd';
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllContacts(this.DUMMY_UID).subscribe((response: any[]) => {
      this.contacts = response;
    });
  }
}
