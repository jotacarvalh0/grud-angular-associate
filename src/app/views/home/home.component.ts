import {Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { elementAt } from 'rxjs';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  name: string;
  id: number;
  income: number;
  active: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'José Neto Cordeiro de Carvalho', income: 1.800, active: true},
  {id: 2, name: 'Ariosvaldo Macedo Dantas', income: 4.002, active: false},
  {id: 3, name: 'Antonio Clarindo Luz', income: 6.941, active: true},
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'income', 'active', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  NgOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data: element === null ? {
        id: null,
        name: '',
        income: null,
        active: null
      } : {
        id: element.id,
        name: element.name,
        income: element.income,
        active: element.active
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  editElement(element: PeriodicElement): void {
    this.openDialog(element)
  };

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter(p => p.id !== id)
  };
}
