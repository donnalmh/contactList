import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import '../../assets/poppins-font.css'
import { ContactListService } from '../shared/contact-list.service';
import { Contact } from '../shared/contact-list.model';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  providers: [ContactListService]
})
export class ContactFormComponent {

  constructor(private service:ContactListService) {}

  contactForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    surname: new FormControl(''),
    emailAddress: new FormControl(''),
    contactNumber: new FormControl(0),
    dateOfBirth: new FormControl(undefined)
  })

  nameFC = this.contactForm.get('name')
  surnameFC = this.contactForm.get('surname')
  emailAddressFC = this.contactForm.get('emailAddress')
  contactNumberFC = this.contactForm.get('contactNumber')
  dateOfBirthFC = this.contactForm.get('dateOfBirth')

  formatData(): Contact {
    return new Contact(
      this.nameFC?.value || '',
      this.surnameFC?.value || '',
      this.contactNumberFC?.value || 0,
      this.emailAddressFC?.value || '',
      this.dateOfBirthFC?.value || new Date()
    )
  }
  onClick() {
    const data = this.formatData()
    this.service.postContactDetail(data).subscribe(
      res => {
        console.log(res)
      },
      err => { console.log(err)}
    )
  }

}
