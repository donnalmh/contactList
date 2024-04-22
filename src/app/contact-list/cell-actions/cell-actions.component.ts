import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ContactListService } from '../../shared/contact-list.service';
interface CellActionParams extends ICellRendererParams{
  
}

@Component({
  selector: 'app-cell-actions',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- <a routerLink='/form'] class="pr-3">Edit</a> -->
    <button (click)="onEditClick()">Edit</button>
    <button (click)="onDeleteClick()">Delete</button>

  `,
  providers: []
})

export class CellActionsComponent implements ICellRendererAngularComp {
  constructor(private service: ContactListService,
    private router: Router
  ) {}
  params: any


  agInit(params: CellActionParams): void {
    this.params = params
    console.log("PARAMS RENDER: ", params)
  }
  refresh(params: CellActionParams): boolean {
    this.params = params
    return true
  }

  onEditClick(): void {
    const queryParams = {
      id: this.params.data.id as string
    }
    console.log("edit button clicked")
    this.router.navigate(['/form'], { queryParams } )
  }

  onDeleteClick(): void {
    console.log("delete clicked")
    console.log(this.params.data)
    this.service.deleteContactDetail(this.params.data.id).subscribe(res =>{
      this.service.displayPopupMessage(this.params.data.name + ' ' + this.params.data.surname)
        // this.service.triggerRefresh("test")
     },
    err => {
      console.error(err)
    })
  }

}
