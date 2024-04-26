import { Component, Input, OnInit } from '@angular/core';
import { ModalProps, ModalService } from '../modal.service';
import { ContactListService } from '../../shared/contact-list.service';
import { Router } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-modal-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './modal-pop-up.component.html',
  styleUrl: './modal-pop-up.component.css',
})
export class ModalPopUpComponent implements OnInit {
  message: string = '';
  constructor(
    private modalService: ModalService,
    private service: ContactListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modalService.getPopup().subscribe((props: ModalProps) => {
      this.showModal(props);
    });
  }

  showModal(modalProps: ModalProps) {
    this.message = modalProps.message;
    const myModal = new bootstrap.Modal('#modal', { keyboard: false });
    const myModalEl = document.getElementById('modal');

    myModal.show();
    myModalEl?.addEventListener('hidden.bs.modal', (event) => {
      this.service.triggerRefresh('');
      if (modalProps.type === 'edit') {
        this.router.navigate(['/']);
      }
    });
  }
}
