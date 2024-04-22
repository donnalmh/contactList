import { Injectable } from '@angular/core';
import { Contact } from './contact-list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  private toastSubject = new Subject<string>();
  private refreshSubject = new BehaviorSubject(undefined);

   httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
    })
  };

  constructor(private http: HttpClient) { }

  readonly baseURL = environment.apiUrl + '/ContactList' 

  getContactDetail(id: number) {
    return this.http.get(`${this.baseURL}/${id}`, this.httpOptions)
  }


  getContactDetailList() {
    return this.http.get(this.baseURL, this.httpOptions)
  }

  postContactDetail(payload: Contact) {
    return this.http.post(this.baseURL, payload, this.httpOptions) 
  }

  updateContactDetail(payload: Contact) {
    console.log("payload: ",payload)
    return this.http.put(`${this.baseURL}/${payload.id}`, payload, this.httpOptions) 
  }

  deleteContactDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`, this.httpOptions)
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
