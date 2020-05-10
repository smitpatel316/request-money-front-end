import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddNewContactComponent } from '../add-new-contact/add-new-contact.component';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.api.getAllContacts(this.DUMMY_UID).subscribe((response: any[]) => {
      this.contacts = response;
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddNewContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        val.uid = this.DUMMY_UID;
        this.api.addNewContact(val).subscribe((response) => {
          this.ngOnInit();
          this._snackBar.open(response['message'], 'Close', {
            duration: 2000,
          });
        });
      }
    });
  }
}
