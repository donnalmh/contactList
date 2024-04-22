import { Injectable } from '@angular/core';
import { Contact } from './contact-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:7128/api/ContactList'

  getContactDetail(id: number) {
    return this.http.get(`${this.baseURL}/${id}`)
  }


  getContactDetailList() {
    return this.http.get(this.baseURL)
  }

  postContactDetail(payload: Contact) {
    return this.http.post(this.baseURL, payload) 
  }

  updateContactDetail(payload: Contact) {
    console.log("payload: ",payload)
    return this.http.put(`${this.baseURL}/${payload.id}`, payload) 
  }

  deleteContactDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`)
  }
}
