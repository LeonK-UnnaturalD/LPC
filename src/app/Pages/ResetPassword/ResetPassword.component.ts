import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth.service';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-ResetPassword',
  templateUrl: './ResetPassword.component.html',
  styleUrls: ['./ResetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public Group: FormGroup;
  public Error: { Msg: string, Code: number } = null;

  constructor(
    private Form: FormBuilder, 
    private Auth: AuthService, 
    private Route: ActivatedRoute,
    private Meta: MetaService
    ) { }

  ngOnInit() {
    const id: string = this.Route.snapshot.paramMap.get('id');

    this.Group = this.Form.group({
      Password: "",
      VerifyPassword: "",
      Id: id
    },
    {
      validators: Validators.required
    });

    this.Check(id);
  }

  private async Check(Id: string):Promise<void> {
    const authReq = this.Auth.Check(Id);

    await this.Auth.Error.HandleResult(authReq, (auth) => {
      this.Meta.UpdateTitle(`LocalPicoins | Reset password`);
      this.Meta.UpdateTag("description", "Reset your password for security reasons or because you forgot it.");
    }, (err) => {
      this.Error = err;
    });
  }

  public OnSubmit(data: any):void {
    if(this.Group.invalid) return;
    
    const resetReq = this.Auth.ResetPasswordResponse(data);

    this.Auth.Error.HandleResult(resetReq, (reset) => {
      window.location.assign('/');
    }, (err) => {
      this.Error = err;
    });
  }

  public Close(data: any):void {
    this.Error = null;
  }

}
