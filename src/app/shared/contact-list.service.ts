import { Injectable } from '@angular/core';
import { Contact } from './contact-list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  private refreshSubject = new BehaviorSubject(undefined);
  readonly baseURL = environment.apiUrl + '/ContactList' 

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
    })
  };

  constructor(private http: HttpClient) { }

  getContactDetail(id: number) {
    return this.http.get(`${this.baseURL}/${id}`, this.httpOptions)
  }

  getContactDetailList() {
    return this.http.get(`${this.baseURL}?Page=1&ItemsPerPage=1000`, this.httpOptions)
  }

  postContactDetail(payload: Contact) {
    return this.http.post(this.baseURL, payload, this.httpOptions) 
  }

  updateContactDetail(payload: Contact) {
    return this.http.put(`${this.baseURL}/${payload.id}`, payload, this.httpOptions) 
  }

  deleteContactDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`, this.httpOptions)
  }

  triggerRefresh(message: any) {
    this.refreshSubject.next(message);
  }

  onRefresh() {
    return this.refreshSubject.asObservable();
  }
}
