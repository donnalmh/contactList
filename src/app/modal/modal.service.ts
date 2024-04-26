import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private toastSubject = new Subject<string>();

  constructor() {}

  displayPopupMessage(message: string) {
    this.toastSubject.next(message);
  }

  getPopup() {
    return this.toastSubject.asObservable();
  }
}
