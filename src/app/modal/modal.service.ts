import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export  interface ModalProps {
  type: 'delete' | 'edit',
  message: string
}

@Injectable({
  providedIn: 'root',
})

export class ModalService {
  private toastSubject = new Subject<ModalProps>();

  constructor() {}

  displayPopupMessage(props: ModalProps) {
    this.toastSubject.next(props);
  }

  getPopup() {
    return this.toastSubject.asObservable();
  }
}
