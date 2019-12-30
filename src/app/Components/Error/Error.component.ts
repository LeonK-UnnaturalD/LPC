import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Error {
  ErrorCode: number,
  ErrorMessage: string
}

@Component({
  selector: 'app-Error',
  templateUrl: './Error.component.html',
  styleUrls: ['./Error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Error
    ) { }

  ngOnInit() {
    
  }

}
