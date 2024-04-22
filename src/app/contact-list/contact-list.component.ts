import { Component, OnInit } from '@angular/core';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ContactListService } from '../shared/contact-list.service';
import { Contact } from '../shared/contact-list.model';
import { CellActionsComponent } from './cell-actions/cell-actions.component';
import { RouterModule } from '@angular/router';
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [AgGridAngular, AgGridModule, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  providers: [ContactListService]
})

export class ContactListComponent implements OnInit {
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

  ngOnInit(): void {
      this.getData()
  }

  editClick() {
    console.log("test edit")
  }

  getData() {
    this.service.getContactDetailList().subscribe(
      (res) => {
        this.rowData = res as Contact[];

        console.log(res)
      },
      (error) => {
        console.error('Error fetching data:',error)
      }
    )
  }

}
