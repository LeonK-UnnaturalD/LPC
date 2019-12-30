import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import User from 'src/app/Classes/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-CreateReviewDialog',
  templateUrl: './CreateReviewDialog.component.html',
  styleUrls: ['./CreateReviewDialog.component.css']
})
export class CreateReviewDialogComponent implements OnInit {
  public Group: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private Data: User,
    private Form: FormBuilder,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Rating: "positiv",
      Text: ""
    },
    {
      validators: [Validators.required]
    });
  }

  public Submit(data: any):void {
    if(this.Group.invalid) return;

    data["UserId"] = this.Data.Id;

    const createReq = this.UserService.CreateReview(data);

    this.UserService.Error.HandleResult(createReq, (comment) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
