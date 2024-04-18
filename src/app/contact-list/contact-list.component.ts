import { Component } from '@angular/core';
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';


interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [AgGridAngular, AgGridModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent {
  themeClass = "ag-theme-quartz";

  // Row Data: The data to be displayed.
  columnDefs: ColDef[] = [ // Use ColDef[] instead of plain array
    { headerName: 'Name', field: 'name' },
    { headerName: 'Surname', field: 'surname' },
    { headerName: 'Phone #', field: 'number' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'D.O.B', field: 'dob' }
  ];

  rowData = [
    { name: 'Derick', surname: 'Chandler', number: 971098353, email: "derick.chandler@hotmail.com", dob: "28-10-1977" },
    { name: 'Susan', surname: 'Baker', number: 19877987345, email: "susan.baker@iodine.com", dob: "01-01-1978" },
    { name: 'Tara', surname: 'Liasinatte', number: 32989085, email: "tara.l@jamisonlee.com", dob: "02-01-1977" }
  ];
}
