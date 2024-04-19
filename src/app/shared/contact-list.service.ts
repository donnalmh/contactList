import { Injectable } from '@angular/core';
import { Contact } from './contact-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:7128/api/ContactList'

  getContactDetailList() {
    return this.http.get(this.baseURL)
  }

  postContactDetail(payload: Contact) {
    return this.http.post(this.baseURL, payload) 
  }

  updateContactDetail(payload: Contact) {
    return this.http.put(this.baseURL, payload) 
  }
}
