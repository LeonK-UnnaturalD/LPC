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

  constructor(private Form: FormBuilder, private Auth: AuthService) {
    this.Login = this.Form.group({
      Username: "",
      Password: ""
    })
  }

  ngOnInit() {
  }

  public OnLogin(data: any):void {
    this.Auth.Login(data).subscribe(res => {
      localStorage.setItem("User", JSON.stringify(res));
      window.location.reload(true);
      window.location.assign("/");
    });
  }

}
