import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalProps, ModalService } from '../modal.service';
import { ContactListService } from '../../shared/contact-list.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare var bootstrap: any;
@Component({
  selector: 'app-modal-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './modal-pop-up.component.html',
  styleUrl: './modal-pop-up.component.css',
})
export class ModalPopUpComponent implements OnInit, OnDestroy {
  message: string = '';
  popup: Subscription | undefined;
  private isEventListenerAdded = false;
  private modalProps: ModalProps = {
    type: undefined,
    message: '',
  };

  constructor(
    private modalService: ModalService,
    private service: ContactListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.isEventListenerAdded) {
      const myModalEl = document.getElementById('modal');

      myModalEl?.addEventListener('hidden.bs.modal', (event: any) => {
        if (this.modalProps.type === 'delete') {
          this.service.triggerRefresh('');
        }
        if (this.modalProps.type === 'edit') {
          this.router.navigate(['/']);
        }
      });
      this.isEventListenerAdded = true;
    }

    this.popup = this.modalService.getPopup().subscribe((props: ModalProps) => {
      this.modalProps = props;
      this.showModal();
    });
  }

  handleHiddenModal = (event: any) => {
    if (this.modalProps.type === 'delete') {
      this.service.triggerRefresh('');
    }
    if (this.modalProps.type === 'edit') {
      this.router.navigate(['/']);
    }
  };

  showModal() {
    this.message = this.modalProps.message;
    const myModal = new bootstrap.Modal('#modal', { keyboard: false });
    myModal.show();
  }

  ngOnDestroy(): void {
    const myModalEl = document.getElementById('modal');
    myModalEl?.removeEventListener('hidden.bs.modal', this.handleHiddenModal);
    this.popup?.unsubscribe();
  }
}
