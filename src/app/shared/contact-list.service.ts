import { Injectable } from '@angular/core';
import { Contact } from './contact-list.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  private toastSubject = new Subject<string>();
  private refreshSubject = new BehaviorSubject(undefined);

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

  displayPopupMessage(message: string) {
    this.toastSubject.next(message)
  }

  getPopup() {
    return this.toastSubject.asObservable();
  }

  triggerRefresh(message: any) {
    console.log("REFRESH TRIGGERED:",message)
    this.refreshSubject.next(message);
  }

  onRefresh() {
    return this.refreshSubject.asObservable();
  }
}
