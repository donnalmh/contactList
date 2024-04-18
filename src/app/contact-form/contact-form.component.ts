import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import '../../assets/poppins-font.css'
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {


  contactForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    surname: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    dob: new FormControl('')
  })

  nameFC = this.contactForm.get('name')
  surnameFC = this.contactForm.get('surname')
  emailFC = this.contactForm.get('email')
  phoneNumberFC = this.contactForm.get('phoneNumber')
  dobFC = this.contactForm.get('dob')

  onClick() {
    
  }

}
