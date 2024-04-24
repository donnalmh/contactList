import { Component } from '@angular/core';
import { CellActionParams } from '../cell-actions/cell-actions.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import moment from 'moment';
@Component({
  selector: 'app-cell-date',
  standalone: true,
  imports: [],
  templateUrl: './cell-date.component.html',
  styleUrl: './cell-date.component.css',
})
export class CellDate implements ICellRendererAngularComp {
  constructor(
  ) {}
  date: any
  agInit(params: CellActionParams): void {
    this.date = moment(params.value).format('DD-MM-YYYY')
    console.log("date RENDER: ", params)
  }
  refresh(params: CellActionParams): boolean {
    this.date = moment(params.value).format('DD-MM-YYYY')
    return true
  }
}
