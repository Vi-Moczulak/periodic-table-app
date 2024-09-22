import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-element-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './element-edit.component.html',
  styleUrl: './element-edit.component.scss'
})
export class ElementEditComponent {
  constructor(
    public dialogRef: MatDialogRef<ElementEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: any, column: string }
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
