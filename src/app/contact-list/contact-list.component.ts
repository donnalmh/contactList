import { Component, OnInit } from '@angular/core';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ContactListService } from '../shared/contact-list.service';
import { Contact } from '../shared/contact-list.model';
import { CellActionsComponent } from './cell-actions/cell-actions.component';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { SubmissionModalComponent } from '../contact-form/modal/submission-modal/submission-modal.component';
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

declare var bootstrap: any;
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [AgGridAngular, AgGridModule, RouterModule, SubmissionModalComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  providers: [ContactListService]
})

export class ContactListComponent implements OnInit {
  modalMessage: string = ''
  constructor(private service:ContactListService) {}
  
  themeClass = "ag-theme-quartz ag-theme-clean";
  columnDefs: ColDef[] = [ 
    { headerName: 'Name', field: 'name' },
    { headerName: 'Surname', field: 'surname' },
    { headerName: 'Phone #', field: 'contactNumber' },
    { headerName: 'Email', field: 'emailAddress' },
    { headerName: 'D.O.B', field: 'dateOfBirth' },
    { headerName: 'Actions', field: 'action', cellRenderer: CellActionsComponent
    }
  ];

  rowData: Contact[] = [];

  magazineSubject = new Subject<string>();
  ngOnInit(): void {


      this.service.onRefresh().subscribe( value => {
          this.getData();
        }
      )

      this.service.getPopup().subscribe(message => {
        const myModal = new bootstrap.Modal('#exampleModal', { keyboard: false })
        const myModalEl = document.getElementById('exampleModal')

        this.modalMessage = `You have successfully deleted contact - ${message}`
        myModal.show();
        myModalEl?.addEventListener('hidden.bs.modal', event => {
          this.service.triggerRefresh("A")
        })

      })
  }

  editClick() {
    console.log("test edit")
  }

  getData() {
    this.service.getContactDetailList().subscribe(
      {
        next: (res) => this.rowData = res as Contact[],
        error: (error) => console.error(error)
      }
    )
  }

}
