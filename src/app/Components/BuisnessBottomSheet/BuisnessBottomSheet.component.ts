import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface Member {
  MemberId: string,
  RoleId: number,
  Username: string,
  Permission: number
}

@Component({
  selector: 'app-BuisnessBottomSheet',
  templateUrl: './BuisnessBottomSheet.component.html',
  styleUrls: ['./BuisnessBottomSheet.component.css']
})
export class BuisnessBottomSheetComponent implements OnInit {
  public Group: FormGroup;

  constructor(
    private BottomSheetRef: MatBottomSheetRef<BuisnessBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: Member,
    private Form: FormBuilder
    ) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Id: this.data.MemberId,
      RoleId: this.data.RoleId.toString()
    });
  }

  public OnSubmit(data: any):void {
    console.log(data);
  }

}
