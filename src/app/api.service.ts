import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}
  private BACKEND = 'http://localhost:5000/api/v1';
  getAllEvents(uid) {
    return this.http.get(`${this.BACKEND}/event/${uid}`);
  }
  getAllContacts(uid) {
    return this.http.get(`${this.BACKEND}/user/contacts/${uid}`);
  }
  getPaymentsNeeded(uid) {
    return this.http.get(`${this.BACKEND}/event/owe/${uid}`);
  }
  sendMoneyRequest(data) {
    return this.http.post(
      `${this.BACKEND}/user/request-money`,
      data,
      this.httpOptions
    );
  }
  addNewContact(data) {
    return this.http.post(
      `${this.BACKEND}/user/contact`,
      data,
      this.httpOptions
    );
  }
  addNewEvent(data) {
    return this.http.post(`${this.BACKEND}/event/`, data, this.httpOptions);
  }
}
