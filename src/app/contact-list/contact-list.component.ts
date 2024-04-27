import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, PaginationChangedEvent } from 'ag-grid-community';
import { ContactListService } from '../shared/contact-list.service';
import { Contact } from '../shared/contact-list.model';
import { CellActionsComponent } from './cell-actions/cell-actions.component';
import { Router, RouterModule } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthGuard } from '../guards/auth-guard.service';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment';
import { CellDate } from './cell-date/cell-date.component';
import { columnDefinitions } from '../constants/constant';
import { ModalProps, ModalService } from '../modal/modal.service';
import { ModalPopUpComponent } from '../modal/modal-pop-up/modal-pop-up.component';
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
  imports: [
    AgGridAngular,
    AgGridModule,
    RouterModule,
    ModalPopUpComponent,
    CommonModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  providers: [ContactListService],
})
export class ContactListComponent implements OnInit, OnDestroy {
  itemsPerPage = 100;
  modalMessage: string = '';
  themeClass = 'ag-theme-quartz ag-theme-clean';
  rowData: Contact[] = [];
  columnDefs: ColDef[] = columnDefinitions;
  onRefresh: Subscription | undefined 

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private service: ContactListService,
    private router: Router,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    const popoverTriggerList = [].slice.call(
      this.elementRef.nativeElement.querySelectorAll(
        '[data-bs-toggle="popover"]'
      )
    );

    popoverTriggerList.map((popoverTriggerEl: HTMLElement) => {
      return new bootstrap.Popover(popoverTriggerEl);
    });

    document.addEventListener('click', this.handleClick.bind(this));

    this.onRefresh = this.service.onRefresh().subscribe((value) => {
      this.getData();
    });
  }

  isUserAuthenticated() {
    const token: string | null = localStorage.getItem('token');
    return (
      token !== '' &&
      token !== undefined &&
      !this.jwtHelper.isTokenExpired(token)
    );
  }

  handleClick(event: Event) {
    if ((event.target as HTMLElement).matches('.popover .popover-body a')) {
      event.preventDefault();
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  getData() {
    this.service.getContactDetailList().subscribe({
      next: (res) =>
        (this.rowData = (res as Contact[]).map((x) => {
          return {
            ...x,
            fullWidth: true,
          };
        })),
      error: (error) => console.error(error),
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
      this.onRefresh?.unsubscribe();
  }
}
