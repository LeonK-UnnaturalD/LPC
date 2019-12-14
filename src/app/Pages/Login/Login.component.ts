import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  public Login: FormGroup;
  public ResetGroup: FormGroup;
  public ErrorLogin: { Code: number, Msg: string } = null;
  public ErrorReset: { Code: number, Msg: string } = null;
  public Reset: boolean = false;
  public Success: boolean = false;

  constructor(private Form: FormBuilder, private Auth: AuthService) {

  }

  ngOnInit() {
    this.Login = this.Form.group({
      Username: "",
      Password: ""
    });

    this.ResetGroup = this.Form.group({
      Email: ""
    });
  }

  public OnLogin(data: any):void {
    this.Auth.Login(data).subscribe(res => {
      localStorage.setItem("User", JSON.stringify(res));
      window.location.reload(true);
      window.location.assign("/");
    }, (err) => {
      this.ErrorLogin = this.Auth.Error.HandleError(err);
    });
  }

  public ResetPassword():void {
    this.Reset = !this.Reset;
  }

  public Close(data: any):void {
    this.ErrorLogin = null;
    this.ErrorReset = null;
  }

  public OnReset(data: any):void {
    this.Auth.ResetPasswordRequest(data).subscribe(() => {
      this.Success = true;
    }, (err) => {
      this.ErrorReset = this.Auth.Error.HandleError(err);
    });

    this.ResetGroup.reset();
  }

}
