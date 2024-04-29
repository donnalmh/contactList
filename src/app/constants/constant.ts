import { CellActionsComponent } from "../contact-list/cell-actions/cell-actions.component";
import { CellDate } from "../contact-list/cell-date/cell-date.component";

export const columnDefinitions = [ 
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Surname', field: 'surname' },
    { headerName: 'Phone #', field: 'contactNumber' },
    { headerName: 'Email', field: 'emailAddress' },
    { headerName: 'D.O.B', field: 'dateOfBirth', cellRenderer: CellDate },
    { headerName: 'Actions', field: 'action', cellRenderer: CellActionsComponent, width: 300 }
  ];
