import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  public Register: FormGroup;

  constructor(private Form: FormBuilder, private Auth: AuthService) {
    this.Register = this.Form.group({
      Username: "",
      Password: "",
      Email: ""
    })
  }

  ngOnInit() {
  }

  public OnRegister(data: any):void {
    this.Auth.CreateAccount(data).subscribe(res => {
      localStorage.setItem("User", JSON.stringify(res));
      window.location.reload(true);
      window.location.assign("/");
    });
  }

}
