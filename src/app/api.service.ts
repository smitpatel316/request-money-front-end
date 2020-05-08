import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
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
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(
      `${this.BACKEND}/user/request-money`,
      data,
      httpOptions
    );
  }
}
