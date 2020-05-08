import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

export interface Contact {
  name: string;
  amount: number;
  id: string;
  hash: string;
  handle: string;
  handleType: string;
}

const ELEMENT_DATA: Contact[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'handle'];
  dataSource = ELEMENT_DATA;

  contacts = [];
  DUMMY_UID = '5eb45480a6f04c792cb73bdd';
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    // TODO: Make it dynamic with user login

    // this.api.getAllEvents(DUMMY_UID).subscribe((response) => {
    //   console.log(response);
    // });
    this.api.getAllContacts(this.DUMMY_UID).subscribe((response: any[]) => {
      this.contacts = response;
      this.api.getPaymentsNeeded(this.DUMMY_UID).subscribe((response2) => {
        this.contacts.forEach((contact) => {
          contact.amount = response2[contact.hash];
        });
        console.log(this.contacts);
      });
    });
  }
  sendMoneyRequest() {
    console.log('clicked');
    this.api
      .sendMoneyRequest({ uid: this.DUMMY_UID, contacts: this.contacts })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
