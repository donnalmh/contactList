import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export  interface ModalProps {
  type: 'delete' | 'edit' | 'login-error' | undefined,
  message: string
}

@Injectable({
  providedIn: 'root',
})

export class ModalService {
  private modalVisible = false;
  modalVisibilityChanged = new Subject<boolean>();
  private toastSubject = new Subject<ModalProps>();

  constructor() {}

  displayPopupMessage(props: ModalProps) {
    this.toastSubject.next(props);
  }

  getPopup() {
    return this.toastSubject.asObservable();
  }

  toggleVisibility(): void {
    this.modalVisible = !this.modalVisible
    this.modalVisibilityChanged.next(this.modalVisible)
  }
}
