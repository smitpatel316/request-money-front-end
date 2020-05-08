import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Contact {
  name: string;
  amount: number;
  id: string;
  hash: string;
  handle: string;
  handleType: string;
}
@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss'],
})
export class AccountBalanceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'handle'];
  DUMMY_UID = '5eb45480a6f04c792cb73bdd';
  contacts = [];
  constructor(private api: ApiService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // TODO: Make it dynamic with user login
    this.api.getAllContacts(this.DUMMY_UID).subscribe((contacts: any[]) => {
      this.contacts = contacts;
      this.api.getPaymentsNeeded(this.DUMMY_UID).subscribe((payments) => {
        this.contacts.forEach((contact) => {
          contact.amount = payments[contact.hash];
        });
      });
    });
  }
  sendMoneyRequest() {
    this.api
      .sendMoneyRequest({ uid: this.DUMMY_UID, contacts: this.contacts })
      .subscribe((response) => {
        this._snackBar.open(response['message'], 'Close', {
          duration: 2000,
        });
        console.log(response);
      });
  }
}