import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddNewEventComponent } from '../add-new-event/add-new-event.component';
import { Event } from '../models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  displayedColumns: string[] = ['name', 'amount'];
  DUMMY_UID = '5eb45480a6f04c792cb73bdd';
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.api.getAllEvents(this.DUMMY_UID).subscribe((response: any[]) => {
      this.events = response;
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddNewEventComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.api.addNewEvent(val).subscribe((response) => {
          this.ngOnInit();
          this._snackBar.open(response['message'], 'Close', {
            duration: 2000,
          });
        });
      }
    });
  }
}
