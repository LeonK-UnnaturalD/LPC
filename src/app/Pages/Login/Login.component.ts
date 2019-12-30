import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth.service';
import { UserService } from 'src/app/Services/User.service';
import AuthResponse from 'src/app/Classes/AuthResponse';
import { StorageService } from 'src/app/Services/Storage.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  public ErrorLogin: { Code: number, Msg: string } = null;
  public ErrorReset: { Code: number, Msg: string } = null;
  public Reset: boolean = false;
  public Success: boolean = false;

  public Username: FormControl = new FormControl('', Validators.required);
  public Password: FormControl = new FormControl('', Validators.required);
  public Email: FormControl = new FormControl('', [ Validators.required, Validators.email ]);

  constructor(private Auth: AuthService, private User: UserService, private Storage: StorageService) {

  }

  ngOnInit() {
    const isAuth = this.Auth.GetThirdPartyUser();

    if(isAuth)
      this.UsedThirdPartyAuth(isAuth);
  }

  private async UsedThirdPartyAuth(Auth: { Id: string, Token: string }):Promise<void> {
    const userReq = this.User.GetUser(Auth.Id);
    
    await this.Auth.Error.HandleResult(userReq, (user) => {
      const auth: AuthResponse = {
        Token: Auth.Token,
        User: { Id: user.Id, Username: user.Username}
      };

      this.Storage.SetCustomer(auth);
      window.location.assign("/");
    }, (err) => {
      this.ErrorLogin = err;
    });
  }

  public GetLoginData():any {
    const data = {
      Username: this.Username.value,
      Password: this.Password.value
    };

    return data;
  }

  public async OnLogin(data: any):Promise<void> {
    const loginReq = this.Auth.Login(data);

    await this.Auth.Error.HandleResult(loginReq, (user) => {
      this.Storage.SetCustomer({ User: { Id: user.User.Id, Username: user.User.Username }, Token: user.Token });
      window.location.assign("/");
    }, (err) => {
      this.ErrorLogin = err;
    });
  }

  public ResetPassword():void {
    this.Reset = !this.Reset;
  }

  public Close(data: any):void {
    this.ErrorLogin = null;
    this.ErrorReset = null;
  }

  public GetResetData():any {
    const data = {
      Email: this.Email.value
    };

    return data;
  }

  public async OnReset(data: any):Promise<void> {
    const resetReq = this.Auth.ResetPasswordRequest(data);

    await this.Auth.Error.HandleResult(resetReq, (reset) => {
      this.Success = true;
      this.Email.reset();
    }, (err) => {
      this.ErrorReset = err;
    });
  }

}
