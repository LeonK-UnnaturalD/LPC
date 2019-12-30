import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface DialogData {
  Limit: number;
  Deposit: string;
  Price: number;
  Country: string;
  Currency: string;
}

@Component({
  selector: 'app-EditOfferDialog',
  templateUrl: './EditOfferDialog.component.html',
  styleUrls: ['./EditOfferDialog.component.css']
})
export class EditOfferDialogComponent implements OnInit {
  public Group: FormGroup;

  constructor(
    private Form: FormBuilder,
    public dialogRef: MatDialogRef<EditOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Limit: this.data.Limit,
      Deposit: this.data.Deposit,
      Price: this.data.Price,
      Country: this.data.Country,
      Currency: this.data.Currency
    });
  }

  public SubmitEdit():void {
    console.log(this.Group.value);
  }

}
