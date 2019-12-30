import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth.service';
import { StorageService } from 'src/app/Services/Storage.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  public Error: { Code: number, Msg: string } = null;

  public RPassword: FormControl = new FormControl('', Validators.required);
  public Password: FormControl = new FormControl('', Validators.required);
  public Email: FormControl = new FormControl('', [ Validators.required, Validators.email ]);
  public Username: FormControl = new FormControl('', [ Validators.required, Validators.maxLength(20), Validators.minLength(4) ]);

  constructor(private Auth: AuthService, private Storage: StorageService) {
  }

  ngOnInit() {
    
  }

  public async OnRegister(data: any):Promise<void> {
    if(data === null)
    {
      this.Error = { Code: 0, Msg: "Please fix the form first" };

      return;
    }

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

  public GetData():any {
    if(this.Username.invalid || this.Password.invalid || this.RPassword.invalid || this.Email.invalid)
    {
      return null;
    }

    const data = {
      Username: this.Username.value,
      Password: this.Password.value,
      Repeat: this.RPassword.value,
      Email: this.Email.value
    };

    return data;
  }

}
