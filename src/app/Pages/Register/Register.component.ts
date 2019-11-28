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
  public Error: { Code: number, Msg: string } = null;

  constructor(private Form: FormBuilder, private Auth: AuthService) {
  }

  ngOnInit() {
    this.Register = this.Form.group({
      Username: "",
      Password: "",
      Repeat: "",
      Email: ""
    })
  }

  public OnRegister(data: any):void {
    this.Auth.CreateAccount(data).subscribe(res => {
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
