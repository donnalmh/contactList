import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import '../../assets/poppins-font.css';
import { ContactListService } from '../shared/contact-list.service';
import { Contact } from '../shared/contact-list.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { concatMap, empty, filter } from 'rxjs';
import moment from 'moment';
import { emailValidator } from './validators';
import { AuthGuard } from '../guards/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalService } from '../modal/modal.service';
import { ModalPopUpComponent } from '../modal/modal-pop-up/modal-pop-up.component';

declare var bootstrap: any;
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterModule,
    ModalPopUpComponent,
    CommonModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  providers: [ContactListService, AuthGuard, JwtHelperService],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  constructor(
    private service: ContactListService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  id: number | undefined = undefined;
  contactForm: FormGroup | undefined;
  nameFC!: FormControl;
  surnameFC!: FormControl;
  emailAddressFC!: FormControl;
  contactNumberFC!: FormControl;
  dateOfBirthFC!: FormControl;

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl(''),
      emailAddress: new FormControl('', [Validators.required, emailValidator]),
      contactNumber: new FormControl(undefined),
      dateOfBirth: new FormControl(undefined),
    });

    this.nameFC = this.contactForm.get('name') as FormControl;
    this.surnameFC = this.contactForm.get('surname') as FormControl;
    this.emailAddressFC = this.contactForm.get('emailAddress') as FormControl;
    this.contactNumberFC = this.contactForm.get('contactNumber') as FormControl;
    this.dateOfBirthFC = this.contactForm.get('dateOfBirth') as FormControl;

    this.route.queryParamMap
      .pipe(
        filter((data) => !!data.get('id')),
        concatMap((data1: any) => {
          this.id = parseInt(data1.get('id'));
          return this.service.getContactDetail(this.id);
        })
      )
      .subscribe((res: any) => {
        this.id = res.id;
        this.nameFC.setValue(res.name);
        this.surnameFC.setValue(res.surname);
        this.emailAddressFC.setValue(res.emailAddress);
        this.contactNumberFC.setValue(res.contactNumber);
        this.dateOfBirthFC.setValue(
          moment(res.dateOfBirth).format('YYYY-MM-DD')
        );
      });
  }

  formatData(): Contact {
    return new Contact(
      this.nameFC?.value || '',
      this.surnameFC?.value || '',
      this.contactNumberFC?.value || 0,
      this.emailAddressFC?.value || '',
      this.dateOfBirthFC?.value || new Date()
    );
  }

  validateFields() {
    if (this.contactForm?.valid) {
      this.onClick();
    } else {
      this.contactForm?.markAllAsTouched();
    }
  }

  triggerNotificationAndReturn() {
    this.modalService.displayPopupMessage(
      { type: 'edit', message: `Your contact details for ${this.nameFC.value} ${this.surnameFC.value} have been ${this.id ? 'edited' : 'saved'} successfully.`}
    )
  }

  onClick() {
    const data = this.formatData();

    if (this.id) {
      data.id = this.id;
      this.service.updateContactDetail(data).subscribe({
        next: (res) => this.triggerNotificationAndReturn(),
        error: (error) => console.error(error),
      });
    } else {
      this.service.postContactDetail(data).subscribe({
        next: (res) => this.triggerNotificationAndReturn(),
        error: (error) => console.error(error),
      });
    }
  }

  ngOnDestroy(): void {
      
  }
}
