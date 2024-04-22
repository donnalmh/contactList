import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import '../../assets/poppins-font.css';
import { ContactListService } from '../shared/contact-list.service';
import { Contact } from '../shared/contact-list.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { concatMap, empty, filter } from 'rxjs';
import moment from 'moment';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  providers: [ContactListService],
})
export class ContactFormComponent implements OnInit {
  constructor(
    private service: ContactListService,
    private route: ActivatedRoute
  ) {}

  id: number | undefined= undefined;
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
      emailAddress: new FormControl(''),
      contactNumber: new FormControl(0),
      dateOfBirth: new FormControl(undefined),
    });

    this.nameFC = this.contactForm.get('name') as FormControl;
    this.surnameFC = this.contactForm.get('surname') as FormControl;
    this.emailAddressFC = this.contactForm.get('emailAddress') as FormControl;
    this.contactNumberFC = this.contactForm.get('contactNumber') as FormControl;
    this.dateOfBirthFC = this.contactForm.get('dateOfBirth') as FormControl;

    this.route.queryParamMap
      .pipe(
        filter(data => !!data.get('id')),
        concatMap((data1: any) => { 
          this.id = parseInt(data1.get('id'))
          return this.service.getContactDetail(this.id)
        })
        )
      .subscribe((res: any) => {
        this.nameFC.setValue(res.name);
        this.surnameFC.setValue(res.surname);
        this.id = res.id;
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
  onClick() {
    const data = this.formatData();
    if(this.id) {
      console.log("this.id: ", this.id)
      data.id = this.id
      this.service.updateContactDetail(data).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.service.postContactDetail(data).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
