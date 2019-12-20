import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth.service';
import { StorageService } from 'src/app/Services/Storage.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  public Register: FormGroup;
  public Error: { Code: number, Msg: string } = null;

  constructor(private Form: FormBuilder, private Auth: AuthService, private Storage: StorageService) {
  }

  ngOnInit() {
    this.Register = this.Form.group({
      Username: "",
      Password: "",
      Repeat: "",
      Email: ""
    })
  }

  public async OnRegister(data: any):Promise<void> {
    const createReq = this.Auth.CreateAccount(data);

    this.Auth.Error.HandleResult(createReq, (account) => {
      this.Storage.SetCustomer({ User: { Id: account.User.Id, Username: account.User.Username }, Token: account.Token });
      window.location.assign("/");
    }, (err) => {
      this.Error = err;
    });
  }

  public Close(data: any):void {
    this.Error = null;
  }

}
