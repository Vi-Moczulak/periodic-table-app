import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime } from 'rxjs';
import { PeriodicElement } from '../../models/PeriodicElement';
import { ElementEditComponent } from '../element-edit/element-edit.component';
import { rxActions } from '@rx-angular/state/actions';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})

export class PeriodicTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filteredData = new MatTableDataSource(ELEMENT_DATA);
  filterControl = new FormControl('');

  actions = rxActions<{ search: any }>();

  constructor(public dialog: MatDialog) {
    this.actions.search$.pipe(debounceTime(2000)).subscribe((value) => this.applyFilter(value));
  }

  applyFilter(event: Event | string | null): void {
    const filterValue = (event != null && typeof event === 'string') ? event : (event?.target as HTMLInputElement).value;
    this.filteredData.filter = filterValue.trim().toLowerCase();
  }

  openEditDialog(element: any, value: any, column: string): void {
    const dialogRef = this.dialog.open(ElementEditComponent, {
      width: '300px',
      data: {
        value: value,
        column: column
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element[column] = result;
      }
    });
  }
}
