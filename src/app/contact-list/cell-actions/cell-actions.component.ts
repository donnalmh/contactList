import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ContactListService } from '../../shared/contact-list.service';
import { ModalService } from '../../modal/modal.service';
export interface CellActionParams extends ICellRendererParams {}

@Component({
  selector: 'app-cell-actions',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cell-actions.component.html',
  providers: [],
})
export class CellActionsComponent implements ICellRendererAngularComp {
  constructor(
    private service: ContactListService,
    private router: Router,
    private modalService: ModalService
  ) {}
  params: any;

  agInit(params: CellActionParams): void {
    this.params = params;
  }

  refresh(params: CellActionParams): boolean {
    this.params = params;
    return true;
  }

  onEditClick(): void {
    const queryParams = {
      id: this.params.data.id as string,
    };
    this.router.navigate(['/form'], { queryParams });
  }

  onDeleteClick(): void {
    const confirm = window.confirm(
      `Are you sure you want to delete this contact - ${this.params.data.name} ${this.params.data.surname}?`
    );
    if (confirm) {
      this.service.deleteContactDetail(this.params.data.id).subscribe({
        next: (res) =>
          this.modalService.displayPopupMessage({
            type: 'delete',
            message: `You have successfully deleted contact - ${this.params.data.name} ${this.params.data.surname}`,
          }),
        error: (error) => console.error(error),
      });
    }
  }
}
