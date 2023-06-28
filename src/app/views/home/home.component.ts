import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AssociateElement } from 'src/app/models/AssociateElement';
import { AssociateElementService } from 'src/app/services/associateElement.service'
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AssociateElementService]
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'income', 'active', 'actions'];
  dataSource!: AssociateElement[];

  constructor(
    public dialog: MatDialog,
    public associateElementService: AssociateElementService
    ) {
      this.associateElementService.getElements()
        .subscribe((data: AssociateElement[]) => {
          console.log(data);
          this.dataSource = data;
        });
    }

  ngOnInit(): void {
  }

  openDialog(element: AssociateElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data: element === null ? {
        position: null,
        name: '',
        income: null,
        active: null
      } : {
        position: element.position,
        name: element.name,
        income: element.income,
        active: element.active
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result);
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.associateElementService.editElements(result)
          .subscribe((data: AssociateElement) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = data;
            this.table.renderRows();
          });
        } else {
          this.associateElementService.createElements(result)
            .subscribe((data: AssociateElement) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }

  editElement(element: AssociateElement): void {
    this.openDialog(element)
  }

  deleteElement(position: number): void {
    this.associateElementService.deleteElements(position)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== position);
      });
  };
}
