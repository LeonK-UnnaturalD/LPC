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
  public Error: { Code: number, Msg: string } = null;

  constructor(private Form: FormBuilder, private Auth: AuthService) {

  }

  ngOnInit() {
    this.Login = this.Form.group({
      Username: "",
      Password: ""
    })
  }

  public OnLogin(data: any):void {
    this.Auth.Login(data).subscribe(res => {
      localStorage.setItem("User", JSON.stringify(res));
      window.location.reload(true);
      window.location.assign("/");
    }, (err) => {
      this.Error = this.Auth.Error.HandleError(err);
    });
  }

  public Close(data: any):void {
    this.Error = null;
  }

}
