import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './modal-pop-up.component.html',
  styleUrl: './modal-pop-up.component.css'
})
export class ModalPopUpComponent {
  @Input() message: string = 'You have a notification'
}
