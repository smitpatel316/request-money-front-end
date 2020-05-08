import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
export interface Event {
  name: string;
  amount: number;
}
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events = [];
  displayedColumns: string[] = ['name', 'amount'];
  DUMMY_UID = '5eb45480a6f04c792cb73bdd';
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllEvents(this.DUMMY_UID).subscribe((response: any[]) => {
      console.log(response);
      this.events = response;
    });
  }
}
