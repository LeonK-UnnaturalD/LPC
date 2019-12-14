import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ResetPassword',
  templateUrl: './ResetPassword.component.html',
  styleUrls: ['./ResetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public Group: FormGroup;
  public Error: { Msg: string, Code: number } = null;

  constructor(private Form: FormBuilder, private Auth: AuthService, private Route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.Route.snapshot.paramMap.get('id');

    this.Group = this.Form.group({
      Password: "",
      VerifyPassword: "",
      Id: id
    });

    this.Auth.Check(id).subscribe(() => {

    }, (err) => {
      this.Error = this.Auth.Error.HandleError(err);
    });
  }

  public OnSubmit(data: any):void {
    this.Auth.ResetPasswordResponse(data).subscribe(() => {
      window.location.assign('/');
    }, (err) => {
      this.Error = this.Auth.Error.HandleError(err);
    });
  }

}
