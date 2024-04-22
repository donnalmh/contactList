import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submission-modal',
  standalone: true,
  imports: [],
  templateUrl: './submission-modal.component.html',
  styleUrl: './submission-modal.component.css'
})
export class SubmissionModalComponent {
  @Input() message: string = 'You have a notification'
}
